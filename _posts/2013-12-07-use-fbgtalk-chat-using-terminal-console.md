---
layout: post
title: "Use facebook and gtalk chat using terminal console"
description: "In this little tutorial, I will tell you how to use facebook and gtalk chat in the terminal console"
category: tutorials 
tags: ["terminal"]
image: tuts/finch/finchtut1.png
change_frequency: "weekly"
priority: 0.8
date: 2013-12-07 14:07:54
---

#Overview

This tutorial is about using facebook and gmail chat the geekiest possible way. Well, for geeks, the terminal console is an awesome thing. For this you need `finch`, which is a terminal based chat client & `terminator`, which is a terminal console. You can use any terminal console. That won't make much of a difference. Now basically you will be using XMPP, which stands for Extensible Messaging and Presence Protocol, is a communications protocol for message-oriented middleware based on XML (Extensible Markup Language). It was originally called jabber.
Most important thing is that when you want to save bandwidth and just want to chat with you people, or the internet connection is too slow, you can use the terminal to just chat as it requires less bandwidth.

#Requirements
1. finch - To get finch, you can search your synaptic or run `apt-get install finch`
2. terminator or any terminal console

#Setup

1. Once you have got finch and a terminal console, open terminal console and run command `finch`. Let it start and you will have an interface like the one shown below.
![Finch 1][1]

2. Well, first of all let me tell you quickly some few **important shortcuts** that you will be using all along. 
    * First is for opening the main menu, just hit F10 on the window you are on. 
    * To switch windows, you can use window stack command which is Alt+w or you can use Alt+1-9 to switch among 9 windows. 
    * Then to open the main list of operations, you can use Alt+a.
![Finch 2][2]

3. From there select accounts and you will see a window like the one shown above. Use tab key or arrow keys to navigate. Use space key to select checkboxes and to click buttons just use enter. To close a window, use Alt+c. That's all for the commands. If you want to learn more shortcuts, [read here](https://developer.pidgin.im/wiki/Using%20Finch#Gettingaround).
4. Now let us first start by setting up the gmail chat. 

5. **For Gmail :** For this you need to enter the following options         
    *Protocol* : XMPP     
    *Username* : YourGmailUserName (without @gmail.com)   
    *Domain* : gmail.com (Or if you are using an organization service, then enter the domain of the organization as shown in the image below, where my organization name is codershangout.org)  
    *Password*: YourGmailPassword         
    *Connection security* : Use old-style SSL       
    *Connect Port* : 5223     
    *Connect Server* : talk.google.com    
    [Uncheck]  Allow plaintext auth over unencrypted streams    
![Finch 3][3]

6. Once done, press enter on the **Save** button. That's all. Then it will open the accounts list and you can enable by pressing the space bar. It will connect you to the gtalk. Then you can access buddylist by pressing Alt+a menu.
7. **For Facebook :** For accessing facebook chat the above mentioned steps are similar, just change the values of the settings to       
    *Protocol* : XMPP     
    *Username* : YourFbShortNameInTheURL (Example mine is ansh.parasher from https://facebook.com/ansh.parasher)         
    *Domain* : chat.facebook.com          
    *Password* : YourFBPassword           
    *Alias* : Your facebook real name         
    *Connection Security*: Use encryption if available        
    *Connect Port* : 5222         
    *Connect Server* : chat.facebook.com          
![Finch 4][4]

8. Hit **Save** button and that's all. 
9. Enjoy chatting the geekiest possible way. 
 

{% include JB/setup %}

[1]: /assets/imags/tuts/finch/finch0.png
[2]: /assets/imags/tuts/finch/finchtut1.png
[3]: /assets/imags/tuts/finch/finch2.png
[4]: /assets/imags/tuts/finch/finch4.png
