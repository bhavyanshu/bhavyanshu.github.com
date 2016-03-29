---
layout: post
title: "Posting to jekyll blog via android device"
description: "This is a complete tutorial on how to post to a jekyll based blog hosted on github using android."
category:
tags: ["tutorial", "jekyll for android", "nitrous ssh"]
change_frequency: "weekly"
priority: 0.8
---

# Overview

Well since i have got my blog set up on github.com with the help of jekyll, i wanted to post to this block even when i am travelling. So i needed to figure out a way to push commits to github using android device. I figured out that i need an ssh server running ruby on rails and with git to do this.

Those who wanna know how i achieved this can read on. :)

# Tutorial

### Stuff that you need:
1) [Github](https://github.com) account with [jekyll](http://jekyllbootstrap.com/) blog set up.  
2) [Nitrous.io](https://www.nitrous.io) account linked with your github account.   
3) Connectbot (Or any SSH client for android).   

### How to!
1) Go to nitrous.io website and login with your github account.   
2) Click on the boxes tab and create a box & choose "ruby on rails".  
3) Get ConnectBot (Or any other app providing ssh with public keys manager) for android.   
4) Go to boxes on nitrous.io and select newly created box. Click on "Generate public key" and once the public key is generated, click on "Add to github". It will automatically add your public key associated with your box to github.com.   

<img src="{{ site.url }}/assets/imags/jekyllandroid1.png" title="Publik key and add to github" />

5) Now copy "SSH URI" mentioned on the same page of your box.
6) Now open connectbot in your android device and create a public key. Add the "SSH URI" in the conntection preferences of your connectbot. It should be something like "name@host:post" and go to its settings and configure it as shown in the image below.  

<img src="{{ site.url }}/assets/imags/jekyllandroid2.png" title="SSH URI" />

7) Finally go back to nitrous.io and select "Public Keys" tab and add your android connectbot generated public key.    
8) Now simply connect and you are good to go with ssh. Clone your blog repo and perform "gem install jekyll". Once done, now you can use "rake post title="new post"" to post new updates on your blog.   

I know it is difficult to set up but currently i guess this is the only way. Once you have set up, you can easily post to your github hosted blog easily using ssh on your android device. Yipee! now i can post easily even when i am travelling. :)  

Special thanks to jekyll, github and nitrous. :)

{% include JB/setup %}
