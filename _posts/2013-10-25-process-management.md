---
layout: post
title: "Process Management Part 1/2 | Understanding Linux Kernel"
description: "This bit is about process management in linux kernel. It is important to study this before moving on."
category: Tutorials
tags: ["linux-kernel"]
change_frequency: "weekly"
priority: 0.8
---

# Overview

>A Process/Task is a program (Object code stored somewhere in the computer or external media) in the midst of execution. In simple terms, it is the active program.
>Also called *test section* in Unix. They are more than just running programs. They usually contain resources like internal kernel data, pending signals, threads, global variables etc.
>**Threads** are nothing but objects of activity within the process. Each thread has a process counter, stack & process registers.
>The kernel schedules individual threads and not processes.

# Key Terms

>Process provides two virtualizations : A virtualized processor & Virtual Memory.

* Virtualized processor : Give process the illusion that it is the only process that has been allocated complete processor resources but in reality there can be multiple processes sharing the same processor.

* Virtual Memory:  Lets the process think that it alone has complete control over memory in the system for allocation and management.

# Begin a process
The <code>fork()</code> is responsible in Linux systems. It is a system call which creates a new process by duplicating an existing one. **Parent** is the one which calls this and **child** is the newly created process. The parent resumes right when child fork() returns. Finally the program exits via <code>exit()</code> system call. In this all the resources are freed. <code>wait4()</code> is used to inquire about the status of the termination of a specific process.
*How does kernel store the information about processes?*
>The kernel stores the processes in a circular doubly linked list called the **task list**. Each element in the task list is a <code>process descriptor</code> of >the type <code>struct task_struct</code> which is defined in <code> linux/sched.h </code>. It is pretty large data structure of about 1.7 Kb on a 32-bit machine.
>The process descriptor has all the data that describes the existence and resources related to the executing program.

## Allocation

*Initial Scenario* : Before 2.6 kernel, <code>struct task_struct</code> was stored at the end of stack for each process which allowed x86 architectures to calculate the location of the process descriptor using stack pointer without using extra register to store the location. Now we use <code>struct thread_info</code>, a new structure, which stays at the bottom/top depending on the type of stack. Register impaired architectures were not the only reason for creating this new structure. It rather makes it pretty easy to calculate offsets of its value for use in assembly language. We know that with c language, we also require assembly for linux kernel.

	{% highlight c %}
#include <asm/thread_info.h>

struct thread_info {	 //has a pointer to the process descriptor. This is located at the end of stack.
	struct task_struct *task; //Pointer to the task's actual task_struct
	struct exec_domain *exec_domain;
	_u32 flags;
	_u32 status;
	_u32 cpu;
	int preempt_count;
	mm_segment_t addr_limit;
	struct restart_block restart_block;
	void *sysenter_return;
	int uaccess_err;
};
	{% endhighlight %}

* Current Macro: The current macro is useful to be able to quickly look up the process descriptor for the currently executing process. The implementation of this is dependent on the architecture. Architecture like x86, with few registers to waste, it is wise to implement it in such a way that thread_info is stored on the kernel stack to calculate the location of task_struct.

# Things to ponder about

*What is this PID in the system monitor of linux desktop?*
Each processes is identified by a unique **Process Identification** value known as PID. It is in the opaque type(a type whose physical representation is unknown) <code>pid_t //typically int</code>. This is stored as PID inside each process descriptor.
*In the scenario of large servers,if the highest value for short int is 32,768, then what happens if in case it exceeds this value?*
Well the value can be increased to upto 4 million even. This is in <code> linux/threads.h </code>. This value can be increased via **proc/sys/kernel/pid_max**.


[Continue to part 2](http://bhavyanshu.github.io/tutorials/process-management-part-2/10/30/2013)

{% include JB/setup %}
