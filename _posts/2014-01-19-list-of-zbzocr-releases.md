---
layout: post
title: "[Software Release] Zbzocr - Open Source OCR tool to extract text from images"
description: "The list of releases for zBzOCR fetched directly from Github project page."
category:
tags: ["releases"]
change_frequency: "weekly"
priority: 0.8
date: 2014-01-19 14:00:30
---

**zBzOCR is a GUI tool written in python which helps extract text from images. It is based on the tesseract-ocr engine.**


**********************************************************************

# List of Releases


<script type="text/javascript">
    $(function() {
        $("#my-github-repo").loadReleases("bhavyanshu","zBzOCR");
    });
</script>

<div id="my-github-repo"></div>

**********************************************************************
**********************************************************************

# INSTALLATION & USAGE

## WINDOWS :

**Requirements**:		

1. Python 2
2. PIL 				
3. Setuptools 								

Already scared? Don't worry, simply follow the instructions given below.


1. Download & install (Any one of the below). Don't forget to add it to your path after installation. Example: Enter in Command prompt PATH=C:\Python27		
[Python 2.7.5 MSI file](http://www.python.org/ftp/python/2.7.5/python-2.7.5.msi)				
[Python 2.7.5 AMD64 MSI File](http://www.python.org/ftp/python/2.7.5/python-2.7.5.amd64.msi)					

2. You might need setuptools as well. So go on and download it from below link.
https://pypi.python.org/pypi/setuptools/1.1.6
Now open CLI and cd into setuptools extracted directory. Then run *python setup.py install*. It will install setuptools for you.

3. Once done, you have all that is required to install and run the program.
Now simply cd into the directory and run *python setup.py install*. It will install my python program in your system. Once done, type in CLI *python zbzocr/zbzocr.py*. There is a test folder with a PNG image file, try it out on that. It will give you the basic idea of how it works.

## LINUX :


1. apt-get install tesseract-ocr. You must have tesseract CLI in your system. It is in the package list for debian. Not sure about the rest. You can find the installation note here http://code.google.com/p/tesseract-ocr/source/browse/tags/release-3.02.02/INSTALL

2. If you are running linux, then you might already be having complete python package in your system. If you want to check if you have python, then run in terminal *which python*. If you don't have, then you need to install python 2.7.X in your linux machine.

3. Then you need to cd into the directory of my program and run *python setup.py install*. It will install my program in your linux machine. Now to use the program, simply issue *python zbzocr/zbzocr.py*. There is a test folder with a PNG image file, try it out on that. It will give you the basic idea of how it works.

******************************************************************************

# Author Information :

[Bhavyanshu Parasher](http://bhavyanshu.me)
Email: bhavyanshu@codershangout.org


******************************************************************************

# Current Version : 1.0.1


### Change log:

* Version 1.0.1 - 25th September 2013
GUI ported to Tkinter. The new GUI looks pretty awesome. Installation & Usage updated.

* Version 1.0.0 - 23rd September 2013, The first release.
Its GUI is based on easyGUI. A simple GUI. There is nothing much to it. The next version is expected to have more advanced GUI as i am porting it to Tkinter



{% include JB/setup %}
