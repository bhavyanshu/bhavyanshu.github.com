---
layout: post
title: "Showing context menus for two listviews in same activity - Android Java"
description: "This shows how to display respective context menu popups for two listviews in same layout."
category: Tutorials
tags: ["Android Application Development","Android","Java"]
change_frequency: "weekly"
priority: 0.8
date: 2015-08-20 12:02:23
---

#Overview

I wrote this for my own reference but I hope this helps someone looking for a solution to register two different ListViews to show respective context menus in the same activity layout.

For this, open your layout file for the acitivity. Add two listviews. Skip this step if you already have added two listviews in your activity layout.

**activity_main.xml**

	{% highlight xml %}
<ListView
    android:id="@+id/list1"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:divider="@android:color/transparent" />

<ListView
    android:id="@+id/list2"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_below="@+id/list1"
    android:dividerHeight="10dp"
    android:divider="@android:color/transparent" />
    {% endhighlight %}

So now we have two listviews, we need to create two seperate menu layouts. In your *res/menu/* create two files,

**menu_listview_1.xml**

	{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<menu
    xmlns:android="http://schemas.android.com/apk/res/android" 
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <item android:id="@+id/remove"
        android:title="Remove"
        app:showAsAction="ifRoom|withText"
        />
    <item android:id="@+id/Edit"
        android:title="Edit"
        app:showAsAction="ifRoom|withText"
        />
</menu>
	{% endhighlight %}

**menu_listview_2.xml**

	{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<menu
    xmlns:android="http://schemas.android.com/apk/res/android" xmlns:app="http://schemas.android.com/apk/res-auto">

    <item android:id="@+id/delete"
        android:title="Delete"
        app:showAsAction="ifRoom|withText"
        />
    <item android:id="@+id/rename"
        android:title="Rename"
        app:showAsAction="ifRoom|withText"
        />
</menu>
	{% endhighlight %}


Now finally let us see how to handle different listviews. In `onCreateContextMenu()` we use conditional statement and compare the view IDs like,

	{% highlight java %}
@Override
public void onCreateContextMenu(ContextMenu menu, View v,
                                ContextMenu.ContextMenuInfo menuInfo) {
    super.onCreateContextMenu(menu, v, menuInfo);
    if (v.getId()==R.id.list1) { //For first listview
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_listview_1, menu);
    }
    if (v.getId()==R.id.list2) { //For second listview
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_listview_2, menu);
    }
}
	{% endhighlight %}

Then in `onContextItemSelected()` we handle whatever the user presses just like we normally do. It does not matter what menu it belongs to because we are already handling all that in `onCreateContextMenu()` 

	{% highlight java %}
@Override
public boolean onContextItemSelected(MenuItem item) {
    AdapterView.AdapterContextMenuInfo info = (AdapterView.AdapterContextMenuInfo) item.getMenuInfo();
    int index = info.position; //Use this for getting the list item value
    View view = info.targetView;
    switch(item.getItemId()) {
        case R.id.remove:
        	Log.d("onContextItemSelected","Remove Pressed");
            return true;

        case R.id.edit:
        	Log.d("onContextItemSelected","Edit Pressed");
            return true;

        case R.id.delete:
        	Log.d("onContextItemSelected","Delete Pressed");
            return true;

        case R.id.rename:
        	Log.d("onContextItemSelected","Rename Pressed");
            return true;

        default:
            return super.onContextItemSelected(item);
    }
}
	{% endhighlight %}

Now finally we need to register our listviews for context menu. Add in `onCreate()` method,

	{% highlight java %}
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    //other stuffs
    
    mListView1 = (ListView) findViewById(R.id.list1);
    mListView2 = (ListView) findViewById(R.id.list2);
    
    // setadapter and other listeners and then finally

    registerForContextMenu(mListView1);
    registerForContextMenu(mListView2);

}
	{% endhighlight %}

That's all. Try to run the app and test it out. Leave a comment below if you want to ask anything.

{% include JB/setup %}