---
layout: post
title: "Linux Device Drivers Part 2 | Writing your first kernel module!"
description: "This is the part 2 of the device drivers chapter from understanding linux kernel series. In this we will compile and run our first module."
category: tutorials
tags: ["linux-kernel"]
change_frequency: "weekly"
priority: 0.7
date: 2013-11-17 16:30:10
---
#Overview
In this tutorial, i am gonna write a very basic code in C for a very basic kernel module. Then I will show you the compiling and running process for the module we will create.



##Code

    {% highlight c %}

#include <linux/init.h>
#include <linux/module.h>
MODULE_LICENSE("DUAL BSD/GPL"); //Special macro to inform kernel that this uses free license. Or else the kernel complains when the module is loaded.

static int mymodule_init(void)
{
    printk(KERN_ALERT "Hello, I am your kernel module\n"); //Similar to printf in C library
    return 0;
}

static void mymodule_exit(void)
{
    printk(KERN_ALERT "You don't pay me well. Goodbye!\n"); //KERN_ALERT shows the priority of the message.
}
/*Now we use special kernel macros to indicate the roles of both of the defined functions.*/
module_init(mymodule_init); 
module_exit(mymodule_exit);
    {% endhighlight %}

Now is the time to learn about MAKE file. The kernel hackers have developed a make file default syntax so that they can compile the kernel from outside the kernel source tree. You should use the following lines of code.

    {% highlight makefile %}
    #if KERNELRELEASE is defined, we've been invoked from the kernel build system and can use its language.
    ifneq ($(KERNELRELEASE),)
        obj-m := mymodule.o
        
    #Otherwise we were called directly from the command line; Invoke the kernel build system.
    else
        KERNELDIR ?= /lib/modules/$(shell uname -r)/build
        PWD := $(shell pwd)
        
    default:
        $(MAKE) -C $(KERNELDIR) M=$(PWD) modules_install
        
    endif
    {% endhighlight %}

##Testing : insmod & rmmod utils
Now to test the module we can use *insmod* and *rmmod* utilities. For this you need to be a superuser. 

Run *make*. 
Then run `insmod ./mymodule.ko` & it will show the output as in the first printk statement. Next use `rmmod mymodule` & it will output the statement in the second printk. In case you are running linux using virtual system, you may not see any output. The messages go to */var/log/messages*.

#Compiling & Loading A Module

We must make sure we have the right versions for tools in order to compile a kernel module without any failures. For this we can use *Documentation/Changes* in the kernel docs directory. 

Look at the default makefile. This is an extended syntax GNU make syntax. Basically the above make file checks whether the KERNELRELEASE variable has been set or not. But do note that the above makefile is not complete. The complete makefile usually includes other stuff like cleaning up unneeded files and installing modules info.

After the module is built using make command, the next thing to do is to load it into the kernel. Just like we used insmod and rmmod, we can enhance the loading process. Another utility similar to insmod, called modprobe loads a module into the kernel. It differs in that it will look at the module to be loaded to see whether it references any symbols that are not currently defined in the kernel. If found, it looks for such modules in the path. If we use insmod in such case, it gives an error stating **unresolved symbols**. 

This is it for the second part. I will write up the third part soon. It will consist of theory and details about insmod, kernel symbol table & platform dependencies. Thanks for being patient. Happy kernel hacking!


{% include JB/setup %}
