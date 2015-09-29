---
layout: post
title: "How to run silverlight apps in firefox for linux platform"
description: "Simple way to run silverlight apps in firefox for linux platform. In short, it's hacking the silverlight nightmare for linux users"
category:
tags: ["silverlight", "linux"]
change_frequency: "weekly"
priority: 0.8
date: 2014-02-01 08:40:00
image: tuts/silverlight/sil1.png
---

# Why you need this? 

Apparently my college has this really terrible written software in silverlight that they use for online quizes. Apparently, i am running linux and needed a way to get silverlight working for linux. I searched around on google for more information and linked few solutions together which finally worked out for me.

# Let's get silverlight apps running on linux

Now to run the silverlight apps, just open your terminal and get typing few simple commands.

    {% highlight bash %}
    
    sudo apt-get install mono-complete
    
    sudo apt-add-repository ppa:ehoover/compholio
    
    sudo apt-add-repository ppa:mqchael/pipelight
    
    sudo apt-get update
    
    sudo apt-get install pipelight
    
    {% endhighlight %}

What we did here is install [moonlight](http://mono-project.com/Moonlight) first. It gets installed via mono-complete package. To those who don't know, moonlight is an open source alternative to silverlight that lets you run silverlight apps. 

But that's not enough!

What we have is moonlight currently, it will compile silverlight apps just fine on your local system. We need an interface/plugin that will help us run silverlight apps on a browser. 

Here comes [pipelight](https://launchpad.net/pipelight). Pipelight is a special browser plugin which allows one to use windows only plugins inside Linux browsers. We are currently focusing on Silverlight, Flash, Shockwave and the Unity Webplayer. So that's it. 

<img src="/assets/imags/tuts/silverlight/sil1.png" alt="firefox plugins test" />

Test whether your silverlight is working or not using [this link](http://www.microsoft.com/silverlight/pixel-shader/demo/). If it is not working then you will see the plugin window asking you to install silverlight. If it working, then I guess you can enjoy that shitty silverlight app.

You will probably see something like shown below in the image.

<img src="/assets/imags/tuts/silverlight/sil2.png" alt="firefox plugins test" />

## Few words for so called silverlight app developers

I won't say it is bad. I would say it is bad at web developers end to be using silverlight in their web applications. First of all it is a useless dependency. Secondly, web developers using silverlight seriously need to learn some web development skills because it is frustrating for the users to download an external utility just to view one single page. No true web developer would want the web app users to be downloading an external utility so that they can use the web app. It is totally not cool!

{% include JB/setup %}


