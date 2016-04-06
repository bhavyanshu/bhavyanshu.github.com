---
layout: post
title: "Two new security flaws discovered but it's difficult to connect with the authorities"
description: "Govt should try harder to make gov apps secure. Two new vulnerabilities reported but I haven't received any response from the authorities till now."
tags: ["security"]
change_frequency: "weekly"
priority: 0.8
date: 2016-03-29 12:33:13
---

## What's going on?

I have reported new security flaws in two most popular gov websites. I tried to get in touch with concerned authorities via email on **Thursday, 24th March 2016** but I haven't heard from them till now. The security flaws have not been made public and will never be made public until I am sure they have fixed them. I am very much interested in getting them fixed but it looks like they are not. I am bothered about it even if they are not because it is putting user identifiable information at risk and anyone with malicious intent can harvest all that information. Your data can be sold to companies and there is nothing new in it. It's just more credible if that data comes from government sources (*seriously*). Their own policy claims to protect user identifiable information but the truth is that they are not trying hard enough to secure apps.

I have the disclosure reports ready and I have already told them via email that they should share their PGP key so that I can send them encrypted copies of the reports. I haven't heard from them till now. *I had to go public again and this is the part I hate the most*. If the concerned authorities are not interested, it becomes my responsibility to push them to take things seriously. So, [just like before](https://bhavyanshu.me/major-security-flaw-pm-app/09/29/2015#disclosure-to-officials), I had to get in touch with Mr. Arvind Gupta.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/pytacular">@pytacular</a> Contact <a href="https://twitter.com/amishra77">@amishra77</a></p>&mdash; Arvind Gupta (@buzzindelhi) <a href="https://twitter.com/buzzindelhi/status/714658965703958528">March 29, 2016</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Hi <a href="https://twitter.com/amishra77">@amishra77</a>, kindly DM me your contact email. Mr. Arvind told me to contact you. Thanks.</p>&mdash; Bhavyanshu Parasher (@pytacular) <a href="https://twitter.com/pytacular/status/714714955287805952">March 29, 2016</a></blockquote>

Awaiting a reply so I can be done with this. I even have suggestions ready for them to quickly mitigate these problems. They just need to follow instructions mentioned in the disclosure reports and they will be able to fix these security issues.

*****************

### Update - 2nd April, 2016

After waiting for them to respond since 24th March, I am updating this post with more information. The authorities are being completely irresponsible with this. I cannot disclose the flaw but it's important to wake them up. I would like to inform you all that user identifiable information like email addresses, physical addresses can be fetched easily from myGov for all users. It's a goldmine for spammers. If you use myGov and have your valid email address registered with them, it can be assumed that your email address, name, physical address has already been sold out by now. This may not be problem for you and it may not bother you but let me tell you that some people do care about their personal information being leaked out and also myGov is breaking its own policy.

> "MyGov do not sell or share any personally identifiable information volunteered on this site to any third party (public/private). **Any information provided on MyGov will be protected from loss, misuse, unauthorized access or disclosure, alteration, or destruction**. MyGov gather certain information about the User, such as Internet protocol (IP) address, domain name, browser type, operating system, the date and time of the visit and the pages visited. MyGov make no attempt to link these addresses with the identity of individuals visiting our site unless an attempt to damage MyGov has been detected."
(https://mygov.in/simple-page/terms-conditions/)

Also,

> "Please note that **MyGov do not share any personally identifiable information volunteered on this site with any third party (public/private)**. Any information provided to this website will be protected from loss, misuse, unauthorized access, disclosure, alteration, or destruction."
(https://mygov.in/mygov-faq/)

The problem with uidai.gov.in is complex. They are running an unpatched version of a server software which I can't disclose right now for obvious reasons but that particular server software has a CVE assigned to it that uidai.gov.in isn't even aware of. Also, they are using a protocol which has been considered obsolete. This vulnerability is bit complex to describe here and more challenging to exploit. Nonetheless, the risk is too high because uidai.gov.in is data critical and this particular vulnerability is already public with significant research published in order to perform this kind of attack. Well, even our CERT-In knows about this but has it issued any advisory to uidai? I doubt. I can confirm they know about it because I checked on [their website](http://www.cert-in.org.in/) and I can see that CVE listed there. I don't know what's the point of having CERT-In if all they gonna do is sit there and copy-paste CVE info from CERT-US.

*****************

### Update - 6th April, 2016

UIDAI has finally replied and acknowledged the issue. Thanks to [@nixxin](https://twitter.com/nixxin) & [@jackerhack](https://twitter.com/jackerhack) for helping me reach out to authorities.

Though I am still awaiting response from myGov.

[**I will update this page if there is any progress**]

I would like to request Government of India to adopt a framework to improve communication between researchers and authorities. I have the [framework](https://github.com/bhavyanshu/openvid-sys) ready to be deployed that can be dedicated for the purpose of better communication between researchers and concerned authorities for security related issues. I can help modify it according to the needs of the government. This will surely help in future if someone wants to disclose vulnerabilities as it will reduce all these problems of communication. Help me reach out to the government of India. Thanks!

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
{% include JB/setup %}
