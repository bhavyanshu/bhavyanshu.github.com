---
layout: page
title: Bhavyanshu Parasher
description : "Backend application developer, android application developer, python and php application developer."
tags: ["bhavyanshu parasher", "bhavyanshu", "android application developer","backend application developer"]
tagline: <a href="https://keybase.io/bhavyanshu">PGP key</a>
change_frequency: "weekly"
priority: 1.0
---
{% include JB/setup %}

<div class="row">
 <div class="col-md-12 bio">
  <div class="pull-left">
   <img itemprop="image" class="bio-img" style="display: block; width: 150px; margin-right: 8px; margin-bottom:5px;" src="https://avatars0.githubusercontent.com/u/3829459" alt="bhavyanshu parasher" />
  </div>
  <div class="bio-text">
    <p>
      I am a computer science grad with experience as full stack developer and interest in cyber security. I am currently working at <a href="http://uis.edu" target="_blank">UIS</a> as a Student Web Associate. Currently working on projects built using PHP, Python, jQuery, React, React native and Vuejs. Do check out my <a href="https://bhavyanshu.me/projects.html">projects</a> section.
      I use this blog to share my work or just talk about "things". Feel free to look around.
    </p>
    <p>Currently staying in
     <span itemprop="address" itemscope
       itemtype="http://data-vocabulary.org/Address">
       <span itemprop="locality">Illinois</span>,
       <span itemprop="region">USA</span>
     </span>
    </p>
  </div>
 </div>
</div>

<div class="row">
  <div class="col-md-7 social">
    <h2>
    Social
    <a href="https://twitter.com/pytacular" class="twitter-follow-button" data-show-count="true" data-size="medium" data-lang="en">Follow @pytacular</a>
    </h2>
    <p class="social-icons">
      <a href="https://github.com/{{ site.author.github }}" target="_blank"><span class="fa fa-2x fa-github"></span></a>
      <a href="https://www.linkedin.com/in/bhavyanshu/" target="_blank"><span class="fa fa-2x fa-linkedin"></span></a>
      <a href="https://twitter.com/pytacular" target="_blank"><span class="fa fa-2x fa-twitter"></span></a>
      <a href="https://plus.google.com/112306240164215805986" rel="author" target="_blank"><span class="fa fa-2x fa-google-plus"></span></a>
      <a href="http://bhavyanshu.me/subscribe.html" target="_blank"><span class="fa fa-2x fa-rss"></span></a>
    </p>
    <p>You won't find me on Facebook.
    You can visit <a href="/tags.html">tags section</a> to easily find topics of interest.</p>
  </div>
  <div class="col-md-5" id="contact">
    <h2>Contact</h2>
    <p>
    Got some work? Send email to <a href="mailto:mail@bhavyanshu.me">mail@bhavyanshu.me</a>  or if just wanna say hi, then write to <a href="bvyn@ya.ru">bvyn@ya.ru</a>
    </p>
    <p>
    0xCD1967F4FDF1A9AB - Verify at <a target="_blank" href="https://keybase.io/bhavyanshu">keybase.io</a> | <a href="https://pgp.mit.edu/pks/lookup?op=vindex&fingerprint=on&search=0xCD1967F4FDF1A9AB" target="_blank">pgp.mit.edu</a>
    </p>
    <p><a href="https://bhavyanshu.keybase.pub/files/resume-aug-2017.pdf" target="_blank">Resume</a></p>
  </div>
</div>

<hr/>
<div class="row-fluid">
  <div class="col-md-8 latest_posts">
    <h2>My latest Posts</h2>
    <ul class="posts">
      {% for post in site.posts limit:20 %}
        <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
      {% endfor %}
    </ul>
  </div>

  <div class="col-md-4">
    <h2>Latest Tweets</h2>
    <a class="twitter-timeline" height="500" href="https://twitter.com/pytacular" data-widget-id="388676082561318912">Tweets by @pytacular</a>
  </div>
</div>
