---
layout: post
title: "Meet lulzbot, a Telegram bot built using Telegram Bot API"
description: "lulzbot is a bot developed for Telegram messaging app using Telegram API. It has lot of features. Find it on telegram using @lulzbot"
tags: ['Telegram','Telegram Bot API']
change_frequency: "weekly"
priority: 0.9
date: 2015-07-25 13:30:45
---

## Add it to your telegram group and have fun [@lulzbot](https://telegram.me/lulzbot)

I spent this weekend coding a bot for Telegram messaging app. The bot is similar to what I used to have for my IRC channels as well. It's just that integrating all the social plugins was a new thing. Thanks to the wrappers available for social APIs, they sure made it easier.

It is free to use and you can actually grab the source code of it from [github](https://github.com/bhavyanshu/lulzbot-telegram-bot). The license is GPL so you are free to do whatever you want to do with it.

##Commands

| Commands argument  	    | *Function*								   | **Example**     			|
| --------------------------| ---------------------------------------------| ---------------------------|
| /help			  		    | Displays list of Commands                    | /help	      				|
| /google keyword           | Google search by keyword					   | /google terminator			|
| /wiki keyword		  	    | Lookup for wikipedia article 				   | /wiki Anaconda				|
| /github username	  	    | Get recent activity of user 				   | /github Bhavyanshu 		|
| /translate from to "strng"| Microsoft translate						   | /translate en hi "I'm good"|
| /insta username           | Get posts of instagram user 				   | /insta magnumphotos		|
| /hon			  		    | Get random Instagram post and start HotOrNot | /hon or /hotornot 			|
| /tw username              | Get tweets of twitter user 				   | /tw nasa					|
| /yt keyword string	    | Search youtube for video 					   | /yt Iron Maiden			|
| /cats			  		    | Get a random cat pic 						   | /cats						|
| /weather city,state       | Get weather update for city 				   | /weather paris				|
| /giphy keyword            | Get gif from giphy 						   | /gif awesome				|
| /calc expression          | Calculate math expressions 				   | /calc 2+2 					|


<br>

> Note that some features of the actual bot @lulzbot registered on telegram will be missing from here. Like bot administration commands and commands meant for my own personal use. However, they do not break this code nor do they in any way affect the working on this code. They are completely unrelated modules. On request, I can explain how you can write bot administration commands for Telegram bot API.

##Derive your own bot from this

1. First open data/config.ini file and add all the required API keys from various social media sites. For telegram token, contact @BotFather on telegram and create a new bot there. @BotFather will reply provide you the token once the bot is created.
2. Then you need to make sure you have all the [required dependencies](https://github.com/bhavyanshu/lulzbot-telegram-bot/blob/master/requirements.txt). **Python 2.7 is required**. Apart from that I have provided requirements.txt file and pip command should be able to fetch it all for you.

        $ pip install -r requirements.txt

3. For debugging, run using `python bot.py`. If there is a crash, it won't restart. Test all the commands.
4. For production mode, run `./botmon.sh` which will restart bot if it crashes.
5. Now you can make any changes you want and use it as your own bot in telegram.

##LICENSE

> Copyright (C) 2015  Bhavyanshu Parasher <br>
> This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version. <br>
> This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details. <br>
> You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

##Contribute

> Create an issue if you find any bug. If you want to improve something, send a pull request.

{% include JB/setup %}