---
layout: post
title: "Let's hack games - Concept behind PC game trainers and cheats"
description: "Understanding how a game trainer or cheat works in the game. Also looking at how main memory is represented and what it consists of."
category:
tags: ["gaming"]
image: tuts/mem/mem2.png
change_frequency: "weekly"
priority: 0.8
date: 2014-08-07 14:44:34
---

# Overview

Okay, today's post is very interesting. Well some of you might come and say that it's cheating and all but this is just for educational purpose. Infact it is more of a programming challenge cause here you will be dealing with low level programming. This will also show you how the trainers and cheat engines work. How they allow you to set unlimited health, money etc in your game.

Supposedly you don't find a trainer/cheat for a game, what will you do to get unlimited health, unlimited money etc? The prerequisite for this tutorial is nothing because I am gonna explain everything from scratch. So first thing first, let us understand memory.

## Understanding memory

I still remember my operating system class. My teacher used to repeatedly say that a program must be loaded to main memory(RAM)first. Why? Because main memory is faster than secondary memory. Why? To look at it in a better way, we must first answer this question.

> What is hard disk made up of? How is it physically different from main
> memory (RAM or ROM), registers and cache memory? The hard disk has
> various mechanical components like a motor, platter, actuator etc.
> Whereas RAM, ROM, registers, cache mem etc are all made up of
> semiconductor components. So electrical devices are
> faster than the components that involve mechanical components for
> obvious reasons.

Hence, if a program is to be executed it must be loaded into main memory first for the processor to execute it. Processor cannot directly execute a program from secondary memory.
Before we go any further, let us see what is bit and byte.
1 byte = 8 bits so 2 bytes will be 16 bits long.
Lets look at how the program is loaded into main memory.

## Loading program into main memory
The above explained bit byte relationship is just a way of representing data. We know computer understands only 0 and 1. The combination of 01 can be represented into various formats. For example let us consider a decimal number, say 71. It can be represented in binary as 01000111 and in hexadecimal as 47. It's alright if you don't know how this works out. It's maths. [Read more](http://www.mathsisfun.com/binary-decimal-hexadecimal.html) on it. So 47 can be represented in single byte, i.e, 8 bits. What if there is a larger number? Well, we would just need more bits in the field. This is what is happening in modern computers memory. The memory is huge. When we deal with memory, we usually deal with very large numbers represented in hexadecimal form. But remember, your computer will only understand a combination sequence of 0 & 1. Hexadecimal representation is for our convenience only. You can easily convert hexa representation to binary or even to decimal.

So the main memory addresses are represented by these hexadecimal values  representing the data values of the program being executed. Now each data value is referenced by an address. For example, you are referenced by the place (Name of place) where you stay. Similarly, data value is referenced by an address as well. Now how to know what is the address of the data related to our program? Well, this is the main focus of this post. See, when a program is loaded into memory, the programmer has no clue where it will be loaded and on what memory address it will be loaded. But we know that there is a starting address and ending address of each program chunk. If we know the starting address and ending address, we can just scan through all the values and look for the values that match what we are looking for. Let us take an example of game. Supposedly you currently have 300 coins in game. This value of 300 will be somewhere in the main memory represented by some address. We don't know what address it is yet. We are going to start scanning from the very first address where the program is loaded and loop till the last address until we come across a value of 300. Once we have found that 300 is present at some location, say for example FFF70 (this is an assumption), we can use this address to alter the value of 300 to a very large value. Now in the game the value will immediately change to the new value we have set. That's it. That's what we need. Right?

Look at the image shown below. I just started a game called **Uplink** on linux 32 bit machine. I then loaded a tool (Game Conqueror) to scan memory. The tool shows all the memory addresses. It is similar to Cheat Engine in windows.

![memscan to look into memory][1]


Now let us first understand the memory representation in this particular image.

![Memory Representation][2]

The first gray shaded region is the starting address (a2fd370). If you move from left to right, you can see 16 hexadecimal address values. So it goes like (a2fd370 - a2fd371 - ........ - a2fd37a - ..... - a2fd37f). See only the last digit/literal is changing because address is incrementing by one. So the trainers just fetch the value from the game (Example coins, health etc) and loop through the addresses to find the value. Once they find the value, they lock the value to maximum and hence you get infinite health (Invulnerability cheat) in the game. In the next tutorial, we will write a C program that does exactly the same thing. We will look at a very basic code to fix a value at a particular address that represents the credits/money/coins in a game.

[1]: /assets/imags/tuts/mem/mem1.png
[2]: /assets/imags/tuts/mem/mem2.png

{% include JB/setup %}
