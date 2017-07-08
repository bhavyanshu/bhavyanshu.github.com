---
layout: post
title: "Show custom alert dialog with EditText inside it - Android Java"
description: "This shows how to display a custom alert dialog with an EditText inside it."
category: Tutorials
tags: ["Android Application Development","Android","Java"]
change_frequency: "weekly"
priority: 0.8
date: 2015-08-20 12:04:23
---

# Overview

This is for my own reference actually but if someone is looking for a solution on how to create a custom alert dialog, then this is the right tutorial for you.

Create a new layout file under *res/layout*

**custom_dialog.xml**

	{% highlight xml %}
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="10dp"
    android:orientation="vertical">

    <EditText
        android:id="@+id/edit1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="text" />

</LinearLayout>
	{% endhighlight %}

I have shown the custom alert dialog when user presses a menu item but you can also do it using button click. Just use this code in `public void buttonAction(final View v)` method. Now in the activity where you want to show the custom alert dialog, add

**MainActivity.java**

In `onOptionsItemSelected(MenuItem item)` add the following,

	{% highlight java %}
@Override
public boolean onOptionsItemSelected(MenuItem item) {
int id = item.getItemId();

    switch (id) {
    	case R.id.action_custom_dialog:
            showChangeLangDialog();
            return true;

        //similarly write for other actions

        default:
            return super.onOptionsItemSelected(item);
    }
    return true;
}
	{% endhighlight %}

Now add the following method after `onOptionsItemSelected()`. This is the important part,

	{% highlight java %}
public void showChangeLangDialog() {
    AlertDialog.Builder dialogBuilder = new AlertDialog.Builder(this);
    LayoutInflater inflater = this.getLayoutInflater();
    final View dialogView = inflater.inflate(R.layout.custom_dialog, null);
    dialogBuilder.setView(dialogView);

    final EditText edt = (EditText) dialogView.findViewById(R.id.edit1);

    dialogBuilder.setTitle("Custom dialog");
    dialogBuilder.setMessage("Enter text below");
    dialogBuilder.setPositiveButton("Done", new DialogInterface.OnClickListener() {
        public void onClick(DialogInterface dialog, int whichButton) {
            //do something with edt.getText().toString();
        }
    });
    dialogBuilder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
        public void onClick(DialogInterface dialog, int whichButton) {
            //pass
        }
    });
    AlertDialog b = dialogBuilder.create();
    b.show();
}
    {% endhighlight %}

That's it. If you want to see how to use a spinner inside the custom alert dialog, [see this tutorial](/tutorials/provide-multiple-language-support-in-your-android-app/08/20/2015).

{% include JB/setup %}
