package com.walkup.module

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

class EventListener: ReactContextBaseJavaModule {

    private object ContextValue {
        var context: ReactApplicationContext? = null
    }

    constructor(reactContext: ReactApplicationContext) {
        ContextValue.context = reactContext
    }

    override fun getName(): String = "EventListener"

    companion object {
        @Synchronized
        fun emit(eventName: String, args: WritableMap) {
            ContextValue.context?.let {
                it.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit(eventName, args)
            }
        }
    }

}