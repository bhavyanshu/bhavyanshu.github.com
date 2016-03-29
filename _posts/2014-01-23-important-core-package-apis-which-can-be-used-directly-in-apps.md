---
layout: post
title: "Important core package APIs which can be used directly in apps [Part 1]"
description: "In this tutorial, i will be discussing about most important pre-built classes and package APIs which can be directly used while making android apps."
category: Tutorials
tags: ["Android Application Development","Android","Java"]
change_frequency: "weekly"
priority: 0.8
date: 2014-01-23 11:30:45
---

# Overview

For the package index, you can take a look [here](http://developer.android.com/reference/packages.html) and for the class index you can look [here](http://developer.android.com/reference/classes.html).

In this i will be showing you how to use some important classes from the pre-built packages. These are ofcourse which I use in most of my android apps and which I feel are very important and useful. If I miss out any, leave a comment below.

## Package Name : android

Contains resource classes used by applications included in the platform and defines application permissions for system features.

>You can use some resources directly from these R classes in your own applications, but you should generally use only resources that you've provided directly in your application, in order to provide a cohesive application package that has no external dependencies.
In particular, you should not use drawable resources from the android package, because they may change between platform versions, causing unforeseen conflicts with your design. Typically, styles are the only resources you should use directly from these resources. Styles contains the themes.

But no, i always want to build my own theme for the application and hence comes the role of actionbarsherlock which I will be discussing in later tutorials. For now let's just stick with default themes.

### The AndroidManifest.xml File

Think of the manifest file as an interface between the android developer and the android platform. In this file you define all the activities of your application and here you mention the entry point of the program.

From now on I will be using instances from my own android projects.

For example, let's look at one of my [project's](https://github.com/bhavyanshu/CheckIt_Android) androidmanifest.xml file.

    {% highlight xml %}
    <?xml version="1.0" encoding="utf-8"?>
<!--
  Copyright 2014 Bhavyanshu Parasher

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.pytacular.checkitcloudchecklist"
    android:versionCode="1"
    android:versionName="1.0" >

    <uses-sdk
        android:minSdkVersion="8"
        android:targetSdkVersion="18" />

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.GET_ACCOUNTS" />
    <uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />

    <permission
        android:name="com.parse.tutorials.pushnotifications.permission.C2D_MESSAGE"
        android:protectionLevel="signature" />

    <uses-permission android:name="com.pytacular.checkitcloudchecklist.pushnotifications.permission.C2D_MESSAGE" />

    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/Theme_Bhavyanshu" >
        <activity
            android:name="com.pytacular.checkitcloudchecklist.MainActivity"
            android:label="@string/app_name" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity
            android:name="com.pytacular.checkitcloudchecklist.CheckList"
            android:label="@string/app_name" >
        </activity>
        <activity
            android:name="com.pytacular.checkitcloudchecklist.LoginActivity"
            android:label="@string/app_name" >
        </activity>
        <activity   
            android:name="com.pytacular.checkitcloudchecklist.RegisterActivity"
            android:label="@string/app_name" >
        </activity>

        <service android:name="com.parse.PushService" />

        <receiver android:name="com.parse.ParseBroadcastReceiver" >
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED" />
                <action android:name="android.intent.action.USER_PRESENT" />
            </intent-filter>
        </receiver>
        <receiver
            android:name="com.parse.GcmBroadcastReceiver"
            android:permission="com.google.android.c2dm.permission.SEND" >
            <intent-filter>
                <action android:name="com.google.android.c2dm.intent.RECEIVE" />
                <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
                <category android:name="com.pytacular.checkitcloudchecklist" />
            </intent-filter>
        </receiver>

     </application>
    </manifest>

    {% endhighlight %}

If you are familiar with the xml syntax, you would know that each element of the xml requires a start `<manifest>` and and end `</manifest>` tag. Similarly we use for all the child elements as well. Like the `<application></application>` tags etc. In xml, we write comments using `<!-- some comment -->` like I have used in writing my license information.

Next is when you define what is the minimum SDK your application will support or run on and the target SDK which your application would be built upon. These are useful when you are planning to target specific devices. This is actually a very important attribute of the manifest file. `<uses-sdk android:minSdkVersion="8" android:targetSdkVersion="18" />`

Now let us move on to the uses-permission attribute which is another important attribute for the manifest file.

	{% highlight xml %}
       <uses-permission android:name="android.permission.INTERNET" />
        <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
        <uses-permission android:name="android.permission.RECORD_AUDIO" />
        <uses-permission android:name="android.permission.WAKE_LOCK" />
        <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
        <uses-permission android:name="android.permission.VIBRATE" />
        <uses-permission android:name="android.permission.GET_ACCOUNTS" />
        <uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
	{% endhighlight %}

These are oonly few of the permissions required by my application. First is the **INTERNET** access permission. Second is acknowledging the network state and so on. The last one with **c2dm** is actually for cloud messaging to send in push notifications to the devices.

#### Entry point

Now the `<application>` tag is used to define all the important attributes which your android platform can understand. `android:icon="@drawable/file_name"` is used to define the name of the image file which will show the icon for your application. `android:label="@string/app_name"` is the name of your application which is defined in the *res/values/strings.xml* file. `android:theme="@style/Theme_NameofTheme"`is defined in the *res/values/styles.xml* file which will be used to define your custom theme.

	{% highlight xml %}
    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/Theme_Bhavyanshu" >
        <activity
            android:name="com.pytacular.checkitcloudchecklist.MainActivity"
            android:label="@string/app_name" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
	{% endhighlight %}

Now let us move on the `<activity>` tag of the xml file. This is important and must be defined for every activity component of your application for which interface will be loaded. We will have **MainActivity.java** file in *src/com.pytacular.checkitcloudchecklist/* folder.
Now the `<intent-filter>` is another important attribute. To know more, I feel this particular [official documentation](http://developer.android.com/guide/components/intents-filters.html) is enough to explain this.

Next is `CATEGORY_LAUNCHER`. The activity for which LAUNCHER category is set, is the initial activity of a task and is listed in the system's application launcher. This is important for defining the entry point/activity for your application.

That's it for now for the androidmanifest file. The `reciever` will be discussed later as it is not useful for now.

Now let us get back to our `android` package. Look at my [MainActivity.java](https://github.com/bhavyanshu/CheckIt_Android/blob/master/CheckItCloudCheckList/src/com/pytacular/checkitcloudchecklist/MainActivity.java) file here.

We first start by writing the package name which is `package com.pytacular.checkitcloudchecklist;` for my app. Then we have basic java classes `import java.util.ArrayList; import java.util.List;` from the util package. Now comes the most interesting part where you have to import classes from the android package.

	{% highlight java %}
    import android.app.AlertDialog; // This is used to create an alert dialog
    import android.app.Dialog;
    import android.app.ProgressDialog; //This is used to display a progress dialog for any background process.
	{% endhighlight %}

Now let us look at the widget package.

	{% highlight java %}
    import android.widget.AdapterView;
    import android.widget.AdapterView.OnItemClickListener;
    import android.widget.AdapterView.OnItemLongClickListener; //This is used to bind a long click listener to the adapterview
    import android.widget.EditText; //This is used to taking input from the user
    import android.widget.LinearLayout; //LinearLayout is used to define that the layout pattern is linear. There are other options as well. Like RelativeLayout
    import android.widget.ListView; //ListView is used to hold a list of items which can be edited programmatically.
    import android.widget.TextView; //Textview is used to hold all the text in the layout.
    import android.widget.Toast; //Toast is a short duration alert message which disappears on its own after certain duration
	{% endhighlight %}

The widget package contains (mostly visual) UI elements to use on your Application screen. You can also design your own.

To create your own widget, extend View or a subclass. To use your widget in layout XML, there are two additional files for you to create. Here is a list of files you'll need to create to implement a custom widget:

*    Java implementation file - This is the file that implements the behavior of the widget. If you can instantiate the object from layout XML, you will also have to code a constructor that retrieves all the attribute values from the layout XML file.
*    XML definition file - An XML file in res/values/ that defines the XML element used to instantiate your widget, and the attributes that it supports. Other applications will use this element and attributes in their in another in their layout XML.
*    Layout XML [optional]- An optional XML file inside res/layout/ that describes the layout of your widget. You could also do this in code in your Java file.

That's all for now. In next tutorial we will see how to define UI components in the layout XML file and we will also see how to define our custom styles to be used in app.

Take a look at the [table of contents](http://bhavyanshu.me/pages/toc-android-tutorials.html) for all android tutorials.

{% include JB/setup %}
