---
layout: post
title: "Process Management part 2"
description: "This is the part 2 of the Process Management series for Understanding Linux Kernel."
category: tutorials
tags: ["linux-kernel"]
change_frequency: "weekly"
priority: 0.8
---

If you have read the part 1, then you must know that each process in Linux system is identified by its unique process ID known as pid. These are 16 bit numbers that are assigned sequentially. When referrin to the process in GNU C, we always use <code>pid_t</code> typedef which is in <code>sys/types.h</code>. To get the process ID, we can use <code>getppid()</code> system call. It will return the process ID.

	{% highlight c %}
#include <stdio.h>
#include <unistd.h>

int main() //Implementation for the getpid() system call.
{
	printf("The process is %d",getpid());
	printf("The parent of the process is %d",getppid());
	return 0;
}
	{% endhighlight %}


Now coming back to where we left in the first part of this. We were studying how to create a process. Let me exlpain you with a code snippet.

	{% highlight c %}
#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>

int main()
{
	pid_t child_pid; //A variable declared of type pid_t. It has already been explained above.
	print f("Fetching the main process %d",(int) getpid());
	child_pid = fork(); //Initiating the child process
	if(child_pid!=0){ //Checking if it exists or not or else it will itself be the child process. Read the theory above carefully.
		printf("Parent process %d",(int) getpid());
		printf("Child Process %d",(int) child_pid);
	}
	else
		printf("This is a child process with ID %d",(int)getpid());
	return 0;
}
	{% endhighlight %}

##Process Scheduling

Linux promises that no process will be completely starved of execution resources. There is a **niceness** value (zero by default) which means that if it is higher then the process is given a lesser execution priority. 

##Killing a process

We have often used **kill** command in linux system to kill a process but did you ever think how it works internally? Well, the kill command works by sending the process a SIGTERM, or termination, signal. This causes the process to terminate, unless the executing program explicitly handles or masks the SIGTERM signal. 

In the next part we will read about threads. You can [subscribe via email](http://bhavyanshu.me/subscribe.html) for latest posts.

{% include JB/setup %}
