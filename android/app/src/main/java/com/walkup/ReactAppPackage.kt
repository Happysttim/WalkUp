package com.walkup

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import com.walkup.module.CronJob
import com.walkup.module.DataStore
import com.walkup.module.EventListener
import com.walkup.module.Toast
import com.walkup.module.WalkService

class ReactAppPackage : ReactPackage {
    override fun createNativeModules(p0: ReactApplicationContext): MutableList<NativeModule>
        = listOf(CronJob(p0), WalkService(p0), EventListener(p0), Toast(p0), DataStore(p0)).toMutableList()

    override fun createViewManagers(p0: ReactApplicationContext): MutableList<ViewManager<View, ReactShadowNode<*>>>
        = mutableListOf()

}