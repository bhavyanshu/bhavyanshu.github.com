---
layout: post
title: "Programming in GCC"
description: "Let's do some programming using GCC C compiler."
category:
tags: ["c", "gcc", "linux"]
image: cprog.png
change_frequency: "weekly"
priority: 0.7
---

# Overview

Well the kernel itself doesn't provide features like command prompt, file editors, file managers or anything. The kernel basically helps *programs* to communicate with other programs to achieve goals.
So to build these programs we need to write them in a language and compile them with a supported compiler that provides the required libraries. So we will be using GCC C compiler to compile programs.

You should be aware of programming in Linux environment. How to use commandline etc. I am not gonna show you how to do that.

## Tools Required
1. GCC C compiler
2. Editor like nano (You can use any like emacs, vim, gedit or any other. I prefer nano commandline editor as i am not a GUI fan).

## Compiling with GCC

>GCC is GNU Compiler Collection, which also includes compilers for C++, Java, Objective C, Fortran apart from C.

Now let us compile our first program.

	{% highlight c %}
	/*main.c*/
	#include <stdio.h>
	int main()
	{
	int x;
	printf("Hello, welcome to my gcc tutorial section.Let us learn how to compile our first C program in gcc.\n");
	printf("Let us multiply two numbers\n");
	x=2*2;
	printf("The result is %d \n", x);
	return 0;
	}
	{% endhighlight %}

Compiling single source file : <code>gcc -c main.c //The -c option tells gcc to compile program to an object file only</code>    
The resulting object file will be main.o.

Other option that you want to use is that <code>-I</code> option. It is used to tell GCC where to search for header files. Like if you want to include header files from somewhere else, you will need the -I option.    

# Making an executable:

<code>
gcc main.c main //This will create an executable with name "main".   


./main //To run the program
</code>

You should see the output as below.

<img src="http://bhavyanshu.me/assets/imags/result.png" title="Result" />

## Defining MACROS
<code>
g++ -c -D DEBUG=3 someheader.cpp
/*In this -D option is used for macro and DEBUG is the macro with value 3. It is useful when you don't wish to change the source file but want to use a MACRO in production code.*/
</code>


## Some more options:

gcc -E :preprocessor           	
gcc -S :create or show assembly coding	      
gcc -o :object filename	         
gcc -g :debug info                                                            	
gcc -O :optimized code                                                                        	
gcc -O2 :optimized code with optimization level increased                                                                             	          
gcc -Wall :create or show all warning                                                             	           
gcc -D_SYMBOL_ : Symbol for prepcessor                                          	           


To know about more options, simply type in terminal :
<code>info gcc</code>


{% include JB/setup %}
