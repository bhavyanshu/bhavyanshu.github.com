---
layout: post
title: "Docker Reference (Docker-compose)"
description: "Just wanted to share some tips and tricks I learned while working with docker. It has some commonly used features of docker."
category: tutorials
tags: ["docker"]
change_frequency: "weekly"
priority: 0.8
date: 2017-09-04 01:23:11
---

## Docker Go-to guide

This post consists of all the frequently used commands for docker. I am posting it for my reference. Feel free to use it.

### Basic Architecture & Terminology

docker client <-> docker daemon/engine/server (lightweight linux VM) -> containers

Container Images:
* Read only templates used to create containers
* Created with docker build command
* Composed of layers of other images
* Stored in docker registry like docker hub
* If image is a class, then container is an instance (object) of a class


Containers: lightweight and portable encapsulations of an environment in which to run applications.

Registry: where we store images, like dockerhub

Dockerhub:
  - Public registry for docker
  - Recommended to use official images only in production

### Some Useful Commands

* Force delete all images with <none> repotags:

  ```bash
  docker rmi -f $(sudo docker images -f "dangling=true" -q)
  ```

* Docker Interactive -i interactive and -t pseudo TTY

* Detached mode using -d

* Low level info:

  ```bash
  docker inspect <container_id>
  ```
* Port mapping:

  ```bash
  -p host_port:container_port
  docker run -it -p 8888:8080 tomcat
  ```

* Logs of running container

  ```bash
  docker logs <container_id>
  ```

* Image layers

  - changes made into the running containers are written to the writable layer
  - writable layer is deleted when container is deleted but underlying layer remains.
  - multiple containers can share same underlying image

  ```bash
  docker history busybox
  ```

* Commit changes made in Docker container
  - spin up a container from base image

  ```bash
  docker run -it debian:jessie
  apt install -y git
  docker commit <container_id> <repo_name:tag>
  docker run -it <repo_name:tag>
  ```

* Dockerfile
  - contains instructions users provide to assemble image
  - each instruction creates new image layer over underlying base image.

  ```bash
  FROM debian:jessie
  RUN apt-get update && apt-get install -y \
    git \
    vim
  RUN useradd -ms /bin/bash admin
  USER admin

  docker build -t <repo_name:tag> .
  ```

> NOTE: When build starts, docker client packs all files in the build context into a tarball and transfers it into the daemon.

* Docker cache
  - if instruction doesn't change, Docker reuses existing layer instead of building new one each time.

* Aggressive Caching achieved by chaining apt-get update && apt-get install

* ADD action downloads file and copies to container, can automatically unpack compressed files.

* Push images to Docker hub

  ```bash
  docker tag <image_id> <docker_hub_id/debian:tag>
  # Note: avoid using latest tag. Explicitly state a tag every time.
  # Because images which are tagged latest will not be
  # updated automatically when a # newer version of the image is pushed to # the repo.
  docker login --username=<USERNAME>
  docker push <docker_hub_id/debian:tag>
  ```

* Run commands in container

  ```bash
  docker exec -it <container_id> bash
  ```

* Link Docker Containers

  ```bash
  docker build -t app:v0.1
  dockcer run -d -p 8000:8000 --link redis app:v0.1
  ```

---
### Docker Compose - Automate docker workflow

> Impractical for large number of containers, especially when linking them.

docker-compose.yml
```
version: '2'
services:
  app:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - <host_dir>:</container_dir> # ./app:/app

  redis:
    image: redis:3.2.0
```

Some more commands:

```bash
docker-compose up -d
docker-compose ps

# appended logs
docker-compose logs -f <container_name>

# stop
docker-compose stop

# remove containers
docker-compose rm

# force rebuild image
docker-compose build
docker-compose up -d
```

#### Docker Container Networking

* uses bridged network by default
* closed(none) - no access to outside internet, closed container, max level of network protection.

  ```bash
  docker run -d --net none busybox sleep 1000
  ```

* bridged - default network type, access to outside internet and to other containers on bridge
  - Connect multiple bridges together which however is not possible by default. But docker has an option to enable this:

  ```bash
  docker network create --driver bridge <network_name>
  docker network ls
  ```

* Some more networking related commands

  ```bash
  # find the subnet & gateway
  docker network inspect <network_name>

  # assign a container to the newly created network
  docker run -d --name <container_name> --net <network_name> busybox sleep 1000

  # connect new container to first(old) bridge network
  docker network connect bridge <container_name>

  # disconnect
  docker network disconnect bridge <container_name>
  ```

* host
  - least protected network model
  - adds a container on the host's network stack
  - usually called open containers
  - only benefit is performance of network
  - never use in production unless there is no other option

* overlay network
  - multi-host networking, require pre-existing conditions like, running docker in swarm mode


Define container networks with docker-compose.yml

```
services:
  app:
    ...
    networks:
      - <network_name>
  redis:
    ...
    networks:
      - <network_name>
networks:
  <network_name>:
    driver: bridge
```

Spin it up using: ```docker-compose up -d```

### Exec in docker containers

```
# first build
docker-composer up -d

# run command inside 'app' container
docker-compose run app php test.php
```

### Docker in production

* Use COPY instead of volumes mount
  COPY app /app

* docker-machine

  ```bash
  docker-machine create --driver digitalocean -- digitalocean-access-token <DO_Token> <VM_Name>
  ```

* Multiple env support

  ```bash
  docker-machine env <vmname>
  cp compose.yml prod.yml
  build -> image
  docker-compose -f prod.yml up -d
  ```

{% include JB/setup %}
