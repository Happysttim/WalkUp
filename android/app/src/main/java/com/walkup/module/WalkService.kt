package com.walkup.module

import android.content.Intent
import android.os.Build
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.walkup.service.WalkService

class WalkService(val reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {

    private val TAG = "WALK_SERVICE"

    private var steps: Int = 0

    override fun getName(): String = "WalkService"

    @RequiresApi(Build.VERSION_CODES.O)
    @ReactMethod
    fun startService() {
        reactContext.startForegroundService(
                Intent(reactContext, WalkService::class.java)
        )
    }

    @ReactMethod
    fun stopService() {
        reactContext.stopService(
                Intent(reactContext, WalkService::class.java)
        )
    }
}