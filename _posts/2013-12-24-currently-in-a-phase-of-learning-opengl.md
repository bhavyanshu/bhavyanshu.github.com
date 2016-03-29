---
layout: post
title: "Currently in a phase of learning OpenGL"
description: "Learn with me. I just started learning OpenGL. I will be writing quick notes so that other people can learn. I will try to cover all the topics of it."
category: tutorials
tags: ["openGL, c++"]
change_frequency: "weekly"
priority: 0.8
date: 2013-12-24 12:45:43
---

# Overview 

It couldn't be defined with a better definition than the one written below which was taken from OpenGL SuperBible Book by Richard S. Wright, Nicholas S Haemel, Graham Sellers, Lipchak Benjamin. One of the best books i found on openGL. Find it on [flipkart]((http://www.flipkart.com/opengl-superbible-comprehensive-tutorial-reference-5th/p/itmczzfh7mbrhsm2?pid=9780321712615&cmpid=content_book_8965229628_gmc_pla&tgi=sem,1,G,9226359,g,search,,19319548220,1o1,,,c,,,,,,,&gclid=CN7NkJmfybsCFcZV4godm2UAWQ)).

>OpenGL is an interface that your application can use to access and control the graphics subsystem of the device upon which it runs. This could be anything from a high-end graphics workstation to a commodity desktop computer, a video game console, or even a mobile phone. Standardizing the interface to a subsystem increases portability and allows developers to concentrate on the overall performance of their applications, rather than worrying about the specifics of the platforms they want them to run on. These standard interfaces are called Application Programming Interfaces (or APIs), of which OpenGL is one.

# Graphics Pipeline - How is it related to openGL?

*The concept of parallelism :* The production lines work on the basic principle of parallelism that suggests that a task is finished more quickly and efficiently by dividing a task into subtasks and executing them concurrently. When a car is built, each engineer has a specific part to work on and then the assembling of parts occur in the end. In this way multiple cars are produced efficiently and quickly.

This concept applies in computer graphics as well. The command is taken by openGL and it interacts with the underlying hardware. The commands which are in queue are often known as *in flight* commands.

OpenGL acts as an abstraction layer between the application/game and the underlying GPU (Graphics Processor Unit) so that the application doesn't need to know what is the underlying GPU and all the information related to GPU.

## Why not just use a pre-built game engine?

Now you might be thinking what is the purpose of learning all this when we have so much advanced game engines and we can build games on top of it. Well the answer is always learn it the hard way. The pre-built game engines are too high level abstraction layer which hide many advanced features. It is often difficult to add more modules to a game engine and requires the study of source code of the game engine. It's like you are increasing an overhead. Well, game engines are good if you don't want to use advanced features and are satisfied with what a game engine has to offer to you. But when you have to use such features, it is always best to code from scratch and unlock these features yourself.

## What is a GPU?
GPUs are graphics processor units which perform all the graphics related work in a system. Well, nowadays most of the GPUs can perform other work like simulation, AI and even audio processing.

*Shaders* : GPU has a large number of small programmable processors which are called shader cores which are capable of running small programs called shaders. The graphics subsystem is often broken down into stages which are either shaders or functions which are configurable.

Data flow within this model is generally one way, with data formed from commands called by your programs entering the front of the pipeline and flowing from stage to stage until it reaches the end of the pipeline. Along the way, shaders or other fixed-function blocks within the pipeline may pick up more data from buffers or textures , which are structures designed to store information that will be used during rendering. Some stages in the pipeline may even save data into these buffers or textures, allowing the application to read or save the data, or even for feedback to occur.

The fundamental unit of rendering in openGL is called **primitive**. OpenGL supports many types of primitives, but the three basic renderable primitive types are points, lines, and triangles. For complex structures, the structure in question is broken down into triangles which are sent to openGL where they are rendered by a hardware accelerator called **rasterizer**. The rasterizer is dedicated hardware that converts the three-dimensional representation of a triangle into a series of pixels that need to be drawn onto the screen.

The graphics pipeline has two major parts. The first part, often known as the front end, processes vertices and primitives, eventually forming them into the points, lines, and triangles that will be handed off to the rasterizer. This is known as **primitive assembly** . After the rasterizer, the geometry has been converted from what is essentially a vector representation into a large number of independent pixels. These are handed off to the back end, which includes depth and stencil testing, fragment shading, blending, and updating the output image. These I will explain later as we progress.

In the next part, i will be focussing on creating buffers and textures and writing code to tell openGL to work for you. Keep a check on [TOC](/tutorials.html).

{% include JB/setup %}
