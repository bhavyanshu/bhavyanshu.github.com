---
layout: post
title: "Docker container configuration for Zend Framework, apache and MS SQL driver"
description: "Here is how to configure docker container to run ZF app on apache and DB driver setup for MS SQL server."
tags: ["docker"]
change_frequency: "weekly"
priority: 0.8
date: 2018-02-21 22:12:56
---

# Overview

Below are the docker files for running ZF app on Apache. I am sharing this because it installs MS SQL drivers as well which can get tricky to setup.

## PHP 7.1

```bash
FROM php:7.1-apache

# ------------ Basic setup ------------ #

RUN apt-get update \
 && apt-get install -y wget git zlib1g-dev libmcrypt-dev libldap2-dev libicu-dev g++ curl apt-transport-https debconf-utils unixodbc unixodbc-dev \
 && docker-php-ext-install zip \
 && docker-php-ext-install intl \
 && docker-php-ext-configure intl \
 && docker-php-ext-configure ldap --with-libdir=lib/x86_64-linux-gnu \
 && docker-php-ext-install ldap \
 && docker-php-ext-install pdo pdo_mysql mcrypt \
 && pecl install sqlsrv pdo_sqlsrv \
 && rm -rf /var/lib/apt/lists/* \
 && a2enmod rewrite \
 && sed -i 's!/var/www/html!/var/www/public!g' /etc/apache2/sites-available/000-default.conf \
 && mv /var/www/html /var/www/public \
 && curl -sS https://getcomposer.org/installer \
| php -- --install-dir=/usr/local/bin --filename=composer

# ------------ Install MS SQL client deps ------------ #

# adding custom MS repository
# this installs MS ODBC driver 17 which does not work with pdo sqlsrv yet
# we later downgrade to MS ODBC driver 13 but keep this as well
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/debian/8/prod.list > /etc/apt/sources.list.d/mssql-release.list

# install SQL Server drivers and tools
RUN apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql
RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
RUN /bin/bash -c "source ~/.bashrc"

# Debian 8 msodbcsql : https://packages.microsoft.com/debian/8/prod/pool/main/m/msodbcsql/
RUN wget https://packages.microsoft.com/debian/8/prod/pool/main/m/msodbcsql/msodbcsql_13.1.9.2-1_amd64.deb
RUN ACCEPT_EULA=Y dpkg -i msodbcsql_13.1.9.2-1_amd64.deb

RUN apt-get -y install locales
RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen
RUN locale-gen

RUN echo "extension=sqlsrv.so" >> /usr/local/etc/php/conf.d/docker-php-ext-sqlsrv.ini
RUN echo "extension=pdo_sqlsrv.so" >> /usr/local/etc/php/conf.d/docker-php-ext-pdo-sqlsrv.ini

WORKDIR /var/www
``` 

## PHP 5.6

```bash
FROM php:5.6-apache

RUN apt-get update && \
    apt-get install -y apt-utils freetds-dev libpng-dev zlib1g-dev libmcrypt-dev libldb-dev libldap2-dev && \
    rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-configure mssql --with-libdir=lib/x86_64-linux-gnu && \
    docker-php-ext-install mssql

RUN docker-php-ext-configure pdo_dblib --with-libdir=lib/x86_64-linux-gnu && \
    docker-php-ext-install pdo_dblib

RUN a2enmod rewrite

RUN docker-php-ext-configure ldap --with-libdir=lib/x86_64-linux-gnu \
 && docker-php-ext-install ldap \
 && docker-php-ext-install mcrypt \
 && docker-php-ext-install sockets \
 && docker-php-ext-install mbstring \
 && docker-php-ext-install zip \
 && docker-php-ext-install gd \
 && docker-php-ext-install mysql pdo_mysql

RUN a2enmod rewrite \
     && sed -i 's!/var/www/html!/var/www/public!g' /etc/apache2/sites-available/000-default.conf \
     && mv /var/www/html /var/www/public \
     && curl -sS https://getcomposer.org/installer \
    | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www
```

I hope this helps someone looking for a solution to run ZF with MS SQL driver.

{% include JB/setup %}
