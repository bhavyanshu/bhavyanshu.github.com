---
layout: post
title: "Linked Lists, Queues and other nightmares (Part I - Pointers and Stack)"
description: "If you think linked lists, queues and other data structures are your worst nightmares then go on and read this tutorial. This might just help."
category: tutorials
tags: ["c","tutorial"]
image: tuts/linuxkernel/gdb.png
change_frequency: "weekly"
priority: 0.8
date: 2014-07-16 08:05:45
---

## Overview

Oh well, I have been away from writing for a while now because of work. But I think I should share this little nightmare of mine with you all. I hate to admit that I have always disliked programming when it comes to data structures. But recently while going through the linux kernel source, i found that it really implements all these data structures in many cases so i must conquer this fear if i had to proceed with the kernel code.

Better to focus on concepts and then think of how you can code it. First I am gonna talk about **pointers** because it is the most important and basic element required to construct data structures in C. This is also the major part where people are afraid to work upon but let me tell you one thing. Once you understand pointers, you won't ever leave C programming because it is actually a beautiful language and gives you more control over the hardware than any other language can. Forget java and c++ or c#, they are good for making fancy GUIs and mobile applications. If you wish to learn microcontroller programming or you wish to interact with the hardware, then C is the way to do it. Also I would like to let you know that I will be using [GNU GCC](https://gcc.gnu.org/) for compiling so you should know how to use it. If you don't then here is a [tutorial](http://bhavyanshu.me/programming-in-gcc/09/04/2013) I wrote long time back. Refer to it and come back here to proceed.

## Pointers

Understanding pointers is not really difficult. What is difficult is how to remember all the concepts related to the pointers. We will tackle it concept by concept.

### Concept 1 - What is pointer?

When we declare a variable say`int a;`, this tells the compiler that a location in memory needs to be selected so that the variable name and its value can be stored at some address (2992 for example, it can be anything!). Now when we assign some value to the variable *a* say, for example, `a=25;`, the value field of the "memory box" is 25 and address field has some address in it. Refer to the table shown below. When we use *scanf*  in C programming, we use **&** operator which is nothing but an **address operator**. So `&a` simply means that we need to find the numeric value of the address where variable *a* is stored. So `b=&a;` is a valid statement, provided it is declared as `int *b;` as variable *b* gets the numeric value of the address of variable *a*. So `int *b;` declaration says that *b* will store the address of type Integer.
Now let us look at the third operation `c=*b;` where `*` is an **indirection operator**. An indirection operator tells the compiler to read contents of *b* which is nothing but the address of variable *a* and then it tells compiler to go to the address 2992 and retrieve its content which is again *25* in this case. Hence variable *c* has value 25.

| Variable Name 	| Address 	| Contents 	| Operation 	|   	|
|---------------	|---------	|----------	|-----------	|--:	|
| a             	| 2992    	| 25       	| a=25      	|   	|
| b             	| 4982    	| 2992     	| b=&a      	|   	|
| c             	| 3925    	| 25       	| c=*b      	|   	|

Q. What is the difference between * being used in statement and * being used in declaration?

This is a very important concept which people tend to forget. Atleast I made lot of mistakes during my graduation. The indirection operator used in the **declaration** only gives information that the variable will store an address whereas when it is used in **statement** it is an operator telling the compiler that the *contents* field of the variable contains an address which can be used to collect some data. (Like we did in case of variable *c* )

### Concept 2 - Pointers in case of arrays and functions

A very important concept related to the arrays is that if we write `int * b;` and `int a[3]={1,2,3};` then the statements `b=&a[0];` and `b=a` are same because in both cases the address of the zeroth element of the array will be stored in variable *b*.

In case of functions, the most common errors made by me were when I was passing pointer type arguments. This is a very important concept that you must keep in mind. We use pointers in functions to **send addresses rather than values** to the formal arguments of the function. I am not going to explain this because it is a very common concept and you can refer it here http://www.codingunit.com/c-tutorial-call-by-value-or-call-by-reference They have given a very good example on it which will make it clear.

## Stacks

Before moving on to linked lists and queues, let us look at stacks. A stack is a structure in which only the top element is accessible. Suppose there are n elements in the stack. Then you must "Pop" out the nth element in order to access (n-1)th element in the stack.

Q. Why is stack called LIFO store?
Because of the storing and retrieving of the elements only from one end. You can only "POP" out the top element from the stack. LIFO means *last in first out*!

### Let us write a program to simulate stack implementation using the concept of pointers.

    {% highlight c %}
    #include<stdio.h>
    #include<stdlib.h>
    #include<malloc.h>

    #define MAX 100

    typedef struct stack {
    	int a[MAX]; //Array to store numbers.
    	int top; //The index of top most element
    }Stack;
    Stack *ptr = (struct stack*)malloc(sizeof(struct stack)); //Pointer of type stack
    /** I would like to give special reference to the above statement.
     * While coding this i made a major blunder where i was accessing beyond
     * the memory allocated by the malloc. Refer to this to learn more :
     * http://stackoverflow.com/a/11745445
     */

    void display(Stack *ptr);
    void push(Stack *ptr, int num, int l); //Pushes the number to the stack top
    int pop(Stack *ptr, int num); //Pops the number from the stack top


    int main() {

	int number,option,limit,status;
	ptr->top=-1; //Initializing stack
	printf("*******Welcome to Stack Simulation*******\n");
	printf("Enter how many elements you want in the stack:\n");
	scanf("%d",&limit);

	while(1) {
		printf("1: Display Stack\n");
		printf("2: Push\n");
		printf("3: Pop\n");
		printf("4: Exit\n");
		scanf("%d",&option);
		switch(option) {
			case 1: //DISPLAY STACK
				display(ptr);
				break;

			case 2: //PUSH
				printf("Enter the element you want to push :");
				scanf("%d",&number);
				push(ptr, number, limit);
				break;

			case 3: //POP
				status = pop(ptr, number);
				if(status==0) {
					printf("No element left to pop! \n");
				}
				else {
				printf("The element pop'd out is: %d\n",status);
				}
				break;

			default: //Exit
				exit(0);
    		}
    	}
    }

    void display(Stack *ptr) {
	int i;
	printf("Current Stack \n");
	for(i=ptr->top;i>=0;i--) {
		printf("|%d|\n",ptr->a[i]);
    	}
    }

    void push(Stack *ptr, int num, int l) { //We push the element but first we check if the stack is full or not.


	if(ptr->top==l-1) {
		printf("\n*******Stack Overflow Condition*******\n\n");
	}
	else { //We push the element to the top
		ptr->top++;
		ptr->a[ptr->top]=num;
		display(ptr);
    	}
    }

    int pop(Stack *ptr, int num) { //We pop the element but first we check if the stack is already empty or not.

	int result;

	if(ptr->top==-1){
		printf("\n*******Empty Stack Condition*******\n\n");
		return 0;
	}
	else {
		result = ptr->a[ptr->top];
		ptr->top--;
    	}
    	return result;
    }
    {% endhighlight %}

### Debugging using GDB      

One more common thing that occurs when you deal with pointers is **Segmentation fault** error. To know which line of code is causing this, you need to use **gdb**. Look at the image below.

![Debugging using GDB][1]


In this I have encountered a segmentation fault because i was not initializing `Stack *ptr;`. The line where i was receiving the SIGSEGV was `ptr->top-1;`. I came to know this using **gdb**. To start gdb, open terminal and first compile the source using gcc `gcc -g stack.c -o stack` and then run `gdb stack`. The *-g* argument in gcc command generated necessary info for gdb. `b 20` in the image is a command to add a breakpoint in the code. Then I used `run` command to run the *stack* program. It runs till line 20 and the breaks off. Then I declared a new breakpoint `b 30` but the error was encountered at line 21. **gdb** is a very useful tool and you must get used to of using it.

Look at [part II](https://bhavyanshu.me/tutorials/linked-lists-queues-and-other-nightmares-part-ii-queues/07/16/2014) for Queues.

[1]: /assets/imags/tuts/linuxkernel/gdb.png

{% include JB/setup %}
