---
layout: page
title: Bhavyanshu Parasher
description : "Backend application developer, android application developer, python and php application developer."
tags: ["bhavyanshu parasher", "bhavyanshu", "android application developer","backend application developer"]
tagline: <a class="small" href="https://bhavyanshu.keybase.pub/files/resume.pdf" target="_blank">Resume</a>
change_frequency: "weekly"
priority: 1.0
---
{% include JB/setup %}
<style>
.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } 
.embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
</style>
<div class="row">
 <div class="col-md-12 bio">
  <div class="col-md-3">
    <div class="embed-container">
    <iframe src="https://www.youtube.com/embed/7Fy1_9NHIzY" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
  <div class="col-md-9 bio-text">
    <p>
    I am a computer science grad with experience in full stack web development and interest in cybersecurity. I have been actively contributing to open source projects from past 4 years, mostly developing in Ruby, PHP, JavaScript and Python. Apart from programming, I enjoy taking part in hackathons, CTF events, etc to enhance my knowledge of best practices in cyber security.
    Do check out my <a href="#featured-projects">projects</a> section.
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
  </div>
</div>
<hr/>
<div class="row projects-home">
  <h2 id="featured-projects" class="text-center">Featured Projects</h2>
  <div class="col-md-12 text-center">
    <div class="col-sm-4 project">
      <img  src="assets/imags/lightmd/lightmd1.png" />
      <p><a href="https://github.com/bhavyanshu/LightMd_Editor" target="_blank">LightMd Markdown Editor - FOSS</a></p>
      <p>Built in C & C++ Qt Framework</p>
    </div>
    <div class="col-sm-4 project">
      <div class="image-block" style="background:url('assets/imags/boltctf/boltctf.png'); background-repeat:no-repeat; background-position:center top; background-size:contain;">
      </div>
      <p><a href="https://github.com/bhavyanshu/BoltCTF" target="_blank">BoltCTF - FOSS CTF hosting platform</a></p>
      <p>Built using Laravel & Vue.js Frameworks</p>
    </div>
    <div class="col-sm-4 project">
      <img  src="assets/imags/chatbase/chatbase-ex.png"/>
      <p><a href="https://github.com/bhavyanshu/Chatbase-elixir" target="_blank">Google's Chatbase Library- FOSS</a></p>
      <p>Built using Elixir</p>
    </div>
    <div class="col-sm-4 project">
      <div class="image-block" style="background:url('assets/imags/csc/csc-uis.jpg'); background-repeat:no-repeat; background-position:center top; background-size:contain;">
      </div>
      <p><a href="https://csc.uis.edu" target="_blank">Computer Science Dept. @ UIS</a></p>
      <p>Built using Ruby on Rails & Vue.js</p>
    </div>
    <div class="col-sm-4 project">
      <div class="image-block" style="background:url('assets/imags/csc/csclub-uis.png'); background-repeat:no-repeat; background-position:center top; background-size:contain;">
      </div>
      <p><a href="http://csclub.uis.edu" target="_blank">Computer Science Club @ UIS</a></p>
      <p>Built on Drupal using Bootstrap Framework</p>
    </div>
    <div class="col-sm-4 project">
      <a href="https://twitter.com/UISedu/status/925808247742914560" target="_blank">
      <div class="image-block" style="background:url('assets/imags/csc/alexa.png'); background-repeat:no-repeat; background-position:center top; background-size:contain;">
      </div>
      </a>
      <p><a href="https://www.uis.edu/webservices/projects/alexa-skill/" target="_blank">Alexa Skills : UIS</a></p>
      <p>Built using Alexa SDK in Node.js</p>
    </div>
  </div>
  <p class="text-center">
    <a class="btn btn-sm btn-primary margin-top" href="/projects.html">View More</a>
  </p>
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
