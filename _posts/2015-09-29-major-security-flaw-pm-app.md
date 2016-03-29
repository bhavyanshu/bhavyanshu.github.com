---
layout: post
title: "Developer team fixed vulnerabilities in Honorable PM's app & API"
description: "I reported the vulnerability and related exploit to the developer team. Discussed solutions and they have finally fixed the issues."
tags: ["security"]
change_frequency: "weekly"
priority: 0.8
date: 2015-09-29 14:30:42
---

Jump to - <a href="#detailed-vulnerability-disclosure">Detailed Vulnerability Disclosure</a> - <a href="#disclosure-to-officials">Disclosure to officials</a> - <a href="#discussion-with-developer">Discussion with developer</a>

# What were the issues?

The main issue was how the app was communicating with the API served by narendramodi.in.

1. I was able to extract private data, like email addresses, of each registered user just by iterating over user IDs.  
2. There was no authentication check for API endpoints. Like, I was able to comment as any *xyz* user  just by  hand-crafting the requests.
3. The API was still being served over HTTP instead of HTTPS.

## Fixed

1. The most important issue of all. Unauthorized access to personal info, like email addresses, is fixed. I have tested it and can confirm it.
2. A check to verify if a valid user is making the request to API endpoint is fixed. I have tested it and can confirm it.
3. Blocked HTTP. Every response is served over HTTPS. The people on older versions (which was serving over HTTP) will get a message regarding this. I have tested it. It says something like "Please update to the latest version of the Narendra Modi App to use this feature and access the latest news and exciting new features". It's good that they have figuered out a way to deal with people running older versions of the app. Atleast now they will update the app.

# Detailed Vulnerability Disclosure

Found major security loophole in how the app accesses the  "api.narendramodi.in/api/" API. At the time of disclosure, API was being served over "HTTP" as well as "HTTPS". People who were still using the older version of the app were accessing endpoints over HTTP. This was an issue because data (passwords, email addresses) was being transmitted as plain text. In simple terms, your login credentials could easily be intercepted. MITM attack could easily fetch passwords and email addresses. Also, if your ISP keeps log of data, which it probably does, then they might already have your email address, passwords etc in plain text. So if you were using this app, **I would suggest you to change your password immediately**. Can't leave out a possibility of it being compromised.

Another major problem was that the token needed to access API was giving a false sense of security to developers. The access token could easily be fetched & anyone could send hand-crafted HTTP requests to the server. It would result in a valid JSON response without authenticating the user making the request. This included accessing user-data (primarily email address, fb profile pictures of those registered via fb) for any user and posting comments as any registered user of the app. There was no authentication check on the API endpoint. Let me explain you with a demo.

The API endpoint to fetch user profile information (email address) was *getprofile*. Before the vulnerability was fixed, the endpoint was accessible via "http://www.narendramodi.in/api/getprofile?userid=useridvalue&token=sometokenvalue". As you can see, it only required two parameters. *userid*, which we could easily iterate on starting from 1 & *token* which was a fixed value. There was no authentication check on API access layer. Hand-crafting such requests resulted in a valid JSON response which exposed critical data like email addresses of each and every user. I quickly wrote a very simply script to fetch some data to demonstrate. Here is the sample output for xrange(1,10).

<img src="/assets/imags/security/exploit.png" alt="Exploits" />

<br>Not just email addresses, using this method you could spam on any article pretending to be any user of the app. There was no authentication check as to who was making what requests to the API. See,

<br><img src="/assets/imags/security/vuln_req2.png" alt="Exploits" /><br>

They have fixed all these vulnerabilities. I still believe it wouldn't have taken so long if I would have been able to get in touch with team of engineers directly right from the beginning. In future, I hope they figure out an easier way to communicate. Such issues must be addressed as soon as they are found but the communication gap cost us lot of time. The team did a great job by fixing the issues and that's what matters.

<hr>

## Disclosure to officials

The email address provided on Google play store returned a response stating "The email account that you tried to reach is over quota". Had to get in touch with authorities via twitter.

**Vulnerability disclosed to authorities on 30th sep, 2015 around 5:30 AM**

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/buzzindelhi">@buzzindelhi</a> Just sent two mails. All the instructions are in the mail. You may forward the PDF version to developer team.</p>&mdash; Bhavyanshu Parasher (@pytacular) <a href="https://twitter.com/pytacular/status/649010243796504576">September 29, 2015</a></blockquote>

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">The security loophole in PM&#39;s app has been reported. I have done my part. It&#39;s upto dev team on how seriously they take it.</p>&mdash; Bhavyanshu Parasher (@pytacular) <a href="https://twitter.com/pytacular/status/649028325671727104">September 30, 2015</a></blockquote>

<br> After about 30 hours of reporting the vulnerabillity

<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/pytacular">@pytacular</a> <a href="https://twitter.com/pranesh_prakash">@pranesh_prakash</a> Thanks for pointing the issue. Team is working on it. Partial fix has been rolled out and full fix expected soon</p>&mdash; Arvind Gupta (@buzzindelhi) <a href="https://twitter.com/buzzindelhi/status/649403115267993602">October 1, 2015</a></blockquote>

## Proposed Solution

<br>Consulted [@pranesh_prakash](https://twitter.com/pranesh_prakash) as well regarding the issue.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/buzzindelhi">@buzzindelhi</a>  Should I forward the proposed solution to you that will eliminate the vulnerability?  <a href="https://twitter.com/pranesh_prakash">@pranesh_prakash</a></p>&mdash; Bhavyanshu Parasher (@pytacular) <a href="https://twitter.com/pytacular/status/649460681880678400">October 1, 2015</a></blockquote>

<br>After this, I mailed them a solution regarding the issues.

<hr>

# Discussion with developer

Received **phone call** from a developer. Discussed possible solutions to fix it.

**The solution that I proposed could not be implemented** since the vulnerability is caused by a design flaw that should have been thought about right from the beginning when they started developing the app. It just proved how difficult it is to fix such issues for mobile apps. For web apps, it's lot easier. Why? Because for mobile apps, you need to consider *backward compatibility*. If they applied my proposed solution, it would crash app for people running the older versions. Main problem is that **people don't upgrade to latest versions leaving themselves vulnerable to security flaws**. The one I proposed is a better way of doing it I think but it will break for people using older versions as stated by the developer. Though, they (developers) have come up with solutions that I think would fix most of the issues and can be considered an alternative.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Thanks <a href="https://twitter.com/pranesh_prakash">@pranesh_prakash</a> &amp; <a href="https://twitter.com/Vidyut">@Vidyut</a> for helping me with this. Also <a href="https://twitter.com/prasanto">@prasanto</a> for helping me get in touch with the developer team.</p>&mdash; Bhavyanshu Parasher (@pytacular) <a href="https://twitter.com/pytacular/status/649597197156089856">October 1, 2015</a></blockquote>

<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p lang="en" dir="ltr">Just checked, the developer team has fixed two out of three vulnerabilities that I reported. Waiting for the last one to get fixed <a href="https://twitter.com/Vidyut">@Vidyut</a></p>&mdash; Bhavyanshu Parasher (@pytacular) <a href="https://twitter.com/pytacular/status/649999984343953408">October 2, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<br> On Oct 3rd, I received mail from one of the developers who informed me they have fixed it. I could not check it out at that time as I was busy but I checked it around 5 PM. **I can now confirm they have fixed all three issues**.

<hr>

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
{% include JB/setup %}
