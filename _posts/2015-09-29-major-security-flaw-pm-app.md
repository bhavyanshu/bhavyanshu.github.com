---
layout: post
title: "Reported vulnerability in Honorable PM's Android App"
description: "I reported the vulnerability and related exploit to the developer team. Suggested solution and they are addressing the issues."
tags: ["security"]
change_frequency: "weekly"
priority: 0.8
date: 2015-09-29 14:30:42
---

> **Current status**: Developer team is working on fixing the issues. Keep a check on this page. It will be updated as soon as they fix it.


## Disclosure

> Vulnerability disclosed to authorities on 30th sep, 2015 around 5:30 AM

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/buzzindelhi">@buzzindelhi</a> Just sent two mails. All the instructions are in the mail. You may forward the PDF version to developer team.</p>&mdash; Bhavyanshu Parasher (@pytacular) <a href="https://twitter.com/pytacular/status/649010243796504576">September 29, 2015</a></blockquote>

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">The security loophole in PM&#39;s app has been reported. I have done my part. It&#39;s upto dev team on how seriously they take it.</p>&mdash; Bhavyanshu Parasher (@pytacular) <a href="https://twitter.com/pytacular/status/649028325671727104">September 30, 2015</a></blockquote>

> After about 11 hours of reporting the vulnerability

<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p lang="en" dir="ltr">API is still accessible which should be the first thing they should have restricted access to.11+ hours of reporting, data still vulnerable.</p>&mdash; Bhavyanshu Parasher (@pytacular) <a href="https://twitter.com/pytacular/status/649202858559049728">September 30, 2015</a></blockquote>

> After about 30 hours of reporting the vulnerabillity

<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/pytacular">@pytacular</a> <a href="https://twitter.com/pranesh_prakash">@pranesh_prakash</a> Thanks for pointing the issue. Team is working on it. Partial fix has been rolled out and full fix expected soon</p>&mdash; Arvind Gupta (@buzzindelhi) <a href="https://twitter.com/buzzindelhi/status/649403115267993602">October 1, 2015</a></blockquote>

## Proposed Solution

<br>Consulted [@pranesh_prakash](https://twitter.com/pranesh_prakash) as well regarding the solution.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/buzzindelhi">@buzzindelhi</a>  Should I forward the proposed solution to you that will eliminate the vulnerability?  <a href="https://twitter.com/pranesh_prakash">@pranesh_prakash</a></p>&mdash; Bhavyanshu Parasher (@pytacular) <a href="https://twitter.com/pytacular/status/649460681880678400">October 1, 2015</a></blockquote>

<br>After this, I mailed them a solution regarding the issues. 

## Discussion with developer

> After about 36 hours of reporting the vulnerability

Received **call** from a developer. Discussed possible solutions to fix it.

**Firstly, the solution that I proposed could not be implemented** since it is more of a design flaw that should have been thought about right from the beginning when they started developing the app. It just proved how difficult it is to fix such issues for mobile apps. For web apps, it's lot easier. Why? Because for mobile apps, you need to consider *backward compatibility*. 
If my proposed solution is applied, it would crash app for people running the older versions. Main problem is that people don't upgrade to latest versions leaving themselves vulnerable to security flaws. The one I proposed is a better implementation but it will break for people using older versions as stated by the developer. Though, they (developers) have come up with solutions that I think would fix most of the issues and can be considered an alternative to what I proposed.

> **Note**: I will disclose details regarding the vulnerability once I have verified the fix they have implemented. Keep a check on this page for further updates. 

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Thanks <a href="https://twitter.com/pranesh_prakash">@pranesh_prakash</a> &amp; <a href="https://twitter.com/Vidyut">@Vidyut</a> for helping me with this. Also <a href="https://twitter.com/prasanto">@prasanto</a> for helping me get in touch with the developer team.</p>&mdash; Bhavyanshu Parasher (@pytacular) <a href="https://twitter.com/pytacular/status/649597197156089856">October 1, 2015</a></blockquote>

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>




{% include JB/setup %}
