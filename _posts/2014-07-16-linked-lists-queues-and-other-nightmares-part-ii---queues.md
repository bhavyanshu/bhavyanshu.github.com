---
layout: post
title: "Linked Lists, Queues and other nightmares (Part II - Queues)"
description: "If you think linked lists, queues and other data structures are your worst nightmares then go on and read this tutorial. This might just help."
category: tutorials
tags: ["c","tutorial"]
change_frequency: "weekly"
priority: 0.8
date: 2014-07-16 18:05:45
---

This is in continuation to [Part I](http://bhavyanshu.me/tutorials/linked-lists-queues--other-nightmares-part-i/07/16/2014) in which I showed the use of pointers in implementing stack. I also talked about various concepts on pointers. Now we can move further.

## Queues

Unlike stacks, queue follows the rule of FIFO (first in first out). So our job is to construct a program that keeps track of the head which is nothing but the first element and the tail which will represent the empty space next to the last element. Why so? Because when we need to add a new element to the end of queue, we need an empty space.
Say for example our queue is **| 4 | 5 | 2 | 3 | _ | _ |**. So our head should point to 4 and tail should point to the empty space next to 3. The queue has two operations : Enqueue & Dequeue
**Enqueue**: When we want to add a new element.
**Dequeue**: When we want to remove an element. Keep in mind that the first element must be removed and the position of *head* must be moved to next element.

**NOTE** I will not write the complete code for queue here as most of it is similar to stack. I will just write the initialization of the variables and pointers and functions of enqueue and dequeue. For [complete code](https://github.com/bhavyanshu/RandomAlgorithms) visit this repository.

**Concept** : In stack we only required **top** to represent top of stack. In queue we need two things, **head** and a **tail**.

So our stucture would have

    {% highlight c%}
    typedef struct queue {
	int a[MAX]; //Array to store numbers.
	int head; //The index of first element
	int tail; //Keeps moving forward as we go on adding elements
    }Queue;
    Queue *ptr = (struct queue*)malloc(sizeof(struct queue)); //Pointer of type queue
    {% endhighlight %}

After this in `main()` we use:

    {% highlight c%}
    ptr->head=0; //Initially both head and tail should be at same position
	ptr->tail=0; //because the queue has nothing.
	{% endhighlight %}

The two important functions are

    {% highlight c%}
    void enque(queue *ptr, int num, int l); //Pushes the number to the end of queue and increases the tail by 1.
    int deque(queue *ptr, int num); //Pops the number from the front of the queue and increases head by 1.
    {% endhighlight %}

We need to send the limit as parameter as well because we need to check if the tail has reached the limit or not.

    {% highlight c%}
    void display(queue *ptr) { //Function that displays queue from head to tail
    	int i;
    	printf("Current queue \n");
    	for(i=ptr->head;i<=ptr->tail-1;i++) { //We loop from head to tail-1
    		printf("|%d|\n",ptr->a[i]);
    	}
    }

    void enque(queue *ptr, int num, int l) { //We push the element but first we check if the queue is full or not.

    	if(ptr->tail==l) { // l is the limit. We check if tail is at last or not.
    		printf("\nQueue limit reached\n");
    		display(ptr);
    	}
    	else { //We push the element to the top
    		ptr->a[ptr->tail]=num;
    		ptr->tail++;
    		display(ptr);
    	}
    }

    int deque(queue *ptr, int num) {

    	int result;
    	result = ptr->a[ptr->head]; //The head must be representing some element. We take that out and display queue is empty now message.

    	if(ptr->head==ptr->tail){
    		ptr->head=ptr->tail=0;
    		printf("\nQueue is empty Now\n");
    		return 0;
    	}
    	else {
    		ptr->head++;
    		return result;
    	}
    }
    {% endhighlight %}

That's it. This is the code snippet to implement queue using arrays and pointers concept. There is one more type of queue. It is called circular queue but that requires the concept of linked lists. So we must first take a look at linked lists.


{% include JB/setup %}
