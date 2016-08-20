---
layout: post
title: "Linux configuration for UIS campus WiFi using NetID"
description: "Okay, I have checked in to my campus today. It does not automatically connect to campus WiFi so I decided to write a tutorial on how to configure. University website has no help for linux folks. So here it is."
tags: ["linux"]
change_frequency: "weekly"
priority: 0.8
image: uis/uiswifi-6.png
date: 2016-08-19 19:01:33
---

## Let's begin

Even though our university has a simple wifi configuration, it might be difficult for new linux users to connect to the network. So here is a simple step by step tutorial on how to configure.

* Open your "Network Connections" app. In that click on "Add" button. Next, in "Choose your connection type", select WiFi as shown below.

![Step 1](/assets/imags/uis/uiswifi-1.png "Step 1")

![Step 2](/assets/imags/uis/uiswifi-2.png "Step 2")

![Step 3](/assets/imags/uis/uiswifi-3.png "Step 3")

* Next, it will open up a window asking for various configurations. Here they are,


> Connection Name : It can be anything as it doesn't make any difference. It can be like, "UISNix".  
> **Under WIFI tab,**  
> SSID : UISWiFi  
> Mode : Infrastructure  
> BSSID : Leave blank  
> Device MAC address : Select from dropdown  
> Cloned MAC address : Leave blank  
> MTU : Automatic  

>**Under WIFI Security tab,**  
> Security : WPA & WPA2 Enterprise  
> Authentication : PEAP  
> Anonymous Identity : Leave blank  
> CA Certificate : Leave it  
> PEAP Version : Automatic  
> Inner Auth : MSCHAPv2  
> Username : NetID without @uis.edu  
> Password : Your uis.edu password  

Then click on "Save" button and it should be good to go. Take a look at following images if you couldn't follow.

![Step 4](/assets/imags/uis/uiswifi-4.png "Step 4")

![Step 5](/assets/imags/uis/uiswifi-5.png "Step 5")

![Step 6](/assets/imags/uis/uiswifi-6.png "Step 6")

{% include JB/setup %}
