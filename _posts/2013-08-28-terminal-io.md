---
layout: post
title: "Terminal I/O"
description: "Importance of knowing all about terminal I/O."
category: 
tags: ["tutorial", "gcc", "I/O Terminal Interfaces"]
change_frequency: "monthly"
priority: 0.5
---

#Overview  

Well, i am writing this because sometimes there is a need to change the speed of the terminal dsession to match that of the device it is connected to.  
Okay, well, does it sound a bit too technical?  

Let me sum it up quickly.

>Terminal devices can run into different states i.e, canonical mode/cooked mode or noncanonical mode/raw mode. In the former state, the terminal driver returns one line of data at a time and in the later, the terminal device returns one char at a time without assembling lines of data.  
>The third state is the the <code>cbreak</code> mode, it is similar to raw mode but in this a signal is raised for the special characters.  
>Ever used vi? Well, it uses raw mode for i/o.

##Moving on

There is a struct named *termios* that has all the attributes controlling the terminal device.   

	{% highlight c %}
	struct termios {
		tcflag_t c_iflag; /*input*/
		tcflag_t c_oflag; /*output*/
		tcflag_t c_cflag; /*control flag*/
		tcflag_t c_lflag; /*local flag*/
		cc_t c_cc[NCCS]; /*control chars*/
	};
	{% endhighlight %}

The above mentioned structure is used with two functions mainly,

	{% highlight c %}
	#include <termios.h>
	int tcgetattr(int filedes, struct termios *termptr); //Gets the current state of the terminal with open file descriptor filedes.
	int tcsetattr(int filedes, int opt, const struct termios *termptr); //Set the attributes for the terminal.
	/*Return error if the *filedes* argument is not associated with the terminal device. 
	The argument opt specifies when the changes are to take place.
	*/
	{% endhighlight %}

So those who are interested in developing a terminal based editor, they might be interested in reading more on [terminal I/O](http://www.lafn.org/~dave/linux/terminalIO.html).

{% include JB/setup %}
