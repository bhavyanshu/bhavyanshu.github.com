---
layout: post
title: "How we built one of the finest disaster alert systems in 48 hours"
description: "Here is how we built one of the finest disaster alert system at hack4good hackathon in 48 hours"
category: 
tags: ["hack4good"]
change_frequency: "weekly"
priority: 0.8
date: 2013-10-31 02:40:45 
---

I took part in a global hackathon, hack4good, held in September which was organized by geekli.st. In this we had to hack for social good. We were told to work on themes related to disasters, education, environment and many other social causes. We started at 8:30 PM. We quickly built the team of 4 in which i already knew 2 people. One of them was [Xander van Raemdonck](https://plus.google.com/107608957662818373378) (from Belgium) and the other one was [Abhinav Kharbanda](https://www.facebook.com/abhinav.kharbanda) (from New Delhi). Later on a guy pinged me on geekli.st wanting to participate. He is [Aditya Bhardwaj](http://purezen.github.io/) (from Noida). Hats off to these guys for contributing to this particular project. Well, i had to teach them few things about how to use git and stuff. They all belong to the programming background and that was important. We all settled with the name as "WarnMe". 							

We started off pretty late and slow, but we made the project on time. Our basic idea was to design a disaster alert system which provides upto-date information on man-made/natural disasters occuring around the world. For this we first needed the reliable resource which monitors such hazards continuously. We found one that provides such information in the xml format. That was all we needed from an external source. So now what was left was to program and system that fetches all the useful data from the xml and store it in DB so that we can manipulate the stored information according to our need and how we wanted to display that particular information. This was the whole idea behind storing the information in the database first. Then we thought about making an android application as well. Because we knew once we had stored the information in the database, we could extract it in the JSON format as it is an efficient way of handling data. We knew we could use the JSON data to display it in the listview of the android application. It was easy but due to lack of time and only one person working on the android app, we were a bit late to submit the android application. So we were just stuck with a web service for it. We created a responsive web application for it and deployed it on a server which belonged to Xander van Raemdonck. The problem was that there was no mode of communication better than Skype at that time. We all had skype with us. We used it to continuously stay in touch. We followed the very basic principle of rapid development that we should first develop a module and deploy it without thinking about the effect of it on the overall system when we will integrate. Luckily, we managed it so well via git that we did not really get into any trouble at all. We just developed modules, deployed them on server, integrated them to the system and when we saw that it does not need anymore changes then only we made a git push to the remote repository holding our code. That was all. 						

It has been added to one of my [achievement cards on geekli.st](https://geekli.st/bhavyanshu/we-built-warnme-at-hack4good-02-online). Go ahead and give us a highfive. We would really appreciate it and would be an encouragement for us so that we keep hacking for social good. :)					

Some snippets of what we created					

![Screenshot 1]({{ site.url }}/assets/imags/warnme1.png)								
<br>							
<br>
![Screenshot 2]({{ site.url }}/assets/imags/warnme2.png)
							

You can check out the code on the [repository](http://git.geekli.st/hack4good-team/warnme) if interested. 

{% include JB/setup %}
