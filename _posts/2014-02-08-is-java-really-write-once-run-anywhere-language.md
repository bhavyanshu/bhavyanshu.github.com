---
layout: post
title: "Is Java really 'write once, run anywhere' language?"
description: "Lately, i have started wondering why Java is said to be all shiny and that applications will work across all platforms. Do we need a new definition for declaring a language as cross platform? Go on and read."
category:
tags: ["java"]
change_frequency: "weekly"
priority: 0.8
date: 2014-02-06 13:50:45
---

# Overview

Lately, I have been thinking a lot about what makes a language cross platform? Does *write once, run anywhere* really apply now with so much advancement in user interface components of different platforms? Most modern platforms demand separate attention. Long gone are days when the only way to run programs was to use a CLI and just go on writing commands. No one really wants to use a CLI anymore. I am talking about modern computers and computer users here. Most users don't even know what a command line actually is. However, that's totally a different topic of debate. Getting back to the point, i believe a language **should only be classified as cross platform** if single source code is able to run across all platforms, including mobile devices. I know, it's not possible. But isn't it a good challenge for developers?

## Why do we need it?

If it gets done, then developers won't have to worry more about testing platform specific bugs and would actually be able to focus on adding features to products. Less time on debugging on different platforms will obviously save a lot of actual development time for small scale IT firms.

Large IT firms, specially in India, can actually afford to employ many engineers for even a small lame task but small scale IT firms often lag behind because of less number of engineers and more time being wasted on debugging rather than focusing on features of the product.

## Write once, run anywhere!

The idea is very simple but still has not been achieved successfully. Why? Because UI code is the hardest to port and make it all run on different platforms. Let us first look at what we already have in hand :

 - **[LWUIT](https://lwuit.java.net/)**

> Writing appealing cross platform mobile applications is challenging. Due to implementation differences in fonts, layout, menus, etc. the same application may look and behave very differently on different devices. In addition much of the advanced UI functionality is not accessible in LCDUI and requires the developer to write very low level "paint" type code. The Lightweight UI Toolkit was developed to address these issues. The Lightweight UI Toolkit makes it very easy to create compelling UI's that will look and behave the same on all devices using a programming paradigm similar to Swing and an advanced GUI builder/theme creation tool. This Toolkit is able to run on CLDC1.1 MIDP2.0/CDC PBP/SE, Blackberry, Java SE & Android.

 - **WEB Technologies**

> It looks like as if these apps will be built on the Joint Innovation Lab's Widget Initiative and the Open Mobile Terminal Platform's BONDI technology, both of which are, means to develop cross platform mobile applications using HTML5 and javascript. They will also run on desktop browsers as well. But it comes with a huge drawback of performance issues and also if the native browser supports latest features of CSS and HTML. Again, it will be like we are spending lot of time on testing.

Google's Engineering VP, Andy Rubin, was quoted saying, "There is always a dream that you could write once and run anywhere and history has proven that dream has not been fully realized and I am skeptical that it ever will be."

I think engineers should really focus on this topic because IT firms will save a lot of productive time if there is one language that can be used to develop interfaces which will work across all platforms. Furthermore, We should focus on one UI frontend definition language that easily works with any other backend programming language.

{% include JB/setup %}
