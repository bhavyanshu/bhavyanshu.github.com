---
layout: post
title: "Understanding linux kernel part 2"
description: "In this tutorial section we will understand how to compile and configure your linux kernel."
category:
tags: ["linux-kernel"]
change_frequency: "weekly"
priority: 0.8
---

#Wait a minute, you don't know where to get the kernel source from?
>No problem. Let's take a minute and look at how to get the source. The linux kernel is being maintained using the source code control tool called "git". You can spend some time and look for git tutorials. If you are familiar with it, then it is great. It will be a lot easier for you. It is very important for you to understand git. Or else there is no point because you cannot contribute without it.

Once you understand git, open your terminal and move on with following steps:

	mkdir ~/linux //Creates a directory named linux
	cd ~/linux //moves into the newly created directory.
	git clone git://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux-2.6.git //Clones the 2.6 kernel to your local hard drive. Hurray! You have got the source now. :)
	cd ~/linux/linux-2.6 //Now move into the source directory.

#Got the raw source code? Don't know what to do with it?
>Okay, now that you have the source code for the linux kernel you need to build it and install it on your system. It is not really an easy process though. But if you develop a habbit, then it will get a lot easier for you.

## Things to keep in mind before building the kernel:
1. Do not build the kernel as root user (Superuser Permissions). Only 2-3 steps in the build process require you to be a root user.
2. The source code should never be placed in the /usr/src/linux dir, as that is the location of the kernel that the system libs were built against.
3. Tools to be used:
	- GCC C Compiler
	- binutils
	- make
	- util-linux

This should make up the most of it. For more info, you can read "Linux in a nutshell" book chapter 1.  

Let us move on to building the kernel now:

	cd ./linux-2.6 //Move inside the source directory
	make menuconfig //Now this is important. Here you will have to set the configuration of the kernel build according to your hardware,

Now i will explain all the configuration options in the next tutorial (well, as many as i can) because they are important and if important things are left out or taken forgranted, the kernel is likely to fail.

{% include JB/setup %}
