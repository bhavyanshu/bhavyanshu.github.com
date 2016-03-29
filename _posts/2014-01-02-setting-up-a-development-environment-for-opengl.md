---
layout: post
title: "Setting up a development environment for OpenGL"
description: "This is particularly for linux. If i get time, I will add the windows part later."
category: tutorials
tags: ["openGL, c++"]
change_frequency: "weekly"
priority: 0.8
date: 2014-01-02 09:45:43
---

## Installing important external libraries

Just use the following command in linux terminal to download and install all pre-requisites.

    sudo apt-get install build-essential mesa-common-dev freeglut3-dev

If the installation went smoothly, you would be able to see some header files in your /usr/include/GL directory location

## Compiling OpenGL Programs on Linux Machines 

Compiling an OpenGL/GLUT program requires you to use a number of libraries.

1. GLUT (library "glut" on Linux)
2. OpenGL (library "GL" on Linux)
3. GL Utilities (library "GLU" on Linux)
4. Windowing specific libraries needed by GLUT. For X-Windows, these include:
    1. X11
    2. Xmu
    3. Xi

Often you'll also need the math library (library "m" on Linux)

You need to include (more) libraries if you encounter error messages such as:

    : undefined reference to `SomeLibraryName'

Including libraries is easy with gcc or g++, just add`-l< lib-name >` to the command line.
So, a compilation including all these libraries would look like:

    gcc -o programcode programcode.c -lglut -lGL -lGLU -lX11 -lXmu -lXi -lm

Change "gcc" to "g++" if you're using C++.

The "-o" tells gcc to call the executable "programcode"
After compilation, you can run by typing "./programcode" or if "." is in your path just "programcode" will work.

On many machines, gcc doesn't know where to find the correct include files (those you added to your code using #include"...")

Adding `-I < include-path >` tells gcc where to find additional include files.

Often the linker doesn't know where to find some of the libraries if they're stored in unusual locations (like outside of /usr/lib)
Adding `-L < library-path >` tells the linker where to find additional library files.

{% include JB/setup %}
