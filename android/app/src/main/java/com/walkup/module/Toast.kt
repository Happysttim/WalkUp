package com.walkup.module

import android.os.Build
import android.text.Html
import android.view.Gravity
import android.widget.Toast
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class Toast(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    override fun getName(): String = "Toast"

    @ReactMethod
    fun makeText(message: String, duration: Int) = Toast.makeText(context, message, duration).show()

    @RequiresApi(Build.VERSION_CODES.N)
    @ReactMethod
    fun makeTextColor(message: String, duration: Int, rgb: String) {
        Toast.makeText(context, Html.fromHtml("<font color=$rgb>$message</font>", Html.FROM_HTML_MODE_LEGACY), duration).show()
    }

    @RequiresApi(Build.VERSION_CODES.N)
    @ReactMethod
    fun makeTextDetail(message: String, duration: Int, rgb: String, gravityType: Int, xOffset: Int, yOffset: Int) {
        val toast = Toast.makeText(context, Html.fromHtml("<font color=$rgb>$message</font>", Html.FROM_HTML_MODE_LEGACY), duration)
        Gravity.AXIS_CLIP
        toast.setGravity(gravityType, xOffset, yOffset)
        toast.show()
    }
}