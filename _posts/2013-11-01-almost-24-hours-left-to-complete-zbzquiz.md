---
layout: post
title: "Almost 24 hours left out of 48 hours to complete zBzQuiz"
description: "I planed to do some live hacking on my zBzQuiz project. Time limit is of 48 hours. Almost 24 hours have passed away."
category: 
tags: ["Programming"]
image: zBzQuiz/zbzquiz6.png
change_frequency: "weekly"
priority: 0.8
date: 2013-11-02 08:40:45 

---


For those who don't know what i will be hacking this weekend : [zBzQuiz](https://github.com/bhavyanshu/zBzQuiz) is a responsive, fresh, modern, bold and completely free web application used for hosting MCQ quizes in schools, colleges and other institutes. Its back-end code is written in php and is very well documented. It's easy to install and runs perfectly well on most desktop as well as mobile browsers.								

					

##Current Scenario
As of now i have 5 issues remaining in the [issue stack](https://github.com/bhavyanshu/zBzQuiz/issues?state=open). Till now i have completed till "Professors course registration and course manager" module. Now i will be hacking around with test creation and management module. After that i will hack for students portal to find courses and register for courses. I still have a long way to go and need to do a lot of work on this. Many more modules need to be created. Most crucial would be to solve the problem of making a responsive countdown timer without hurting the current layout structure. This time i have planned to write up everything i am doing. Just because i like documenting everything i do. 											
Let the hacking begin!													

#31st October 2013 T 10:10PM - Let the hacking begin!	
I am not using an IDE. I stopped using IDE long back for web development. I just have a gedit text editor open on my linux machine. I have phpmyadmin to manage databases and localhost apache server is up and running. Stuck with a new [issue](https://github.com/bhavyanshu/zBzQuiz/issues/7). Okay, the thing is at the fetchcourses.php page i am passing an ID value. That's just stupid of me to pass it via hidden element. Crap! what was i thinking. **"Bad call, Bhavyanshu!"**. Anyway i have fixed the security loophole now in my last [commit](https://github.com/bhavyanshu/zBzQuiz/commit/63247af048bd979a700787e452d61bd5340adccc).

#31st October 2013 T 11:19PM 
Now moving on. I have introduced a lot of code in above commit. Let us get working on fetching tests and test manager. I need to think of a layout quickly for this particular thing. It is bit tricky. Because with each courseID i will have a list of tests. For now in the course manager, i have a button to manage tests for this course. Once the person clicks on this, i will move him to a new page where there will be a list of tests associated with the course where they can easily manage/edit/delete a particular test under that course. Yup i think i should stick with this user flow for now. 							
Oh wait! I think i need a better approach to this. **Current loc is 3728 lines of code**. I think i can minimize it by having a better modular approach. First thing first. Need to fix this. I should minimize code duplicacy by building multiple functions and having function calls wherever required rather than repeating the same code.									

Commit for this comming up tonight.

#1st November 04:00AM
Nope i haven't slept yet. It's taking longer than expected. I will finish this off and sleep for few hours.

#1st November 02:00PM
Almost done with test manager. Now just need to build an interface to edit tests like adding/deleting questions and allocating score to each question etc.

#1st November 05:20PM
Done with test manager. The css sprite was eating up my brain. I am using a single image with multiple action icons. This will reduce requests to the server. Hence this brain churning excercise. Though i am done with it. Not sure if i should make a commit right away.

#1st November 07:00PM
Okay i made a [commit](https://github.com/bhavyanshu/zBzQuiz/commit/0aa9d7fe05628a7db0daa4d7def763702c81a5e6) for test manager and responsive table layout as well. In this i am also trying a new modular approach as well to minimize code duplication. Current LOC is 2541.

#1st November 08:40PM
I am currently in the middle of designing a responsive layout for adding questions and managing questions in a test. I am implementing AJAX using jquery and loading divs dynamically. This bit is going to be hard as i will also have to maintain the responsive layout as well. I hope nothing breaks. Getting back to work.

#1st November 11:50PM
Huff, after wasting a lot of my mind on jquery and ajax, i have finally implemented the question creation panel which is responsive, fast, easy to use and has a kickass design. Few small features still need to be added in the teachers. Once i check out everything i am going to write down what all features are left for the teachers portal. Then i will move on to the student's portal which needs to be done from scratch.

#2nd November 04:00PM
Okay, i am really tired now. I should just go out for a while. I have finished off my target. Though the API is still not complete, but most of the teachers portal is ready. Maybe i will work on students portal too. But not now. Sometime later. For now, i need a break.					
Let me show you some snapshots of it.


#Snapshots of what i hacked on in past 48 hours. 

![Screenshot 1]({{ site.url }}/assets/imags/zBzQuiz/zbzquiz1.png)
<br/><br/>
![Screenshot 2]({{ site.url }}/assets/imags/zBzQuiz/zbzquiz2.png)
<br/><br/>
![Screenshot 3]({{ site.url }}/assets/imags/zBzQuiz/zbzquiz3.png)
<br/><br/>
This is the responsive tabular layout. This bit was time consuming as i had to write up the css media queries myself. I usually avoid doing css. But had to do this bit.
<br/>
![Screenshot 4]({{ site.url }}/assets/imags/zBzQuiz/zbzquiz4.png)
<br/><br/>

#Output from CLOC shows
<br/>
<br/>
![Screenshot 6]({{ site.url }}/assets/imags/zBzQuiz/zbzquiz6.png)
<br/>


{% include JB/setup %}
