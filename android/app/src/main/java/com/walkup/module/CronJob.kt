package com.walkup.module

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import dev.inmo.krontab.buildSchedule
import dev.inmo.krontab.doWhileTz
import korlibs.time.DateTimeTz
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class CronJob(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    class CronSchedule(private val cronName: String, private val expression: String, private val callback: (DateTimeTz) -> Unit) {
        private var scheduled: Boolean = false
        private var isRunning: Boolean = false;
        private val buildSchedule = buildSchedule(expression)

        suspend fun cron() {
            if(!isRunning) {
                isRunning = true
                buildSchedule.doWhileTz {
                    Log.d("CronJob", "$cronName($expression) schedule is work")
                    callback(it)
                    scheduled
                }
            }
        }

        fun stop() {
            scheduled = false
        }

        fun start() {
            scheduled = true
        }

        fun isRunning() = isRunning

        @Override
        override fun toString(): String {
            return cronName
        }
    }

    private val storage: MutableMap<String, CronSchedule> = mutableMapOf()
    override fun getName(): String = "CronJob"

    @ReactMethod
    fun registerCronJob(name: String, expression: String, eventName: String): Boolean {
        if(storage[name] != null) {
            Log.e("CronJob","This $name name is duplicated")
            return false
        }
        val newCron = CronSchedule(name, expression) { it ->
            context
                    .getJSModule(
                            DeviceEventManagerModule.RCTDeviceEventEmitter::class.java
                    )
                    .emit(
                            eventName,
                            Arguments.createMap().apply {
                                putString("datetime", it.toString("yyyy-MM-dd HH:mm:ss"))
                            }
                    )
        }
        storage[name] = newCron
        Log.e("CronJob","This $name cronjob is registered!")
        return true
    }

    @ReactMethod
    fun cron(name: String, promise: Promise): Boolean {
        if(storage[name] == null) {
            Log.e("CronJob","This $name cronjob is not defined")
            return false
        }

        CoroutineScope(Dispatchers.Main).launch {
            storage[name]!!.cron()
            promise.resolve(true)
        }

        return true
    }

    @ReactMethod
    fun startCronJob(name: String): Boolean {
        if(storage[name] == null) {
            Log.e("CronJob","This $name cronjob is not defined")
            return false
        }
        storage[name]!!.start()
        return true
    }

    @ReactMethod
    fun stopCronJob(name: String): Boolean {
        if(storage[name] == null) {
            Log.e("CronJob","This $name cronjob is not defined")
            return false
        }
        storage[name]!!.stop()
        return true
    }

    @ReactMethod
    fun isRunning(name: String): Boolean {
        if(storage[name] == null) {
            Log.e("CronJob","This $name cronjob is not defined")
            return false
        }

        return storage[name]!!.isRunning()
    }
}