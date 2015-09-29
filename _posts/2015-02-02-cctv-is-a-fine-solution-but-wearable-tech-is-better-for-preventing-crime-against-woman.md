---
layout: post
title: "CCTV is a fine solution but wearable tech is better for preventing crime against women"
description: "Delhi elections are getting closer and it has become a political agenda whether CCTV is appropriate technology or not. I will cite some problems with CCTV tech and provide a solution"
tags: ["Raspberry Pi"]
change_frequency: "weekly"
priority: 0.8
date: 2015-02-02 10:20:03
---

With delhi elections getting closer, every party has issued a manifesto stating they will install so many CCTV cameras to improve security. Well, CCTV cameras is a fine idea but it is only good for identifying convict **after** the crime has taken place. I say this because surely for so many cameras you need lot of security personnel continuously monitoring which I think requires lot of manual effort and is prone to human errors. Also, the CCTV cameras are not really that useful in **preventing** crimes. Our focus should be prevention of crimes. Which we all are clearly failing at. I am claiming all this based on studies which you can also read :

* [Public Video Surveillance:Is It An Effective Crime Prevention Tool](http://www.library.ca.gov/crb/97/05/crb97-005.html) - By Marcus Nieto 
* AUSTRALIAN INSTITUTE OF CRIMINOLOGY - [CAN SURVEILLANCE CAMERAS BE SUCCESSFUL IN PREVENTING CRIME AND CONTROLLING ANTI-SOCIAL BEHAVIOURS](http://www.aic.gov.au/media_library/conferences/regional/isnard1.pdf) - By Adrienne Isnard

Moving further, I think we need solutions that actually **prevent** crimes against women. I don't need a political debate here. This is just a solution that I propose. The wearable technology is advancing and actually tech is getting pretty less expensive as compared to past few years. It's high time we look up to newer upgraded solutions rather than using old technologies. Also, I do not usually support wearable technology. I only support it when tech is used for the right cause. I don't support the so called "smart watches" on which companies are investing. They are completely useless and I don't really think sane people will replace them with good old reliable electro-mech watches. Anyway, my point being that why not invest in wearable technology that lets women send **distress alerts** to the nearest PCR? How? Let's first see what we already have and then we will see how we can improvise over these. All the suggestions you post will go in **Idea Stack** section of this page.

## What is already out there?

[Updated - 03-02-2015] 
* After bit of research, I came across [GPS SmartSole](https://www.portable-gps-devices.com/smartsole/) which actually does pretty much what we want and has support for mobile device tracking as well. It costs **$299.00** but I think we can create something less expensive & cost effective.

## Alternative to CCTV - Wearable tech & open source

Being a CS engineer & also having experience with electronics, i can suggest and develop prototypes based on limited resources I have. I will be generally using the term "wearable tech" and won't be specifying what that wearable device actually will be. For fun, assume it to be a wrist band? I have ideas. I will explain one of those below. Be patient & read on.                         
                       
        

### Idea stack
 
**Replicating the concept of SmartSole** : We can learn something from smartSole. It requires a dedicated SIM card just like most wearable tech to sync data. I guess that is a basic need for communication. The live tracking works and can be tracked using iOS or Android app. That's a +1. Though I am not sure who has access to what information in this case. This is not cost effective because it would require the person to get a data pack & the design & everything may already be patented.

**Requires Research** : The RDS technology requires government approval to set a dedicated channel to allow transmission of RDS data on a particular frequency. Also, this can be restricted to a particular range. Everything is in our control. By the term **distress alert**, I mean a specially crafted & encrypted chunk of data that can only be decrypted by a program that runs on tiny processing unit (Possibly Raspberry Pi) residing in every PCR. Encryption & Decryption are required because we don't want any unauthorized person to access that information. Ofcourse the RPi can be connected to the video display unit for live tracking & mapping of GPS location contained in that chunk of data. That chunk will also contain an ID for quickly identifying the information of the person who has issued the distress alert. Whenever the user buys this wearable tech, the ID will be registered with the centralized base server (linux based). So if the person thinks anything is fishy, the person can simply **turn on** that wearable device that lets it transmit important information to all the PCRs (actually it will be sent to all nearby RPis via communication components connected to GPIOs listening on a dedicated radio frequency 24x7). Yes, the device needs to be turned on to transmit. We don't want violation of user privacy. Once the RPi receives the signal, the live mapping of GPS location to the Google Maps can begin and police can locate exactly where the *potential victim* is being taken to. This is just one idea. I have many other ideas as to how we can improve communication delay between the *potential victim* and the police. I avoid using technical jargon because I am trying to explain it to a non-tech person. I have been working on a Raspberry Pi based project which is on this concept. I am currently working on the code that runs on linux. I am planning to make the code open source to promote transparency and also so that more and more people can improve the software. It's too early to estimate the cost of it but since the backend software is open source, the cost will just be of the underlying hardware and nothing else. This is what I have planned. If you would like to invest some resources in it, <a href="https://bhavyanshu.me#contact">get in touch</a> with me. I am currently looking for electronic and communication engineers to collaborate with. I am planning to release the code within 2 months since I have to look over various licensing issues with it as well. You know how badly broken the patent system is. Will need to go through various patents just to be sure I am not violating any. Another reason why patents are bad and a waste of time. **I do not hold any copyright to the idea even**. If anyone can still make this work out, you are free to do so. What's more important is that it should be built quickly and should be a cost effective solution.

As far as the politics is concerned, instead of investing so much money in CCTV cameras, they should invest more in new technology. We must think of preventing crimes. Not about how we can find the convict once the sexual assault has already taken place. 


That's all for now. I will keep posting updates as I progress. Check back later sometime. Any suggestions? Post a comment. 

{% include JB/setup %}
