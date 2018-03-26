---
layout: post
title: "phpfpm-nginx on docker hub (php7, MS SQL extensions, nginx, debian)"
description: "Stack ideal for app requiring nginx, php7 with MS SQL extensions."
tags: ["docker"]
change_frequency: "weekly"
priority: 0.8
date: 2018-03-26 13:55:29
---

A stack ideal for zend framework app running on nginx with php7.1-fpm. It has all the required extensions and MS SQL drivers for PHP.

- [View on Docker Hub](https://hub.docker.com/r/bhavyanshu/phpfpm-nginx/)

## Docker

- It will mount the code to the /var/www/app of docker container.
- You can provide default.conf file. The contents for a  ZF app would be:

```console
server {
    listen       *:80;

    index index.html index.htm index.php;

    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log;

    root /var/www/app/public;

    location / {
        try_files $uri $uri/ /index.php$is_args$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php7.1-fpm.sock;
        include        fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root/$fastcgi_script_name;
    }
}
```

- Now execute the following command in the parent of your app

```console
docker run --name amazing_app -d -p 8080:80 \
-v $(pwd):/var/www/app \
-v $(pwd)/default.conf:/etc/nginx/conf.d/default.conf \
bhavyanshu/phpfpm-nginx
```

- Finally you can access your app at http://localhost:8080.

## Docker-compose

```
amazing-app:
  image: bhavyanshu/phpfpm-nginx
  ports:
   - "8080:80"
  volumes:
   - .:/var/www/app
   - ./default.conf:/etc/nginx/conf.d/default.conf
```



{% include JB/setup %}
