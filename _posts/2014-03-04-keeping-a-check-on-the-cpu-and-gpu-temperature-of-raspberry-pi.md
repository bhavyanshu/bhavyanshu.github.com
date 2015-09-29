---
layout: post
title: "Keeping a check on the CPU and GPU temperature of Raspberry Pi"
description: ""
category: Tutorials
tags: ["Raspberry Pi"]
change_frequency: "weekly"
image: raspi/raspi.jpg
priority: 0.8
date: 2014-03-04 15:30:54
---

Temperatures sensors can be queried with utils in the raspberrypi-firmware-tools package. The RPi offers a sensor on the BCM2835 SoC (CPU/GPU).
This is a simple bash script which you can copy paste on raspberry pi. Create a new file with command `nano CPUstat.sh`. Copy the below code and paste it into that file.

	{% highlight bash %}
	#!/bin/bash
	cpu_temp=$(cat /sys/class/thermal/thermal_zone0/temp)
	cpu_temp1=$(($cpu_temp/1000))
	cpu_temp_up=$(($cpu_temp1/100))
	cpuTempM=$(($cpu_temp_up % $cpu_temp))
	cpuFreq=`cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq | sed 's/.\{$
	echo CPU temp"="$cpu_temp1"."$cpuTempM"'C"
	echo GPU $(/opt/vc/bin/vcgencmd measure_temp)
	echo CPU Clock Rate"="$cpuFreq
	{% endhighlight %}


Press `ctrl+x` and then press *y* to save and exit file. Run it using `sh CPUstat.sh`. It will tell your the temperature. It is important because if you are runnig your Raspberry Pi for too long, it is likely to heat up. I am sure you don't wanna brick your pi. So it will let you keep a check on temperature. If it's above 70C, then you might wanna add a heat sink to it. Mind it, the pi was built to sit inside a mobile device as well with no airflow. So it can bear high temperatures. But I would still recommend you to use a heat sink if the temperature is above 70C.

<a href="/pages/toc-raspberrypi.html">View more tutorials on Raspberry Pi</a>

{% include JB/setup %}
