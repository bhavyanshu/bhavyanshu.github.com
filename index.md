---
layout: page
title: Bhavyanshu Parasher
description : "Backend application developer, android application developer, python and php application developer."
tags: ["bhavyanshu parasher", "bhavyanshu", "android application developer","backend application developer"]
tagline:
change_frequency: "weekly"
priority: 1.0
---
{% include JB/setup %}
<div class="row">
 <div class="col-md-12 bio">
  <div class="col-sm-3">
    <div class="embed-container">
    <iframe src="https://www.youtube.com/embed/7Fy1_9NHIzY" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
  <div class="col-sm-9 bio-text">
    <p>I hold a Masters in Computer Science and have 2+ years of experience in developing applications for the web and mobile. I also enjoy participating in hackathons and CTF events that help me enhance my cyber security skills. Feel free to check out my <a href="#featured-projects">projects</a>.</p>
  </div>
 </div>
</div>

<div class="row meta">
  <div class="col-md-4" id="contact">
    <h2>Contact</h2>
    <p><a href="https://bhavyanshu.keybase.pub/files/resume.pdf" target="_blank">Resume</a></p>
    <p>Email me at <a href="mailto:mail@bhavyanshu.me">mail@bhavyanshu.me</a></p>
    <p>0xCD1967F4FDF1A9AB - Verify at <a target="_blank" href="https://keybase.io/bhavyanshu">keybase.io</a> | <a href="https://pgp.mit.edu/pks/lookup?op=vindex&fingerprint=on&search=0xCD1967F4FDF1A9AB" target="_blank">pgp.mit.edu</a></p>
  </div>
  <div class="col-md-4 certs">
    <h2>
      Certifications
    </h2>
    <div class="text-center">
      <a href="https://bhavyanshu.keybase.pub/files/AWS%20Certified%20Solutions%20Architect%20-%20Associate%20certificate.pdf" target="_blank">
        <img class="cert-img img-responsive" src="assets/imags/certs/Logo_SAA_1176x600_Color.png" alt="AWS logo" />
        <img class="cert-img img-responsive" src="assets/imags/certs/Tag_SAA_588x300-Black.png" alt="AWS tag" />
      </a>
    </div>
  </div>
  <div class="col-md-4 social">
    <h2>
    Social
    </h2>
    <p class="social-icons">
      <a href="https://github.com/{{ site.author.github }}" target="_blank"><span class="fa fa-2x fa-github"></span></a>
      <a href="https://www.linkedin.com/in/bhavyanshu/" target="_blank"><span class="fa fa-2x fa-linkedin"></span></a>
      <a href="https://twitter.com/pytacular" target="_blank"><span class="fa fa-2x fa-twitter"></span></a>
      <a href="https://plus.google.com/112306240164215805986" rel="author" target="_blank"><span class="fa fa-2x fa-google-plus"></span></a>
      <a href="http://bhavyanshu.me/subscribe.html" target="_blank"><span class="fa fa-2x fa-rss"></span></a>
    </p>
    <p>You can visit <a href="/tags.html">tags section</a> to easily find topics of interest.</p>
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
      <div class="image-block" style="background:url('assets/imags/boltctf/boltctf.png'); background-repeat:no-repeat; background-position:center top; background-size:cover;">
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
    <h2>My Blog</h2>
    <ul class="posts">
      {% for post in site.posts limit:20 %}
        <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
      {% endfor %}
    </ul>
  </div>

  <div class="col-md-4">
    <h2>My Tweets</h2>
    <a class="twitter-timeline" height="500" href="https://twitter.com/pytacular" data-widget-id="388676082561318912">Tweets by @pytacular</a>
  </div>
</div>
