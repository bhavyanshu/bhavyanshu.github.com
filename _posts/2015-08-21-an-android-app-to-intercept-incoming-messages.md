---
layout: post
title: "An android app to intercept incoming messages using BroadcastReceiver"
description: "Develop an android app to intercept incoming SMS using BroadcastReceiver"
category: tutorials
tags: ["Android Application Development","Android","Java"]
change_frequency: "weekly"
priority: 0.8
date: 2015-08-23 09:14:21
---

# Overview

It is possible in Android to read all incoming SMS messages. That's why you see so many alternative apps for managing your SMS/MMS. Sometimes you see apps directly reading your incomming messages, like small code generated when you register with some app? It will automatically check if the incoming code in the message matches the one on their server. All this can be done using specific permissions which you can specify in *AndroidManifest.xml* file. They basically start a Receiver service which can have `onReceive` method to intercept all incoming messages and look for the required code. In this example I have shown how to log complete incoming message. You can view it in logcat.

First thing first, let us add permissions and receiver in our manifest file.

**AndroidManifest.xml**

	{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="le.random.package.sms2db" >

    <uses-permission android:name="android.permission.RECEIVE_SMS" />
    <uses-permission android:name="android.permission.READ_SMS" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" >

        <receiver android:name=".SMSLog">
            <intent-filter>
                <action android:name="android.provider.Telephony.SMS_RECEIVED" />
            </intent-filter>
        </receiver>

        <activity
            android:name=".MainActivity"
            android:label="@string/app_name" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
	{% endhighlight %}

**SMSLog.java** - This is our main Receiver class

	{% highlight java %}

//imports etc..

public class SMSLog extends BroadcastReceiver {

    private SharedPreferences preferences;

    @Override
    public void onReceive(Context context, Intent intent) {
        // TODO Auto-generated method stub

        if(intent.getAction().equals("android.provider.Telephony.SMS_RECEIVED")){
            Bundle bundle = intent.getExtras();
            SmsMessage[] msgs = null;
            String msg_from;
            String msg_body;
            if (bundle != null){
                try{
                    Object[] pdus = (Object[]) bundle.get("pdus");
                    msgs = new SmsMessage[pdus.length];
                    for(int i=0; i<msgs.length; i++){
						msgs[i] = SmsMessage.createFromPdu((byte[]) pdus[i]);

                        msg_from = msgs[i].getOriginatingAddress();
                        String msg_body = msgs[i].getMessageBody();

                        //or break the message body by whitespaces and look for code?
                        String arrayString[] = msg_body.split("\\s+"); // you can now iterate over this as well

                        //or just check in the message for a word
                        if(msg_body.toLowerCase().contains("SomeWordToLookFor".toLowerCase())) {
                            //Valid message, now send it to DB maybe? or just log it for now
                            String tolog = "Log: ["+getreadabledate()+"] New Message: "+msg_body+" - "+msg_from+"\n";
                            Log.d("Got",tolog);
                        }
                        else {
                            //Useless message, ignore it
                            Log.e("Got : ","Invalid message. Must ignore it. ->"+ msg_body);
                            return;
                        }
                    }
                }
                catch(Exception e) {
                    Log.d("Exception caught",e.getMessage());
                }
            }
        }
    }

    /**
     * Method to convert current long type timestamp to human readable format - Easter egg ;)
     */
	public String getreadabledate() {
        long milles = System.currentTimeMillis();
        SimpleDateFormat df = new SimpleDateFormat("MMM dd yyyy HH:mm", Locale.getDefault());
        Date resultdate = new Date(milles);
        return df.format(resultdate);
    }
}
	{% endhighlight %}

**MainActivity.java** - This is the activity where we handle our Receiver. Like enable and disable it with a button? Yes, you can do that. But first, create layout file called activity_main.xml and put two buttons in it with `android:onClick="connect"` & `android:onClick="disconnect"` respectively. I hope you can do that.

	{% highlight java %}
public class MainActivity extends AppCompatActivity {

    private Button startbtn, stopbtn;
    private int NOTIFICATION = 81237;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        startbtn = (Button) findViewById(R.id.connbtn);
        stopbtn = (Button) findViewById(R.id.disconnbtn);
	}

	/**
	 * Handling the button clicks
	 */
	public void connect(final View v) {
        startbtn.setVisibility(View.INVISIBLE);
        enableBroadcastReceiver(v);
        stopbtn.setVisibility(View.VISIBLE);
    }
    public void disconnect(final View v) {
        stopbtn.setVisibility(View.INVISIBLE);
        disableBroadcastReceiver(v);
        startbtn.setVisibility(View.VISIBLE);
    }

    /**
     * This method enables the Broadcast receiver registered in the AndroidManifest file.
     *
     * @param view
     */
    public void enableBroadcastReceiver(View view) {

        ComponentName receiver = new ComponentName(this, SMSLog.class); //created SMSLog class above!
        PackageManager pm = this.getPackageManager();

        pm.setComponentEnabledSetting(receiver,
                PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
                PackageManager.DONT_KILL_APP);
        Toast.makeText(this, "Enabled logging", Toast.LENGTH_SHORT).show();

        //Let us also show a notification
        Notification notification = new Notification.Builder(getApplicationContext())
                .setContentTitle("SMS Logger Running")
                .setContentText("Status: Logging..")
                .setSmallIcon(R.drawable.ic_notif)
                .build();
        notification.flags |= Notification.FLAG_NO_CLEAR | Notification.FLAG_ONGOING_EVENT;
        NotificationManager notifier = (NotificationManager) getApplicationContext().getSystemService(Context.NOTIFICATION_SERVICE);
        notifier.notify(NOTIFICATION, notification);
    }

    /**
     * This method disables the Broadcast receiver registered in the AndroidManifest file.
     *
     * @param view
     */
    public void disableBroadcastReceiver(View view) {
        ComponentName receiver = new ComponentName(this, SMSLog.class);
        PackageManager pm = this.getPackageManager();
        pm.setComponentEnabledSetting(receiver,
                PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                PackageManager.DONT_KILL_APP);
        Toast.makeText(this, "Disabled logging", Toast.LENGTH_SHORT).show();
        ((NotificationManager) getApplicationContext().getSystemService(Context.NOTIFICATION_SERVICE)).cancel(NOTIFICATION);
    }
}
	{% endhighlight %}

That's all. Try it out. If you have any questions, leave a comment below.

{% include JB/setup %}
