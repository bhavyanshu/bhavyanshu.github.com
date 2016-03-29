---
layout: post
title: "Trying out Manjaro Linux on my 12 year old Pentium 4 Desktop"
description: "See few tips and tricks for Manjaro Openbox like setting keyboard shortcuts, editing user interface and adding more interactive stuff."
tags: ["linux"]
image: tuts/manjaro/manjaro1.png
change_frequency: "weekly"
priority: 0.8
date: 2014-10-03 14:00:34
---


# Manjaro Openbox - A Linux Operating System

This is my overall review on [Manjaro OpenBox](http://manjaro.org/get-manjaro/). I have a 12 year old Pentium 4 3.06GHz desktop with about 1GB RAM & has Hyper-Threading Technology (It was the latest processor at that time). HTT simply means that even though there is single physical core available, it appears to the Operating System as if there are two logical Processors. But being low on physical memory, i had to take a decision on what operating system would be the best that will be good performance wise as well as be somewhat user friendly.
I personally wanted to go for Arch linux because it lets you control your system in a better way. Manjaro OpenBox is based on Arch Linux and comes with a desktop environment. There are three desktop environments for it: XFCE, OpenBox and KDE.

## Why I settled for OpenBox

Since the PC is Pentium 4 and has only 1GB of RAM available. Even from that 1GB of RAM, out of which around 128 MB RAM is shared by GPU. This is the reason why you see less RAM than what is physically present on your hardware. So opting KDE, which is likely to make the system slower due to being more graphics intensive. It would probably have taken up 500MB RAM to just load the GUI. Forget about applications which would be made to run on the leftover RAM. To be precise, I only use a browser, terminal, media player and a code editor application. I do not use anything else. If I want to use graphics editing program, which I rarely use, I just use GIMP for that. So yeah I only need 4-5 applications running and nothing else. I was only left with an option of using either XFCE or OpenBox. XFCE being extremely lightweight was a great option indeed but OpenBox has various advantages. Performance wise XFCE would win over OpenBox but not significantly. OpenBox lets you control how you want to interact with your desktop environment. All you need to do is edit few XML files or use various GUIs that come along with openbox to edit desktop UI settings.

## Booting from Live USB

I downloaded the iso file of Manjaro Openbox (i686/32 bit). As of the date of writing this post, it comes with Linux kernel 3.12.20 and desktop env openbox.  
I experimented around with it. The first thing I found was that wherever you right click on desktop, it opens up your menu.
(Like start menu in windows). From there you can select various program. The top right corner has system tray with icons of clipboard app, sound (ALSA mixer) and Network connection notifier. The left of that shows 4 desktops. You should know that most LDEs support multi-desktops. The usual shortcut keys work prefectly well. Like switching between apps using Alt+TAB, switching between desktops using Alt+F1-4 etc. So I went on and installed Openbox to a partition. I allocated 10GB to root, 10GB to home and 2GB of swap. Each belonging to different partitions ofcourse. It comes with a standard partitioner and it is very famous. It's called GParted. You can use it to partition your harddrive in case you wish to dual boot with some other operating system like I have done. The overall installation was quick. It was about 2GB or something when I looked into root partition diskspace. My home was about 3.89MiB initially. I logged into the newly installed system and saw CPU averaging around 2% initially without any running applications and RAM around 10-15% which is very good performance wise. It means that I can run firefox browser and code editor without any lag. Not to forget I still had SWAP too. SWAP was always on 0% for obvious reason. Next thing I saw was that there was no gcc compiler. Also Arch linux uses **pacman** as package manager (Used to install software packages). With my previous experience on Linux Mint, i felt very comfortable using apt-get whereas pacman was a bit difficult initially especially when I did not know what all options it has to offer. I would still prefer apt-get over pacman because I am more comfortable using that. Anyway, so I installed gcc compiler, VLC media player and firefox browser using pacman. Also there is another way to install all this. When you first boot up Manjaro, it provides you with a GUI to select various apps. You can just select and let manjaro do all the installation for you. No need to use pacman. So it's good for users who have no background in linux and have recently switched from windows.
Okay, the next thing I tested was performance of the system. Please note that this is not an accurate benchmarking method but just purely based on my observations. I take no gaurantee that you will get the same results.
I started firefox browser, opened up various tabs like one for twitter, one for youtube and played few videos. I observed the CPU and RAM usage side by side. It comfortably averaged to about 48% RAM and CPU peek was around 78% while the video was playing and I had almost 4 firefox tabs open. I lauched sublime text editor and did not see any significant increase other than just 1% increase in RAM. I compiled a large (Computation wise) C code and ran it. Still no significant increase. It meets my requirement and the decision to opt for OpenBox was a fine decision. I just wished it would come with atleast gcc compiler. But that's not really a major issue. It's just one command away.

Now I explored the major feature that OpenBox has to offer. Let's see how can we control how we want to interact with our desktop and make it a pleasurable experience even on a 12 year old computer. The default file manager is **Thunar File Manager** and default terminal is **LXTerminal**. I prefer Terminator because it offers multiple windowing in single terminal so I installed it using pacman. To search a file, there is **Catfish File Search** tool which is very easy to use. Though the only time CPU peeked to 100% was when I was searching for a file in File System. File System is huge but the search returned results very quickly.

## Personalizing

The graph like thing you see printed on top right of desktop is done by an app called **conky**. Mine looks different in color because I have edited it. Yes! you can edit almost anything in OpenBox. Let's see various files where you can edit all this. One of the most important file is rc.xml file. It is located in .config/openbox/rc.xml. Since it is an xml file, it can easily be opened up in **Geany** (Default code editor) or using Sublime Text. So I opened up rc.xml and scrolled down to Keybind part. Here you can define what apps you wish to run by simple keyboard shortcuts. This is what I have added in mine. It might help you too so I thought I should share it. But you must install these apps and make sure the location is correct in the <command> tags. It's just the same way you would run these apps using a Terminal console.

        {% highlight xml %}
        <keybind key="W-t">
      <action name="Execute">
        <startupnotify>
          <enabled>true</enabled>
          <name>Terminator</name>
        </startupnotify>
        <command>terminator</command>
      </action>
    </keybind>
    <keybind key="W-b">
      <action name="Execute">
        <startupnotify>
          <enabled>true</enabled>
          <name>Browser</name>
        </startupnotify>
        <command>firefox google.com</command>
      </action>
    </keybind>
    <keybind key="W-g">
      <action name="Execute">
        <startupnotify>
          <enabled>true</enabled>
          <name>Geany</name>
        </startupnotify>
        <command>geany</command>
      </action>
    </keybind>
    <keybind key="W-s">
      <action name="Execute">
        <startupnotify>
          <enabled>true</enabled>
          <name>SublimeText</name>
        </startupnotify>
        <command>/Sublime/sublime_text</command>
      </action>
    </keybind>
    <keybind key="W-e">
      <action name="Execute">
        <startupnotify>
          <enabled>true</enabled>
          <name>leafpad</name>
        </startupnotify>
        <command>leafpad</command>
      </action>
    </keybind>
    <keybind key="W-f">
      <action name="Execute">
        <startupnotify>
          <enabled>true</enabled>
          <name>thunar</name>
        </startupnotify>
        <command>thunar</command>
      </action>
    </keybind>

    {% endhighlight %}


Next important file is .conkyrc. It is a hidden file. It defines everything related to that amazing looking tree-graph drawn over your desktop background by conky. Here you can modify its color or even add custom text to it. To modify color, find these lines in .conkyrc file.

    default_color 90EE90
    default_shade_color 000000
    color0 90EE90
    color1 90EE90
    color2 90EE90

The color values shown above will output something like shown in the image below.

![manjaro](/assets/imags/tuts/manjaro/manjaro1.png)

You can use Geany, it comes with Color Chooser. Use that to change color. Next is another interesting part where you can change font size and style and even the text displayed over the tree-graph.

  {% highlight xml %}
  TEXT
  ${goto 180}${color0}${font Droid Sans:style=bold:size=11}${voffset 40}Bhavyanshu
  ${voffset -30}${font Droid Sans:style=Bold:size=12}${color}${goto 40}${uptime}
  ${goto 80}${color1}${font Droid Sans:style=Bold:size=12}${color1}${sysname}${color}${font}
  ${voffset 90}${goto 20}${font Droid Sans:style=bold:size=30}${time %H:%M}${font}${goto 175}${font Droid Sans:style=Bold:size=11}CPU
  ${goto 175}${font Droid Sans:style=Bold:size=11}${color1}${cpu cpu1}%
  ${voffset 40}${goto 35}/home${color1}${goto 128}SWAP
  ${goto 38}${font Droid Sans:style=Bold:size=10}${fs_used /home}${goto 134}${font Droid Sans:style=Bold:size=11}${swapperc}${font Droid Sans:style=Bold:size=11}${color1}${font}%
  ${font Droid Sans:style=Bold:size=11}${font}
  ${voffset 10}${goto 90}${font Droid Sans:style=Bold:size=11}RAM
  ${goto 90}${font Droid Sans:style=Bold:size=11}${memperc}%
  ${image /usr/share/conkypic/lsd.png -p 10,0}
  {% endhighlight %}

Look how I have customized it to show my Real Name instead of uname in first line. So Simple.

For modifying other desktop features like Panels, docks, windows etc, just right click on desktop, go to settings and select "Customize Look and Feel". There are lot of options that you can explore. You can modify each and every element of your desktop very easily. If I go on explaining each and every feature of it, it would take me whole day. My overall experience with OpenBox has been pleasurable till now. Even this artcile I am writing is written using Leafypad (Default Text Editor).
I think it is a great operating system for people with old PCs and compilers can easily be installed using pacman if you want to do any kind of development on it. It doesn't take up much hard drive space anyway and has all the common utilities which we usually need. A must try for all those who love using Linux and want to bring back some life in old Desktops.


{% include JB/setup %}
