---
layout: post
title: "SQL JOINS explained"
description: "I have often seen people having trouble learning SQL joins. Here is my tiny attempt at teaching about joins."
category: tutorials
tags: ["MySQL"]
image: mysql_join/left_outer_join_cli.png
change_frequency: "weekly"
priority: 0.7
date: 2013-11-02 10:26:10
---

# Overview 
In this tutorial, i will try to explain the JOINS in MySQL with their example. I hope you would atleast have an idea of what happens in the joins. I am using MySQl as i am on linux and this is the most widely used open source RDBMS. 							

We have two tables **table_A** & **table_B**.					
<br/>
![Screenshot list]({{ site.url }}/assets/imags/mysql_join/tables_list.png)						
<br/><br/>
**Table A**
![Screenshot 1]({{ site.url }}/assets/imags/mysql_join/tableA.png)						
<br/><br/>
**Table B**
![Screenshot 2]({{ site.url }}/assets/imags/mysql_join/tableB.png)						
<br/><br/>

## Inner Join
Inner join produces only the set of records that are matching in both Table A and Table B.							

![Screenshot 3]({{ site.url }}/assets/imags/mysql_join/inner_join.png)					
<br/><br/>
![Screenshot 4]({{ site.url }}/assets/imags/mysql_join/inner_join_cli.png)				
<br/><br/>

	{% highlight mysql %}
SELECT * FROM table_A INNER JOIN table_B ON table_A.name = table_B.name;				
	{% endhighlight %}


## Full Outer Join
Full outer join produces the set of all records in Table A and Table B, with matching records from both sides. If there is no match, the missing side will contain NULL. Outer joins, on the other hand, are for finding records that may not have a match in the other table. As such, you have to specify which side of the join is allowed to have a missing record.									

LEFT JOIN and RIGHT JOIN are shorthand for LEFT OUTER JOIN and RIGHT OUTER JOIN.										

Below is the basic OUTER JOIN syntax. In MySQL we do not have full outer joins because of the above stated reason.								

![Screenshot 5]({{ site.url }}/assets/imags/mysql_join/full_outer_join.png)						
<br/><br/>

	{% highlight mysql %}
SELECT * FROM table_A FULL OUTER JOIN table_B ON table_A.name = table_B.name;
	{% endhighlight %}


## Left Outer Join
Left outer join produces a complete set of records from Table A, with the matching records (where available) in Table B. If there is no match, the right side will contain null.								
![Screenshot 10]({{ site.url }}/assets/imags/mysql_join/left_outer_join.png)			
<br/><br/>

	{% highlight mysql %}
SELECT * FROM table_A LEFT OUTER JOIN table_B ON table_A.name = table_B.name;
	{% endhighlight %}

To produce the set of records only in Table A, but not in Table B, we perform the same left outer join, then exclude the records we don't want from the right side via a where clause.									

	{% highlight mysql %}
SELECT * FROM table_A LEFT OUTER JOIN table_B ON table_A.name = table_B.name WHERE table_B.id IS null;
	{% endhighlight %}

![Screenshot 6]({{ site.url }}/assets/imags/mysql_join/left_outer_join_cli.png)
<br/><br/>
## Cross Join
There's also a cartesian product or cross join, which as far as I can tell, can't be expressed as a Venn diagram. This joins "everything to everything", resulting in 4 x 3 = 12 rows, far more than we had in the original sets. If you do the math, you can see why this is a very dangerous join to run against large tables.

	{% highlight mysql %}
SELECT * FROM table_A CROSS JOIN table_B;
	{% endhighlight %}

![Screenshot 7]({{ site.url }}/assets/imags/mysql_join/cross_join_cli.png)
<br/><br/>

{% include JB/setup %}
