---
layout: post
title: "How to deploy BoltCTF to Heroku"
description: "Here is a quick tutorial on how to deploy Bolt CTF (laravel app) on Heroku"
category: Tutorials
tags: ["Heroku", "Laravel"]
change_frequency: "weekly"
priority: 0.8
date: 2017-08-30 03:23:34
---

# Overview

Bolt CTF is a CTF hosting platform built using Laravel and VueJS. This tutorial assumes that you have the following tools setup:

- php
- git
- npm
- heroku
- composer

# Steps to deploy

* First fetch the latest source using git:

  ```bash
  git clone https://github.com/bhavyanshu/BoltCTF.git
  ```

* We need to setup `Procfile` in the project root. Add following contents to the file:

  ```
  echo "web: vendor/bin/heroku-php-apache2 public" > Procfile
  ```

* Next, we need to create a new app on heroku. This will generate the URL for the app.

  ```bash
  heroku create
  heroku buildpacks:set heroku/php
  ```

* Then, we need to setup postgresql for database.

  ```bash
  heroku addons:add heroku-postgresql:hobby-dev
  ```

* Now we need to get the USERNAME:PASSWORD@HOSTNAME:PORT/DATABASE to plug into the .env file that we will create next.

  ```bash
  heroku config | grep DATABASE_URL
  ```

* Next, we need to create .env file that contains database information.

  ```
  APP_ENV=production
  APP_DEBUG=false

  APP_KEY=

  # Step: 2- Change database connection settings below
  #default pgsql for heroku, you can also use mysql
  DB_CONNECTION=pgsql
  DB_HOST=CHANGE_DB_HOST
  DB_PORT=CHANGE_DB_PORT
  DB_DATABASE=CHANGE_DB_NAME
  DB_USERNAME=CHANGE_DB_USER
  DB_PASSWORD=CHANGE_DB_PASSWORD

  CACHE_DRIVER=file
  SESSION_DRIVER=file
  QUEUE_DRIVER=sync

  # (optional) - Set REDIS settings below
  REDIS_HOST=localhost
  REDIS_PASSWORD=null
  REDIS_PORT=6379

  # Setup SMTP mail server settings below
  MAIL_DRIVER=smtp
  MAIL_HOST=mailtrap.io
  MAIL_PORT=2525
  MAIL_USERNAME=null
  MAIL_PASSWORD=null
  MAIL_ENCRYPTION=null
  MAIL_FROM_ADDRESS=no-reply@some.herokuapp.com
  MAIL_FROM_NAME=no-reply
  ```

* Next we build the assets locally and then we push to heroku.

  **NOTE:** We need to force commit .env and public/(assets) because they are in .gitignore.

  ```bash
  composer install --optimize-autoloader
  npm install
  php artisan passport:keys
  php artisan key:generate
  npm run prod

  git add .
  git add -f .env public/* storage/*
  git commit -m "First commit"
  git push heroku master
  ```

* Once done, your instance of BoltCTF will be up and running on Heroku. Now, you need to run the database migration on heroku.

  **NOTE:** The login credentials for super user are in `database/seeds/SudoUserTableSeeder.php`. Modify them there or you can change them once you login into app.

  ```bash
  heroku run php artisan migrate:refresh --seed
  heroku run chmod -R 775 storage/
  ```

If you face any problems, feel free to post on [github issues](https://github.com/bhavyanshu/boltctf/issues).

{% include JB/setup %}
