---
layout: post
title: "Basic website in laravel 4.2 and styling it with twitter bootstrap"
description: "Let us see how we can quickly create a laravel 4 based static website and style it using twitter bootstrap"
category: tutorials
image: tuts/laravel/laravel-intro.png
tags: ["laravel","PHP","xampp"]
change_frequency: "weekly"
priority: 0.8
date: 2015-01-15 13:00:08
---

**This tutorial is for laravel 4. For laravel 5, visit [this](/pages/toc-laravel5.html)**

## Overview

This is a part of Laravel tutorial series and as I learn new things about laravel, i keep posting them here. Today I spent time learning about laravel views and routes. In previous tutorials, i have covered [how to setup laravel on lampp][3] and [how to use migrations and seeder][4]. You must read the setup tutorial before going on with this one. If you have already setup laravel, then you can continue reading this.           
          
By the end of this tutorial, we will have a 3 page website with a contact form.
            
We will just be going through the basics of the following topics in this tutorial:

* views - [Doc][1]
* routing - [Doc][2]
* blade templating - [Doc][5]

## Let's begin

> Note: This tutorial assumes that you have laravel setup already, if not then please set it up first.                               
                                                  
                                             
* First we create a basic layout. This basic layout is like a standard template for all the pages with header and footer. Go on and open up your */LARAVEL_PROJECT_ROOT/app/views* folder. In that create a file called *layout.blade.php*. Copy paste the below code in it. The code is pretty understandable as it is basic HTML mixed with laravel's blade templating code. For example,  <code>{% raw %}{{ HTML::style('css/style.css') }}{% endraw %}</code>  creates a <link> tag for including a css resource. Similarly, you can use  <code>{% raw %}{{ HTML::style('js/some.js') }}{% endraw %}</code>  to include a javascript/jquery resource. Please **note** that you need to create css and js folders inside your *LARAVEL_PROJECT_ROOT/public* folder. In those, you need to add the respective css and js files. In the following code, i have already added necessary twitter bootstrap code for you. `@yield('content')` defines an area (content) in the template. 
                                           
                                                  
        {% highlight html %}
<!doctype html>
<html lang="en">
<head>
	<meta charset= "UTF-8" >
	<title>My Website</title>
	
	<!-- CSS -->
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" >

	<%= HTML::style('css/style.css') %>

	<!-- js -->
	<script src= "https://code.jquery.com/jquery.js" ></script>
	<script src= "//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>

</head>
<body>
	<header>
		<nav class="navbar navbar-defualt" role="navigation">
			<div class="navbar-header">
				<ul class="nav navbar-nav">
					<li><a href="./">Home</a></li>
					<li><a href="./about">About</a></li>
					<li><a href="./contact">Contact</a></li>
				</ul>
			</div>
		</nav>
	</header>
	@yield('content')
</body>
</html>
        {% endhighlight %}


* Next we create content specific to our pages. We would want different content for Home, About and Contact. So we will use `@section('content')` to load these. Create a new file named *home.blade.php*, *about.blade.php* and *contact.blade.php* inside */LARAVEL_PROJECT_ROOT/app/views* folder just like you create layout.blade.php. But in this, we will only add sections and nothing else. Edit the content of sections according to your need.


  home.blade.php - `@extends('layout')` is what makes the template layout.blade.php reusable. `@section` defines the content in the area where we `@yield` in our layout. `@stop` defines the end of section.
                   
                   
        {% highlight html %}
@extends('layout')

@section('content')
<h1>Welcome to my website</h1>
<p>We are creating something beautiful today.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
@stop
        {% endhighlight %}


  about.blade.php - Similar to home page
                             
                     
        {% highlight html %}
@extends('layout')

@section('content')
<h1>About Us</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
@stop
        {% endhighlight %}



  contact.blade.php - The `Form` class provides us very easy to use syntax. We don't need to code any html for our form. The below code shows how to create a very basic form. The default action for the form is POST. Later you can also view source of the contact page to check the output code. Read more on Forms in the [laravel docs][2].
      

	{% highlight text %}
@extends('layout')

@section('content')
<h1>Fill this contact form to get in touch with us</h1>

<%= HTML::ul($errors->all(), array('class'=>'errors')) %>

<%= Form::open(array('url' => 'contact')) %>

<%= Form::label('Name') %>
<%= Form::text('name', 'Enter Your Name') %>
<%= Form::label('Subject') %>
<%= Form::text('subject', 'Enter Your Subject') %>
<%= Form::label('Message') %>
<%= Form::textarea('message', 'Enter Your Message') %>

<%= Form::submit('Submit') %>
<%= Form::close() %>
@stop
	{% endhighlight %}



* Now, open your */LARAVEL_PROJECT_ROOT/app/routes.php*. We will edit this file to register routes so that it can properly map our URLs. First one will be for our home page. Second will be an About Us page. On the third, we will have a contact form. The fourth one is use to handle the `post` action of the form. In this, we have set validators to check for data before submiting.


        {% highlight php %}
<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/
Route::get('/', function()
{
	return View::make('home');
});
Route::get('/about', function()
{
	return View::make('about');
});
Route::get('/contact', function()
{
	return View::make('contact');
});

Route::post('contact',function()
{
	$data = Input::all();
	$rules = array(
		'name' => 'required', 
		'subject' => 'required',
		'message' => 'required'
		);
	$validator = Validator::make($data, $rules);
	if($validator->fails()) {
		return
		Redirect::to('contact')->withErrors($validator)->withInput();
	}
	return 'Message has been sent. Thank you!';
});
        {% endhighlight %}

* Now first check if your lampp is running and then go to http://localhost/laravel-project/public and you will see your home page with links. You can try filling the contact form as well and submit it. It will work. If you leave even a single field blank, it will generate an error message. Right click > view source to view the generated source code. Lastly, experiment with it and [read the docs](http://laravel.com/docs/4.2).

That's all. See how simple it is to manage your project. Next we will see how to query database and update contact table in database.                     

[1]:http://laravel.com/docs/4.2/responses#views "Laravel Docs - Views"
[2]:http://laravel.com/docs/4.2/routing "Laravel Docs - Routing"
[3]:https://bhavyanshu.me/tutorials/setup-laravel-project-on-xampp-linux/01/12/2015 "Setup laravel on lamp"
[4]:https://bhavyanshu.me/tutorials/laravel-migrations-tutorial-how-to-manage-database/01/14/2015 "Migrations and seeding"
[5]:http://laravel.com/docs/4.2/templates "Blade Templating"

                        
[View more tutorials on laravel](/pages/toc-laravel.html)

{% include JB/setup %}
