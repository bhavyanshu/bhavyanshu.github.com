---
layout: post
title: "Using ActionBarSherlock in your android application"
description: "In this tutorial, I will be explaining the importance of actionbarsherlock and its implementation in android application."
category: Tutorials
tags: ["Android Application Development","Android","Java"]
change_frequency: "weekly"
priority: 0.8
date: 2014-01-23 11:30:45
---

#Overview

###What is it?

> [ActionBarSherlock](http://actionbarsherlock.com/) is an extension of the support library designed to facilitate the use of the action bar design pattern across all versions of Android with a single API.

###What is the use of this?

> The library will automatically use the native action bar when appropriate or will automatically wrap a custom implementation around your layouts. This allows you to easily develop an application with an action bar for every version of Android from 2.x and up.

This simply means that with this support library you can easily use the actionbar layout in SDK 8 and above as well. Otherwise actionbar was added to SDK 11 and was not usable in SDK level below 11. 

###How does it work?

It automatically checks whether to use the native action bar or custom implementation according to the android version.

## Pre-requisites

* Create an app project in eclipse like shown here.
* Run it and test your app in emulator.
* Get ActionBarSherlock library.


### Where to get the drawables and styles?

Well, there is an awesome service by [Jeff Gilfelt](https://github.com/jgilfelt) which lets you download the drawables and other important resources easily for your android project. Take a look at [it](http://jgilfelt.github.io/android-actionbarstylegenerator/). After you have set up the settings, go on and download the zip file from the site.

Open the downloaded zip file and in that you will have a *res* folder. In that there are various drawables for different sizes. Copy their content and paste it in the respective folders of your eclipse project. That's it. Yes, you have to create folders which are not present and also you need to throw in the styles.xml files in the values folder as well. 

### How to import ActionBarSherlock as library?
We will first download the zip from [here](https://github.com/JakeWharton/ActionBarSherlock). 

Now take a look at this video on how to import ActionBarSherlock. Viewing this video will be very benefitial and is very important. It clearly explains on how to use ActionBarSherlock and set it up as a library project in eclipse.

<iframe width="640" height="360" src="//www.youtube.com/embed/4GJ6yY1lNNY?feature=player_embedded" frameborder="0" allowfullscreen></iframe>


##Getting Started with UI development

Now that we have setup our project to use ActionBarSherlock, we will look at customizing the UI design.

So first of all, go to my [template project](https://github.com/bhavyanshu/ActionBarSherlock_Simple_Template) which is a simplest implementation of ABS. You can use this projects as a starting point in your android application. I will explain the content of few important files in my template project.

In the [previous tutorial](/tutorials/important-core-package-apis-which-can-be-used-directly-in-apps/01/23/2014), i explained pretty well about the androidmanifest.xml file.

Moving onto the main java code in the template project.

    {% highlight java %}

    import android.os.Bundle;
    import android.widget.Toast;
    
    import com.actionbarsherlock.app.ActionBar;
    import com.actionbarsherlock.app.SherlockActivity;
    import com.actionbarsherlock.view.Menu;
    import com.actionbarsherlock.view.MenuInflater;
    import com.actionbarsherlock.view.MenuItem;
    
    public class MainActivity extends SherlockActivity {
            @Override
            public void onCreate(Bundle savedInstanceState) {
                    super.onCreate(savedInstanceState);
                    setContentView(R.layout.activity_main);
                    
                     if (savedInstanceState != null) {
             int index = savedInstanceState.getInt("selected_tab_index", 0);
             getSupportActionBar().setSelectedNavigationItem(index);
             }
            }
            
            @Override
            protected void onSaveInstanceState(Bundle outState){
            super.onSaveInstanceState(outState);
            int index = getSupportActionBar().getSelectedNavigationIndex();
            outState.putInt("selected_tab_index", index);
        }
            
            /**
             * Responding to menu items
             */
            @Override
            public boolean onCreateOptionsMenu(Menu menu) {
                    // Inflate the menu; this adds items to the action bar if it is present.
                     MenuInflater inflater = getSupportMenuInflater();
                     inflater.inflate(R.menu.mainmenu, menu);
                     return true;
            }
    
            /**
             * When an item from a menu is selected
             */
            @Override
             public boolean onOptionsItemSelected(MenuItem item) {
                    ActionBar menubar = getSupportActionBar();
                    switch (item.getItemId()) {
             case R.id.action_settings:
             Toast.makeText(this, "Settings", Toast.LENGTH_SHORT)
             .show();
             break;
             case R.id.action_switch_theme:
             Toast.makeText(this, "Switch Theme", Toast.LENGTH_SHORT).show();
             break;
    
             default:
             break;
             }
    
             return true;
             }
        }

    
    {% endhighlight %}


As you can see multiple import statements for the actionbarsherlock package. Normally for any app that does not use actionbarsherlock, you would import directly from android package.

Let us break down the code now.

	    {% highlight java %}

    public class MainActivity extends SherlockActivity { 
    // Normally you would use extends Activity rather than extends SherlockActivity.
    }

	    {% endhighlight %}

The above code is pretty simple to understand. It is using the simple java keyword *extends* that we use in inheritance concept.

	    {% highlight java %}

    public void onCreate(Bundle savedInstanceState) {
                        super.onCreate(savedInstanceState);
                        setContentView(R.layout.activity_main);

	{% endhighlight %}
                
Now in the above code, the onCreate method is defined for the activity when a layout has to be called upon and the layout needs to be created. In this case, we are using activity_main.xml which is in the folder *res/layout*.

**Role of Bundle savedInstanceState** - If you save the state of the application in a bundle (typically non-persistent, dynamic data in onSaveInstanceState), it can be passed back to onCreate if the activity needs to be recreated (e.g., orientation change) so that you don't lose this prior information. If no data was supplied, savedInstanceState is null.

    int index = savedInstanceState.getInt("selected_tab_index", 0);
    
We used above to denote the tab index. Since our layout is not using tabs, it is not required to have this at all in our application for now. But you must just understand what it does.

	    {% highlight java %}

       public boolean onCreateOptionsMenu(Menu menu) {
                // Inflate the menu; this adds items to the action bar if it is present.
                 MenuInflater inflater = getSupportMenuInflater();
                 inflater.inflate(R.menu.mainmenu, menu);
                 return true;
        }

	    {% endhighlight %}

In above code, we have used mainmenu.xml file which is present in *res/menu* folder. We are first inflating the menu and it returns true for onCreateOptionsMenu() method. Now all we need to do is add some sort of click event listener if a menu item is selected.

	    {% highlight java %}

    /**
     * When an item from a menu is selected
     */
    @Override
     public boolean onOptionsItemSelected(MenuItem item) {
            ActionBar menubar = getSupportActionBar();
            switch (item.getItemId()) {
     case R.id.action_settings:
     Toast.makeText(this, "Settings", Toast.LENGTH_SHORT)
     .show();
     break;
     case R.id.action_switch_theme:
     Toast.makeText(this, "Switch Theme", Toast.LENGTH_SHORT).show();
     break;

     default:
     break;
     }

     return true;
     } 

	    {% endhighlight %}

In the above code, we have action_settings defined in mainmenu.xml file. In the next line, i.e, `Toast.makeText(this, "Settings", Toast.LENGTH_SHORT).show();` we have used a Toast message dialog. In this with **LENGTH_SHORT** we define the duration for which the message will be visible.

That's it for now. I will talk about other components of android packages which can be used with actionbarsherlock in the next tutorial.
Refer [Table of contents](//bhavyanshu.me/pages/toc-android-tutorials.html) for all android tutorials. 

{% include JB/setup %}


