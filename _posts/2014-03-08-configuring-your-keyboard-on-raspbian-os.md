---
layout: post
title: "Configuring USB keyboard on Raspbian OS"
description: "If you have installed Raspbian OS and are using a mini keyboard, there is often an issue of keys displaying different characters instead of the ones on keyboard. This tutorial tells how to fix it."
category: Tutorials
tags: ["Raspberry Pi"]
change_frequency: "weekly"
image: raspi/raspi.jpg
priority: 0.8
date: 2014-03-04 14:30:54
---

# Overview

You will have to use a USB mini-keyboard with Raspberry Pi. It is a must-have peripheral device. As i told in first tutorial of Raspberry Pi tutorial series, I am using an Intex keyboard. Actually there was some issue with keys like `#` and `"`. They were interchanged initially. Then I realized since it is a UK make, the default keyboard configuration for Raspbian OS is set to **Default (UK)**. That is why you would see a euro symbol when you press $ key.

## How to fix it?

Fixing it is really simple. Run command `sudo dpkg-reconfigure keyboard-configuration`. Now follow the images shown below to reconfigure keyboard.			

<img style="margin:10px;" src="/assets/imags/raspi/keyboard_conf1.png" title="Config 1" alt="Config 1" />
<img style="margin:10px;" src="/assets/imags/raspi/keyboard_conf2.png" title="Config 2" alt="Config 1" />
<img style="margin:10px;" src="/assets/imags/raspi/keyboard_conf3.png" title="Config 3" alt="Config 1" />
<img style="margin:10px;" src="/assets/imags/raspi/keyboard_conf4.png" title="Config 4" alt="Config 1" />
<img style="margin:10px;" src="/assets/imags/raspi/keyboard_conf5.png" title="Config 5" alt="Config 1" />
<img style="margin:10px;" src="/assets/imags/raspi/keyboard_conf6.png" title="Config 6" alt="Config 1" />

Once you are done selecting the type of configuration you need with your keyboard, simply type in terminal `sudo service keyboard-setup restart`. That's all. You should now have a properly configured keyboard. Test by typing special symbols and see if they match the characters on the keyboard.				

<a href="/pages/toc-raspberrypi.html">View more tutorials on Raspberry Pi</a>


{% include JB/setup %}
