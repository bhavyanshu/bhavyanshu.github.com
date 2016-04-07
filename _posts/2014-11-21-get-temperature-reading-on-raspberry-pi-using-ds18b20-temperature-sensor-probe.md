---
layout: post
title: "Log temperature reading using DS18B20 temperature sensor probe and Raspberry Pi"
description: "Little bit of C and Bash magic to log temperature from your raspberry pi using DS18B20 temperature sensor probe."
category: Tutorials
tags: ["Raspberry Pi","DS18B20","c", "bash"]
change_frequency: "weekly"
image: raspi/raspi.jpg
priority: 0.8
date: 2014-11-21 13:30:45
---

# Overview

In this tutorial, we will use the DS18B20 temperature sensor probe to get temperature reading on our raspberry pi. Not just that, we will also log the temperature in valid JSON format using my code.

## Hardware

1. Raspberry Pi
2. DS18B20
3. 10k ohm/4.7k ohm resistor
4. Breadboard and Jumper wires


## Circuit

First of all, as you can see the temperature sensor probe has 3 pins. The wire connecting to VCC pin is often in RED, for GND it is BLACK and for DATA it is YELLOW or WHITE. These can vary too. you should always look at the manual provided by the manufacturer. It has all these specifications. We will use pin number 7 for DATA, pin number 1 (+3.3 V) for VCC and pin number 6 for GND. Don't forget to put a 10k ohm resistor (Some suggest 4.7k ohm) between DATA and VCC.

Refer to the figure shown below

![Temperature Sensor Connections](/assets/imags/raspi/tempi.png "Temperature Sensor Connections")


## Testing

Make sure all the connections are perfect. Now turn on your Raspberry Pi, let it boot and once you are in terminal, type

	$ sudo modprobe w1-gpio
	$ sudo modprobe w1-therm
	$ cd /sys/bus/devices/
	$ ls

`modprobe` adds or removes a module from the Linux kernel temporarily. If your connections are okay, you will see a directory called 28-xxxxxxx. Now,

	$ cd 28-xxxxxx
	$ cat w1_slave

This should output something like shown below

	a1 05 4b xx xx xx xx xx 1c : crc=1c YES
	a1 05 4b xx xx xx xx xx 1c t=23185

Now if you see something like this in the output and if you feel that the value of *t* is correct, then congrats your connections are perfect and we can move on. But if you find that the temperature reading is incorrect (Like really high or weird), then you must check your connections again and check the **resistor** if it is connected well and is placed between DATA and VCC. It is a very common mistake. Now that everything is working as we want, we must try to automate above step using the method provided below.

## Automation

Let us create a log of temperature in JSON format. Even though this can be easily achieved using purely Python, i still went ahead and wrote it in C. The only thing I am using python for is to convert generated log by C to a valid JSON format. Soon I will replace that also with C. I just need some time to work on the code. Also please keep all the files in the same directory. You can get all the files from [github repository](https://github.com/bhavyanshu/rPiExperiments/tree/master/TemperaturePi).

* temp_log.sh - Bash script to generate a log file containing output returned from temp.c.
* temp.c - Gets the temperature and timestamp. Generates a log file which contains data to be converted by log2json.py into a valid JSON format.
* log2json.py - Converts log file data to a valid JSON output and dumps it to log.json file.


**temp.c** file: This is the C program that returns temperature and timestamp. **NOTE that you don't need to compile this**. Let the temp.sh bash script handle all the work. You just have to copy paste this or use this [raw file](https://raw.githubusercontent.com/bhavyanshu/rPiExperiments/master/TemperaturePi/temp.c).


	{% highlight c %}
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <inttypes.h>
#include <errno.h>
#include <math.h>
#include <time.h>

double readTemp(const char*);

int main(int argc, char *argv[])
{
	const char *devicepath;
	double t;
	if(argc==1)
	{
		printf("You cannot directly run this. Please run temp_log.sh or temp.sh\n");
		exit(0);
	}
	else
	{
		devicepath = argv[1]; //Get device file path from argument passed by bash script
	}
	t = readTemp(devicepath);
	printf("{ 'Temperature' : %.3lf , 'Timestamp' : %d }\n",t,(int)time(NULL));
	return 0;
}

double readTemp(const char *path)
{
	FILE *device = fopen(path, "r");
	double temperature = -1;
	char crcVar[5];
	if (device == NULL)
	{
		printf("Check connections %s\n", path);
		perror("\n");
	}
	if (device != NULL)
	{
		if (!ferror(device))
		{
			fscanf(device, "%*x %*x %*x %*x %*x %*x %*x %*x %*x : crc=%*x %s", crcVar);
			if (strncmp(crcVar, "YES", 3) == 0)
			{
				fscanf(device, "%*x %*x %*x %*x %*x %*x %*x %*x %*x t=%lf", &temperature);
				//printf("%.3lf\n",temperature);
				temperature /= 1000.0;
			}
		}
	}
	fclose(device);
	return temperature;
}
	{% endhighlight %}

**log2json.py** file: This is the python file that basically does no computation on its own but just converts the unstructured log file into a valid JSON format. The content is dumped into a file called log.json. Copy paste below code or use this [raw file](https://raw.githubusercontent.com/bhavyanshu/rPiExperiments/master/TemperaturePi/log2json.py).

	{% highlight python %}
#!/usr/bin/python

import json
from ast import literal_eval
with open('log') as f:
    txt = [literal_eval(line) for line in f]
    data = {'LocationName': txt}		#Change LocationName to your locality name
    #print(data)

with open('log.json', 'w') as outfile:
        json.dump(data, outfile)
	{% endhighlight %}


**temp.sh** file: Copy paste below code or just get this [raw file](https://raw.githubusercontent.com/bhavyanshu/rPiExperiments/master/TemperaturePi/temp_log.sh).      
First use `chmod +x temp.sh` and then run the script using `./temp.sh`. This is the bash script that helps us automate most of the tasks. Look at the first two lines. They are the modprobe statements. Next it automatically locates *w1_slave* file and passes the file as an argument to temp.c program. Now we use gcc to compile the program. Next it directly dumps output from temp object file to the log file. In if-else statement, it checks if previous command has executed successfully or not. If yes, then it just invokes log2json.py and the final output is appended/written to log.json file. You can check if the JSON output is correct or not using [jsonlint](http://jsonlint.com/).

	{% highlight bash %}
#!/bin/bash
sudo modprobe w1-gpio
sudo modprobe w1-therm

base_dir="/sys/bus/w1/devices/28-*/"
temp_dev="w1_slave"
dev=$base_dir$temp_dev

gcc -O3 -fPIC -g -Wall -Werror temp.c -o temp

echo `./temp $dev` >> log;

if [ $? -eq 0 ]; then
    echo `python log2json.py`;
else
    echo FAIL
fi
	{% endhighlight %}

Now to automate you just tie this bash script to the cron job and run it few times a day. You can additionally add FTP details in the bash script to automatically upload latest log.json file to your server. On your server, you can write a code that generates a graph from this JSON data. Another way to plot graph would be to use matplotlib to plot graph on raspberry pi itself and auto-upload it to server using bash script. I am doing the same thing. [Look what you can make out of this](/building-homemade-weather-station-project/11/22/2014).


If you don't want to generate all these log files, you can simply use [this bash script](https://raw.githubusercontent.com/bhavyanshu/rPiExperiments/master/TemperaturePi/temp.sh) that prints output to terminal instead of generating a log file. Leave a comment if you get stuck anywhere. I will try to help you out.


{% include JB/setup %}
