---
layout: post
title: "How to setup networking and ssh access on Raspberry Pi using LAN cable via linux based system"
description: "Share Internet with Raspberry Pi using a LAN cable through Laptop or Desktop running linux"
category: Tutorials
tags: ["Raspberry Pi"]
change_frequency: "weekly"
image: raspi/raspi.jpg
priority: 0.8
date: 2014-03-05 15:30:00
---

#Overview

Follow through the commands and at the end of this tutorial, you will have Internet access on your raspberry Pi. Getting Internet access by directly using LAN cable via router is easy. The problem comes when you want to connect your Pi to the Laptop via LAN cable and still be able to access Internet and to setup an ssh access to the Pi keeping a static internal IP address for Pi.

#How to?

1. Connect your Laptop and Raspberry Pi using a LAN cable. Now on Laptop, open terminal and type `ifconfig`. Note down the interface for ethernet. It must be ***eth0 or eth1***.
2. Now on the laptop only, issue following commands in sequence and one by one 

        #Replace 10.0.0.1 with 192.168.0.1 or whatever your Gateway is.
        ip addr add 10.0.0.1/8 dev eth0 
        
        iptables -A FORWARD -o wlan0 -i eth0 -s 10.0.0.0/8 -m conntrack --ctstate NEW -j ACCEPT
        iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
        iptables -A POSTROUTING -t nat -j MASQUERADE
        echo 1 | sudo tee /proc/sys/net/ipv4/ip_forward
        ifconfig eth0 up

3. Now open up your network manager on laptop, select wired network. In that open IPV4 Settings Tab. Go to **method** and set it to manual. Then click **add** button. Now type IP address of client (Raspberry Pi). I have set it to 10.0.0.6. Then add netmask and gateway according to your network. For me gateway is 10.0.0.1 which is the router address. The netmask is set to 255.255.255.0.
4. Now boot up Raspberry Pi. Login and then `cd ../../`. Now do `nano ./etc/network/interfaces`. Replace the line “iface eth0 inet dhcp” with 

        iface eth0 inet static
        address 10.0.0.6
        netmask 255.255.255.0
        gateway 10.0.0.1
        network 10.0.0.0
        broadcast 0.0.0.0

5. Next on Rapberry Pi, issue the following commands 

        sudo ip addr add 10.0.0.6/8 dev eth0
        sudo ip route add default via 10.0.0.1

6. This should setup your Raspberry Pi to have static IP address. 
7. Now reboot using `sudo shutdown -r now` command.
8. Wait for it to reboot and then login again. Check if Internet is working by performing `ping google.com`. 
9. To access Raspberry Pi using ssh, go to your laptop's terminal and type `ssh pi@10.0.0.6` and it will ask for your password. That's all. 

<a href="/pages/toc-raspberrypi.html">View more tutorials on Raspberry Pi</a>

{% include JB/setup %}
