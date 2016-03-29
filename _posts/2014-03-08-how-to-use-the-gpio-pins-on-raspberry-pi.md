---
layout: post
title: "How to use the GPIO pins on Raspberry Pi"
description: "Introduction to General Purpose Input Output offered by Raspberry Pi and how to program on Raspberry Pi to use GPIO."
category: Tutorials
tags: ["Raspberry Pi"]
change_frequency: "weekly"
image: raspi/raspi.jpg
priority: 0.8
date: 2014-03-07 13:30:00
---

# Overview

In previous tutorials, we have seen that how Raspberry Pi offers us USB ports, Composite video port, HDMI port etc. Now in this tutorial we will see how we can use the on-board GPIO Pins. We will be programming in Python. But before moving on, let's get familiar with what exactly GPIO is.

**What is GPIO?**

>General-purpose input/output (GPIO) is a generic pin on an integrated circuit (commonly called a chip) whose behavior (including whether it is an input or output pin) can be controlled (programmed) by the user at run time. The GPIO pins are available on the PCB via a header and allow you to interface the Pi to the real world. The header provides 17 Pins that can be configured as inputs and outputs. By default they are all configured as inputs except GPIO 14 & 15. In order to use these pins you must tell the system whether they are inputs or outputs. We will now see how can we do that.

<img style="margin:10px;" src="/assets/imags/raspi/pi_gpio.jpg" title="GPIO" alt="GPIO" />

For this tutorial, you will be needing some more electrical hardware. You can easily find this stuff in your local store.

## Requirements

1. Jumper Wires
2. LEDs, preferrably both RED X 2
3. 50 Ohm Resistors X 4
4. A breadboard to avoid errors during connections
5. Must have an idea about basic electrical connections.

# Let's Begin

The connection has been shown in the image below

<img style="margin:10px;" src="/assets/imags/raspi/GPIO.png" title="GPIO" alt="GPIO" />
<img style="margin:10px;" src="/assets/imags/raspi/led.png" title="LED Project" alt="LED" />

Mine looks like this. I did not have jumper wires of different colors. So don't be confused. Refer to above diagrams only.

<img style="margin:10px;" src="/assets/imags/raspi/rpi_connec.jpg" title="Connections" alt="Connections" />

By GPIO Pin Number, I mean the actual Pin number and not the GPIO Number. So be careful with that. Once you are sure you have made the connections as shown above, we are going to write a program in Python to get LED blink.

I am assuming you are not familiar with Python. So I will explain each and every step on how to get this simple program runnig.

1. Login to your Raspbian OS. On terminal, type `mkdir led`. This is optional of-course.
2. Next, `cd ./led` and type `nano led.py`. Nano is the terminal based editor that I often use. You can use any editor.
3. Now in that led.py file, add the following code

        {% highlight python %}
import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BOARD)
GPIO.setup(7,GPIO.OUT)
def Blink(numTimes,speed):
	for i in range(0,numTimes):
		print "Blanking "+str(i+1)
		GPIO.output(7,True)
		time.sleep(speed)
		GPIO.output(7,False)
		time.sleep(speed)
	print "Enough of this blinking!"
	GPIO.cleanup()
iterations = 10
speed = 2
Blink(iterations,speed)
        {% endhighlight %}


4. Next thing you need to do is save and exit the file using *ctrl+x* and then hit *y*. **NOTE: This is a python code. Do not mess up indentation of it.**
5. Before running the program, make sure the connections are correctly set up.
6. Now run the program using `sudo python led.py`. You should see your LED blinking.

That's all. Now there is something you should experiment around. Like for example this program. The circuit diagram for the below program is shown after the program. Do try this out.

    {% highlight python %}
#Program to blink two LEDs one at a time.
import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BOARD)
GPIO.setup(7,GPIO.OUT)
GPIO.setup(22,GPIO.OUT)
def Blink(numTimes,speed):
	for i in range(0,numTimes):
		print "Blanking "+str(i+1)
		GPIO.output(7,True)
		GPIO.output(22,False)
		time.sleep(speed)
		GPIO.output(7,False)
		GPIO.output(22,True)
		time.sleep(speed)
	print "Enough of this blinking!"
	GPIO.cleanup()
iterations = 10
speed = 2
Blink(iterations,speed)
    {% endhighlight %}

<img style="margin:10px;" src="/assets/imags/raspi/led2.png" title="LED Project 2" alt="LED Project 2" />

<a href="/pages/toc-raspberrypi.html">View more tutorials on Raspberry Pi</a>


{% include JB/setup %}
