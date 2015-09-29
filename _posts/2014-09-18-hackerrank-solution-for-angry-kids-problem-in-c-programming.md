---
layout: post
title: "Hackerrank solution for Angry Kids problem in C language"
description: "Angry Kids is an algorithmic challenge on hackkerank website. This is the solution I have made for it in C Language. It does not matter what language you use."
category: tutorials
tags: ["gcc, c"]
change_frequency: "weekly"
priority: 0.8
date: 2014-09-18 08:45:43
---

##Problem Overview

Bill Gates is on one of his philanthropic journeys to a village in Utopia. He has N packets of candies and would like to distribute one packet to each of the K children in the village (each packet may contain different number of candies). To avoid any fighting among the children, he would like to pick K out of N packets, such that unfairness is minimized.

Suppose the K packets have (x1, x2, x3,....xk) candies in them, where xi denotes the number of candies in the ith packet, then we define unfairness as

max(x1,x2,...xk) - min(x1,x2,...xk)

where max denotes the highest value amongst the elements, and min denotes the least value amongst the elements. Can you figure out the minimum unfairness and print it?

Input
The first line contains an integer N.
The second line contains an integer K. N lines follow. Each line contains an integer that denotes the candy in the ith packet.

Output
An integer that denotes the minimum possible value of unfairness.


##Program that works for all test cases

(Compiled & Tested on Linux with GNU GCC)

	{% highlight c %}
#include<stdio.h>
#include<math.h>
#include<stdlib.h>

/*
 * Comparison function required by qsort - 
 * The comparison function must return an integer less 
 * than, equal to, or greater than zero if the first   
 * argument is considered to be respectively less than,   
 * equal to, or greater than the second. If two members 
 * compare as equal, their order in the sorted array is
 * undefined.
 */
int compare(const void *a,const void *b){
	const int *da = (const int *)a;
	const int *db = (const int *)b;
	return (*da>*db) - (*da<*db);
}

int main(){
	long long int i,j,k,n,z;
	long long int unfairness=999999999999,new_unfairness;
	long long int min,max;
	
	scanf("%lld",&n); //Input total number of packets

	scanf("%lld",&k); //Input no. of children

	int arr[n]; 
	//Input how much candy ith packet contains
	for(i=0;i<n;i++)
		scanf("%d",&arr[i]);

	qsort(arr,n, sizeof(int),compare); //Sort in ascending order

	for(i=0;i<n-k;i++) {
		z=k+i-1;	// Z decides the size of new subarray
		if(z>(n-1)){ break;}
		min=arr[i];	// The minimum value of subarray is the first element
		max=arr[z];  // The maximum value of subarray is the last element
		new_unfairness = max-min; //Calculate the unfairness value
		if(new_unfairness<unfairness){ //Compare unfaireness value with previous one and see if it is less than old one
			//Update unfairness
			unfairness=new_unfairness; //If found less, then update old value with the new one.
		}
	}
	printf("%lld",unfairness);
}

	{% endhighlight %}


The code can be found in my github repository of [RandomAlgorithms](https://github.com/bhavyanshu/RandomAlgorithms) with 2 testcases for this problem. If any doubt or suggestion, then leave a comment below.

{% include JB/setup %}
