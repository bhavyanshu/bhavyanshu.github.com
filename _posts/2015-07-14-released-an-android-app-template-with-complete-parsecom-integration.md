---
layout: post
title: "Released an android app template with complete parse.com integration - Yes, it's in public domain"
description: "If anyone is planning to develop app using parse.com as a backend, I have provided a template for it and it is in public domain."
category: Tutorials
tags: ["Android Application Development","Android","Java"]
change_frequency: "weekly"
priority: 0.8
date: 2015-07-14 11:30:20
---

This is a template for android app that uses parse.com as backend.

 > [Get it from github](https://github.com/bhavyanshu/TemplateAppParse-dot-com)

## What to expect in the template?

* Has two types of login (One is for twitter & another is for email + password), register, forgot password, change password, email verification functionality.
* Has AppCompat based custom theme, Support toolbar, English & hindi translations for all string resources.

Of course it is compatible with android studio. The support toolbar is designed according to latest lollipop design specs & is also backward compatible with older OS versions as well. All in all this is a perfect starting point for anyone looking forward to integrating their android app with Parse.

Also the source code is in public domain. You are free to do anything you want with it. More specific terms are in the [UNLICENSE](https://github.com/bhavyanshu/TemplateAppParse-dot-com/blob/master/UNLICENSE) document provided with the source code.

## How to derive your own app from this template?

Simply import it into your android studio. This post is basically about explaining the components & what each component does.

To begin with, first let us look at the app [manifest](https://github.com/bhavyanshu/TemplateAppParse-dot-com/blob/master/app/src/main/AndroidManifest.xml) file.

These permissions are the only permissions that are required for all the authentication work & push notifications.

	{% highlight xml %}
	<uses-permission android:name="android.permission.INTERNET" />
	<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
	<uses-permission android:name="android.permission.WAKE_LOCK" />
	<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
	<uses-permission android:name="android.permission.VIBRATE" />
	<uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
	{% endhighlight %}

Then you need to change your package name wherever "me.app.template" is present. There are three instances of it in AndroidManifest.xml

	{% highlight xml %}
	<permission
	android:name="me.app.template.permission.C2D_MESSAGE"
	android:protectionLevel="signature" />
	<!-- Change packagename -->
	<uses-permission android:name="me.app.template.permission.C2D_MESSAGE" /><!-- Change packagename -->
	...
	...
	...
	<receiver
            android:name="com.parse.GcmBroadcastReceiver"
            android:permission="com.google.android.c2dm.permission.SEND" >
            <intent-filter>
                <action android:name="com.google.android.c2dm.intent.RECEIVE" />
                <action android:name="com.google.android.c2dm.intent.REGISTRATION" />

                <category android:name="me.app.template" /><!-- Change packagename -->
            </intent-filter>
        </receiver>
	{% endhighlight %}

Then we have the application entry point. In the application entry point we basically do all the parse initialization tasks.

AndroidManifest.xml

	{% highlight xml %}
	<application
        android:name=".AppInit"
	{% endhighlight %}

AppInit.java

	{% highlight java %}
        Parse.enableLocalDatastore(this);
        Parse.initialize(this, getString(R.string.parse_application_ID), getString(R.string.parse_client_key));
	{% endhighlight %}

Make sure you replace parse_application_ID & parse_client_key in **app.xml file**. You will get these keys from parse.com when you create a new app.

	{% highlight xml %}
	<?xml version="1.0" encoding="utf-8"?>
	<resources>
	    <string name="parse_client_key">put_your_parse_client_key_here</string>
	    <string name="parse_application_ID">put_your_parse_app_id_here</string>
	</resources>
	{% endhighlight %}

BaseActivity.java & NoAuthActivity.java are two activities which are extended by other activities. NoAuthAcitivty is to be used by any activity that does not have any authentication data & BaseActivity is to be used for any activity that requires authenticated access. The point of having two is because it makes it easier to display separate menu items for authenticated & non-authenticate users. Both of these extend the AppCompatActivity. So you only need to extend any of these from some other activity & it will inherit everything.

Like in LoginActivity.java

	{% highlight java %}
	public class LoginActivity extends NoAuthActivity {
	{% endhighlight %}

& when logged in, it will start MainActivity.java which uses BaseActivity.java

	{% highlight java %}
	public class MainActivity extends BaseActivity {
	{% endhighlight %}

### Tables modified in the database

The columns mentioned below are the ones I have added and will not exist in default app setup on parse.com so make sure you add these.

Table name : **_User**
		-> **screenName** (String)

Table name : **tw**
		-> **keyid** (String)
		, **secretid** (String)


### Twitter login & signup

The normal login is easy. That should work as it is. Just make sure you have added above mentioned columns in the _User table. The real deal is twitter. I store keys where I can easily & quickly modify them in case I revoke them. So I use parse table for that purpose.

If you followed database schema provided in previous step, you should have a table "tw" & string type columns "keyid" & "secretid". As you can see in LoginActivity.java I have written a parse query to get these values

	{% highlight java %}
        ParseQuery<ParseObject> qtw = ParseQuery.getQuery("tw");
        qtw.getFirstInBackground(new GetCallback<ParseObject>() {
            @Override
            public void done(ParseObject obj, ParseException e) {
                if(e==null){
                        String tw_consumer_key = obj.get("keyid").toString();
                        String tw_consumer_secret = obj.get("secretid").toString();
                        ParseTwitterUtils.initialize(tw_consumer_key, tw_consumer_secret);
                }
                else {
                    Log.d("Tw: Error", e.getMessage());
                }
            }
        });
	{% endhighlight %}

The benefit of this method is that if you need to revoke twitter keys, you just need to quickly modify them in the table only. The app will query this data. Moreover, you should avoid adding important keys directly as strings in android app. Apps can be reverse engineered & the keys can be misused. In above steps, I have shown parse keys being added as strings. It's wrong as well. What you should do is, if you own a server, then send a request to your own server & get these keys first. Then use them. It's just one added layer of obfuscation. Doesn't mean it is a completely secure method. Rather it just gets time consuming for the hacker to get to the keys. If you want to avoid doing it this way, then simply remove whole of the above code with just this one line (shown below) & pass your keys as parameters but with this you will have to push an app update in case you revoke your twitter keys.

	{% highlight java %}
	ParseTwitterUtils.initialize(tw_consumer_key, tw_consumer_secret);
	{% endhighlight %}

The SignIn & SignUp are both handled by signInTwitter function called when Log In with Twitter button is pressed.

	{% highlight java %}
	public void signInTwitter(final View v){
	...
	...
		if (user == null) {
                    Log.d("RYC", "Uh oh. The user cancelled the Twitter login.");
                    spinner.setVisibility(View.GONE);
                    v.setEnabled(true);
                }
		else if (user.isNew()) { //Sign up
                    Log.d("RYC", "User signed up and logged in through Twitter!");
                    String userscreenName = ParseTwitterUtils.getTwitter().getScreenName();
                    user.put("screenName", userscreenName); //screenName is a column in parse.com _User table.
                    try {
                        user.save();
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                    spinner.setVisibility(View.GONE);
                    LoginActivity.this.startActivity(new Intent(LoginActivity.this, MainActivity.class));
                    finish();
                    }
                    else {
                    Log.d("RYC", "User logged in through Twitter!");
                    //Call MainActivity.java
                    }
                    ...
                    ...
	{% endhighlight %}

As you can see I have used additional column in _User table. That is called **screenName**. Had to use this because when parse pulls the data from twitter, the data added to username column in _User table is hashed but ParseTwitterUtils provides a way to get the real username & it is via .getScreenName(); function as shown above.

One more thing. In case you need to check whether the user has verified email or not, just use this code in your respective activity's onCreate

	{% highlight java %}
	ParseUser currentUser = ParseUser.getCurrentUser();
	if (currentUser.containsKey("email")) { //Means people who have logged in using normal registration & not twitter
	                //check verification status
	                boolean verify = currentUser.getBoolean("emailVerified");
		if (!verify) {
		//NOT VERIFIED, send user back to LoginActivity.
		Intent i = new Intent(this, LoginActivity.class);
		startActivity(i);
		finish();
		}
	}
	{% endhighlight %}

Twitter does not allow extracting email addresses. Hence, the values of column "email" are only set for people who register using email and not for those who register via twitter. Therefore checking containsKey("email") is very important otherwise it will return undefined value for twitter users & they will be sent back to Login Acitivty. **Also make sure you turn on email verification in your parse settings.**


### AppCompat & Toolbar support

To get the toolbar functionality, you need to have toolbar in the layout file. Like

	{% highlight xml %}
	<include
        android:id="@+id/toolbar"
        layout="@layout/toolbar" />
	{% endhighlight %}

This is backward compatible with android versions prior to lollipop. So you don't have to worry about compatibility issues. This method is used to custom design actionbars for Lollipop. Look at toolbar.xml & styles.xml for more details. Now in YourActivity.java just add the below code to use toolbar wherever you want.

	{% highlight java %}
	Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
	{% endhighlight %}

That's all there is. I hope you are able to use this easily with the above mentioned customizations. In case you encounter a problem, leave a comment below.

Refer [Table of contents](//bhavyanshu.me/pages/toc-android-tutorials.html) for all android tutorials.

{% include JB/setup %}
