package com.walkup.module

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class DataStore(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    private val COMMON: Int = 0
    private val MORE: Int = 1
    private val LESS: Int = 2

    private val store: SharedPreferences by lazy {
        context.getSharedPreferences("WalkUpPreferences", Context.MODE_PRIVATE)
    }

    override fun getName(): String = "DataStore"

    @ReactMethod
    fun putMaximumSteps(steps: Int): Boolean {
        val editor = store.edit()

        editor.putInt("maximum_steps", steps)
        return editor.commit()
    }

    @ReactMethod
    fun getMaximumSteps(): Int  = store.getInt("maximum_steps", 2000)

    @ReactMethod
    fun putColor(type: Int, color: String): Boolean {
        val editor = store.edit()

        editor.putString(
                when(type) {
                    COMMON -> "common_color"
                    MORE -> "maximum_color"
                    LESS -> "minimum_color"
                    else -> "common_color"
                }, color
        )
        return editor.commit()
    }

    @ReactMethod
    fun getColor(type: Int): String? = store.getString(
            when(type) {
                COMMON -> "common_color"
                MORE -> "maximum_color"
                LESS -> "minimum_color"
                else -> "common_color"
            }, "#000000"
    )
}