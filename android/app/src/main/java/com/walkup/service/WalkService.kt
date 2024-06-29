package com.walkup.service

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.content.pm.ServiceInfo
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import android.os.Build
import android.os.IBinder
import android.util.Log
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat
import com.facebook.fresco.memorytypes.nativememory.R
import com.facebook.react.bridge.Arguments
import com.walkup.module.EventListener
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.cancel
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch

class WalkService : Service(), SensorEventListener, LocationListener {

    private val TAG = "WALK_SERVICE"
    private val NOTIFICATION_ID = 1
    private val NOTIFICATION_CHANNEL_NAME = "WalkUP"
    private val NOTIFICATION_CHANNEL_ID = "walkup_status_channel"

    private val timerJob = Job()
    private val timerScope = CoroutineScope(Dispatchers.Main + timerJob)

    private lateinit var sensorManager: SensorManager
    private lateinit var stepSensor: Sensor
    private lateinit var locationManager: LocationManager
    private lateinit var notificationManager: NotificationManager

    private var steps: Int = 0
    private var stopwatch: Int = 0
    private var isRunning: Boolean = false

    private fun createNotificationChannel() {
        if (Build.VERSION_CODES.O <= Build.VERSION.SDK_INT) {
            val channel = NotificationChannel(
                    NOTIFICATION_CHANNEL_ID,
                    NOTIFICATION_CHANNEL_NAME,
                    NotificationManager.IMPORTANCE_LOW
            ).apply {
                setSound(null, null)
                enableVibration(false)
            }
            notificationManager.createNotificationChannel(channel)
        }
    }

    override fun onCreate() {
        super.onCreate()
        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
        stepSensor = sensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER) as Sensor
        locationManager = getSystemService(Context.LOCATION_SERVICE) as LocationManager
        notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        createNotificationChannel()
    }

    override fun onBind(intent: Intent?): IBinder? = null

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d(TAG, "onStartCommand")
        if(!isRunning) {
            isRunning = true
            if (
                    ContextCompat.checkSelfPermission(
                            applicationContext,
                            "android.permission.ACCESS_FINE_LOCATION"
                    ) != PackageManager.PERMISSION_GRANTED ||
                    ContextCompat.checkSelfPermission(
                            applicationContext,
                            "android.permission.ACCESS_COARSE_LOCATION"
                    ) != PackageManager.PERMISSION_GRANTED
            ) {
                Log.d(TAG, "ACCESS_FINE_LOCATION or ACCESS_COARSE_LOCATION is not granted!")
                EventListener.emit("onError", Arguments.createMap().apply {
                    putString("errorMessage", "Permission is not granted")
                })
            }
            steps = 0
            stopwatch = 0
            sensorManager.registerListener(this, stepSensor, SensorManager.SENSOR_DELAY_NORMAL)
            locationManager.requestLocationUpdates(
                    LocationManager.GPS_PROVIDER,
                    100L,
                    0.1f,
                    this
            )
            timerScope.launch {
                while(isActive) {
                    delay(1000L)
                    stopwatch++
                    EventListener.emit("onUpdateStopwatch", Arguments.createMap().apply {
                        putInt("stopwatch", stopwatch)
                    })
                }
            }
            val notification = Notification.Builder(this, NOTIFICATION_CHANNEL_ID)
                    .setContentTitle("WalkUP!")
                    .setContentText("최선을 다해 걸어보아요!")
                    .setSmallIcon(R.drawable.notification_icon_background)
                    .setOngoing(true)
                    .setCategory(NotificationCompat.CATEGORY_SERVICE)
                    .build()

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                startForeground(NOTIFICATION_ID, notification)
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                startForeground(NOTIFICATION_ID, notification, ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE)
            }
        }
        return START_STICKY
    }

    override fun onDestroy() {
        super.onDestroy()
        sensorManager.unregisterListener(this)
        locationManager.removeUpdates(this)
        timerScope.cancel("Service Destory")
        isRunning = false
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onSensorChanged(event: SensorEvent?) {
        event?.let {
            if(it.sensor?.type === Sensor.TYPE_STEP_COUNTER) {
                Log.d(TAG, "STEP_COUNTER sensor is detected!")
                steps++
                val notification = Notification.Builder(this, NOTIFICATION_CHANNEL_ID)
                        .setContentTitle("WalkUP!")
                        .setContentText("지금까지 ${steps}번 걸었어요!")
                        .setSmallIcon(R.drawable.notification_icon_background)
                        .setOngoing(true)
                        .setCategory(NotificationCompat.CATEGORY_SERVICE)
                        .build()
                notificationManager.notify(NOTIFICATION_ID, notification)
                EventListener.emit("onUpdateSteps", Arguments.createMap().apply {
                    putInt("steps", steps)
                })
                if (
                        ContextCompat.checkSelfPermission(
                                applicationContext,
                                "android.permission.ACCESS_FINE_LOCATION"
                        ) == PackageManager.PERMISSION_GRANTED &&
                        ContextCompat.checkSelfPermission(
                                applicationContext,
                                "android.permission.ACCESS_COARSE_LOCATION"
                        ) == PackageManager.PERMISSION_GRANTED
                ) {
                    Toast.makeText(applicationContext, "Detect!", Toast.LENGTH_SHORT)
                    locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER)?.let {
                        Toast.makeText(applicationContext, "${it.latitude}, ${it.longitude}", Toast.LENGTH_SHORT)
                        EventListener.emit("onUpdateLocation", Arguments.createMap().apply {
                            putDouble("latitude", it.latitude)
                            putDouble("longitude", it.longitude)
                            putString("time", it.time.toString())
                        })
                    }
                }
            }
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {

    }

    override fun onLocationChanged(location: Location) {

    }
}