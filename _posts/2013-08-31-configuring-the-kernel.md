---
layout: post
title: "Configuring the kernel"
description: "Let us go through the various steps used for configuring the kernel before building the kernel."
category:
tags: ["linux-kernel"]
image: aqua.jpg
change_frequency: "weekly"
priority: 0.8
---
# Overview
It is best to use <code>make menuconfig</code> command because users can save their progress. The usual <code>make config</code> does not offer this because the configuration process take a lot of time and is the very crucial step in kernel compilation. Like for example if you add modules that are not required by you during configuration process, you may end up having a huge kernel that would suck up a lot of RAM and we don't want that to happen in linux.     

## Configuration
Let us go through the important things we must know before-hand. The first and the most important thing is that you must understand what your system's hardware is. When you issue <code>make menuconfig</code>, the first question that is usually asked is whether you wish to build for 64 bit machine or 32 bit machine. I will be configuring it for 32 bit machine as i currently have 32 bit system. The next line shows "Cross-compiler tool prefix (CROSS_COMPILE) []". If you are not cross-compiling, hit enter. If you are cross-compiling, type something like "arm-unknown-linux-gnu-" for ARM systems or "x86_64-pc-linux-gnu-" for 64-bit PC systems. Cross compiling is basically compiling code to be used on other processors.    
Next thing is very interesting. You will come across "Local version - append to kernel release (LOCALVERSION)[]". This is where you can put something like "customkernelbuild1". So the kernel version will be displayed something like "2.6-customkernelbuild1". Next thing it would probably ask is "LOCALVERSION_AUTO". So if a git tree is present the revision number will be appended.    
Then the config menu would ask about the compression format. You will have 5 different compression formats.
1. Gzip (KERNEL_GZIP)
2. Bzip2 (KERNEL_BZIP2)
3. LZMA (KERNEL_LZMA)
4. XZ (KERNEL_XZ)
5. LZO (KERNEL_LZO)

Gzip is the default so i will choose that.   
Next comes the “Default hostname (DEFAULT_HOSTNAME) [(none)]”. The default hostname can be configured. Usually, developers leave this blank (I left it blank) so that Linux users can set up their own hostname.    
Next comes the swap space. If you have been partitioning for using linux alongside windows (Dual Booting), then you must be aware that linux uses a partition specifically for swap space which is usually the virtual memory for linux. I would choose yes in this.    
Next is IPC (Inter Process Communication) that allows processes to communicate and sync. It is always best to enable it otherwise many application won't work. Next message is about "POSIX_MQUEUE", which is basically POSIX message queue where messages are labeled with priorities. I would again choose yes as this is important.  

**FHANDLE** - This is used by programs that will be premitted to use file handles instead of filenames when performing filesystem operations. So i would go on and choose yes.    

**AUDIT** - Auditing support logs the accesses and modifications of all files. This is yes by default.    

**AUDITSYSCALL** - If enabled, all system calls are logged. If you need performance over logging each and everything, then disable this.    

**AUDIT_LOGINUID_IMMUTABLE** - Disable it for better performance. This is basically for enabling processes in userspace to change their own login UIDs.     



## IRQ Subsystem configuration
IRQ is a signal from your system's underlying hardware to the processor to halt a running process and allow a different program to run in its place.     
**IRQ_DOMAIN_DEBUG** - This is for debugging purposes. So i would select no since i am not interested in knowing IRQ numbers for the hardware.    
**NO_HZ** - Dynamic ticks, means that the timer interrupts will be used as needed. Such interrupts allow tasks to be executed at particular interval of time. If your hardware is old or your system in terms of hardware is slow then select no or else select yes as i did.    

### Cputime accounting

1. **TICK_CPI_ACCOUNTING** - I chose this. This accounting model is simple.
2. **VIRT_CPU_ACCOUNTING_GEN** - Has overheads.
3. **IRQ_TIME_ACCOUNTING** - The performance cost is small.


**BSD_PROCESS_ACT** - For a smaller & faster kernel, you should choose "no". It basically logs information for each process that closes.

The next set will have task accounting related questions.   
**TASKSTATS** - Exports process statistics via special sockets which are a form of IPC between the kernel and user processes.
**TASK_DELAY_ACCT** - watches the processes and the delays concerning the access of resources. For example, TASK_DELAY_ACCT would see that process P1 is waiting for some CPU time. The process is then given some CPU time if TASK_DELAY_ACCT notices that the process waits too long. TASK_XACCT collects extra accounting data. I will disable this for less kernel overhead.    

Huff, too much for now. Kernel configuration will be continued till next post. So keep up and keep reading theory side by side.    
In the next we will be starting off with **RCU Subsystem** (*Read-Copy-Update*) config.





{% include JB/setup %}
