---
layout: post
title: "Quickly setup laravel project to run on xampp for linux"
description: "This is a tutorial on how to setup your first laravel 4 project on xampp. I am running xampp on linux."
category: tutorials
image: tuts/laravel/laravel-intro.png
tags: ["laravel","PHP","xampp"]
change_frequency: "weekly"
priority: 0.8
date: 2015-01-12 14:30:04
---

**This tutorial is for laravel 4. For laravel 5, visit [this](/pages/toc-laravel5.html)**

## Overview

What is [laravel][1]?

> Laravel is a free, open source PHP web application framework, designed for the development of model–view–controller (MVC) web applications. Laravel is released under the MIT license, with its source code hosted on [GitHub](https://github.com/laravel/laravel).

What is [xampp][2]?

> XAMPP is a free and open source cross-platform web server solution stack package, consisting mainly of the Apache HTTP Server, MySQL database, and interpreters for scripts written in the PHP and Perl programming languages.

## Requirements

* xampp
* composer
* mcrypt

## Setup

* First, <a href="https://www.apachefriends.org/download.html" target="_blank">Download</a> xampp. Then, you need to setup **xampp** and change its security settings. Execute,

        chmod 755 xampp-linux-*-installer.run
        sudo ./xampp-linux-*-installer.run

  This will open the installer and just click "next" and it will install xampp files in /opt/lampp folder.
  You should first check if lampp is functioning properly. To test this,

        sudo /opt/lampp/lampp start

  Let it start everything for you. Now just go to http://localhost and see it is working. We will need to setup security settings as well.

        sudo /opt/lampp/lampp security

  Set all the passwords etc, and you are done!

* Now you need to get **composer**

        curl -sS https://getcomposer.org/installer | php
        sudo mv composer.phar /usr/local/bin/composer

  If you still get an error, please refer to [composer website][3].

* Now you need to get important dependencies of laravel - **mcrypt**.

        sudo apt-get install php5-mcrypt php5-json

  And now run,

        sudo php5enmod mcrypt

  To make sure it is running,

        php -i | grep mcrypt

  It will output

        .......
        mcrypt support => enabled
        mcrypt_filter support => enabled
        .......

* Let us create an app - `cd` into /opt/lampp/htdocs and `mkdir laravel-projects`. Then finally `cd laravel-projects`. Now execute below command to create a fresh project.

        sudo composer.phar create-project laravel/laravel --prefer-dist

  It's gonna take its time. Just wait for it to finish. Once it is done, execute

        sudo chmod -R 775 app/storage

* Now you can modify app/config/app.php to change locale, timezone, debug (to 'true' - for viewing errors) etc.

## Testing

To test, Just go to http://localhost/larvel-project/laravel/public/ , you will see a page with "You have arrived." as shown below.


Or you can simply run

        sudo php artisan serve

and visit http://localhost:8000 you will see a page with "You have arrived." as shown below.



![Intro page](/assets/imags/tuts/laravel/laravel-intro.png "http://localhost:8000")



That's it. Now you can start developing awesome apps.


[1]: http://laravel.com/docs/4.2/introduction "Laravel Introduction"
[2]: https://www.apachefriends.org/index.html "Apache Xampp"
[3]: https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx "Get Composer"


[View more tutorials on laravel](/pages/toc-laravel.html)

{% include JB/setup %}
