---
layout: post
title: "Providing full resolution while connecting to external monitor/projector"
description: "Providing support for full resolution when linux connected via 15pin cable"
category:
tags: ["xrandr"]
change_frequency: "monthly"
priority: 0.7
---

# Overview

Bash script to provide resolution support for external monitors/projectors when laptop is connected via 15-pin cable.

## Code


	{% highlight bash %}
	#!/bin/bash
	echo "
	#title :xrandrVGA.sh
	#author :Bhavyanshu Parasher (bhavyanshu.spl@gmail.com)
	#description :Bash script to provide resolution support for external monitors (VGA 15 Pin Cable). Requires xorg.
	#date :20130710
	#version :0.1
	#usage :bash xrandrVGA.sh or (sh xrandrVGA.sh)
	#notes :Refer to the README for more info or visit github project page (https://github.com/bhavyanshu/xVGAlinux).
	#==============================================================================#"

	#Funtion for showing colors for output [ AUTHOR: Ryan Schulze (rs), ryan@dopefish.de ]
		text() { #{ { {
	  	local color=${1}
	  	shift
		 local text="${@}"
		  case ${color} in
		    red    ) tput setaf 1 ; tput bold ;; #Denotes error
		    green  ) tput setaf 2 ; tput bold ;; #Denotes everything okay
		    yellow ) tput setaf 3 ; tput bold ;; #Denotes "You gotta wait!"
		    blue   ) tput setaf 4 ; tput bold ;; #Not is use
		    grey   ) tput setaf 5 ;;		 #Not is use
		  esac
		  echo  "${text}"
		  tput sgr0
		} # } } } 		
	#Main program
	echo "Checking if Xorg exists..."
	sleep .5
	if which Xorg >/dev/null; then
	echo "Xorg found. Continuing.."
	sleep .5
	echo "Looking for xrandr.."
	sleep .5
	if which xrandr >/dev/null; then
		echo "xrandr found. Continuing.."
		echo `xrandr -q | egrep 'VGA.* disconnected'`
		VARIABLE=$(xrandr -q | egrep 'VGA.* connected');
			#if [[ `xrandr -q | egrep 'VGA.* connected'`="" ]]
			if [ "${VARIABLE:-0}" == 0 ]
			then
				echo "";text red "VGA is disconnected. Please check the cable connecting to your external monitor. "
			else
				echo "";text green "VGA is found & is connected!"
				sleep .5
				echo `gtf 1024 768 60`  # We can also use cvt instead. Same output is derived from cvt.
							# 60 is the refresh rate. Must find a way to detect best resolution for external monitor.
				echo "Processing, please wait! Setting resolution for external to 1024x768."
				echo `xrandr --newmode "1024x768_60.00"  64.11  1024 1080 1184 1344  768 769 772 795  -HSync +Vsync`
				sleep .5
				echo "xrandr addmode for 1024x768."
				echo `xrandr --addmode VGA1 1024x768_60.00`
				sleep .5
				echo "";text yellow "xrandr processing output, please wait!"
				echo `xrandr --output VGA1 --mode 1024x768_60.00`
				sleep .8
				echo "";text green "Resolution 1024x768 set on external monitor."
				fi
		else
		echo "";text red "xrandr not found. Please make sure you have xrandr."
	fi
	else
    	echo "";text red "Xorg does not exist. This program only supports Xorg."
	fi
	{% endhighlight %}

If anyone is interesting in contributing to it then please [fork it on github](https://github.com/bhavyanshu/xVGAlinux).

{% include JB/setup %}
