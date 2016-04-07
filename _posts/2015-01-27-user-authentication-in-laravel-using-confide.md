---
layout: post
title: "User authentication in laravel 4.2 using Confide"
description: "Learn how to create basic user authentication system in laravel 4. In this we will use the confide package. Since user authentication is a basic requirement in any modern day application."
category: tutorials
image: tuts/laravel/laravel-intro.png
tags: ["laravel","PHP","xampp"]
change_frequency: "weekly"
priority: 0.8
date: 2015-01-27 03:24:34
---

**This tutorial is for laravel 4**. For laravel 5 user authentication tutorial, [refer to this](/tutorials/easy-user-registration-and-authentication-in-laravel-5/09/24/2015)

## Overview

Since user authentication is a basic requirement in any modern day application. I will show you in this tutorial how simple it is to in laravel since we now have <a href="https://github.com/Zizaco/confide" target="_blank">Confide</a> built by [Zizaco](http://zizaco.net/). Though there are instructions in the *readme.md* of the package and I would totally recommend you to read that but for the purpose of this tutorial, I am gonna tell you how to set it up in your laravel project easily.
We require a working laravel setup. If you don't have this, follow [this][3] tutorial first. Then you can come back here later.

## Let's get started

First we will see how to setup confide.

Open up your *composer.json* file in your project root and add the following

	"zizaco/confide": "~4.0@dev"

In your config/app.php add 'Zizaco\Confide\ServiceProvider' to the end of the providers array like shown below

	{% highlight php %}
'providers' => array(

    'Zizaco\Confide\ServiceProvider',

),
	{% endhighlight %}

At the end of config/app.php add 'Confide' => 'Zizaco\Confide\Facade' to the aliases array like shown below

	{% highlight php %}
'aliases' => array(

    'Confide'    => 'Zizaco\Confide\Facade',

),
	{% endhighlight %}

Run the Composer update

	$ composer update

Generate the Confide migration & migrate

	$ php artisan confide:migration
	$ php artisan migrate

It will setup a table containing email, password, remember_token, confirmation_code and confirmed columns automatically. Make sure you have made the changes in config/mail.php and your smtp configurations are correct. Now it is time to include it in our app.

Remove contents of your models/user.php file with the below ones

	{% highlight php %}
<?php
use Zizaco\Confide\ConfideUser;
use Zizaco\Confide\ConfideUserInterface;

class User extends Eloquent implements ConfideUserInterface
{
	use ConfideUser;
}
	{% endhighlight %}

Confide comes with generator scripts for controllers and routes. To create the UsersController.php and to register the routes run the following:

	$ php artisan confide:controller
	$ php artisan confide:routes

Now just refresh,

	$ composer dump-autoload

To test whether we have setup authentication, we will view it at localhost:8000/users/create

	$ php artisan serve

Similarly, routes have been added for login at users/login. So you can view that too at *http://localhost:8000/users/login*. That's ugly right? No it's not. It's actually functional. The forms are ugly. In the previous tutorial, I showed how you can use twitter bootstrap. To know how to create a view & style it with twitter bootstrap, [read this tutorial](//bhavyanshu.me/tutorials/basic-website-in-laravel-styling-it-with-twitter-bootstrap/01/15/2015) first. Now let us test authentication.

Go on and open up your */LARAVEL_PROJECT_ROOT/app/views* folder. In that create a file called **layout.blade.php**. Also, you must have a **home.blade.php** in */LARAVEL_PROJECT_ROOT/app/views/users/* folder which will be the view that will be loaded when your user logs in. Now in home.blade.php file add

              {% highlight text %}                 

@section('content')
@if(Auth::check()) <h2> Hi, <%= Auth::user()->username %> </h2>
@stop
        {% endhighlight %}

Ofcourse, this will print "Hi, your_username" whenever user logs in. But first we need to setup controller, routes and filters. Filters are extremely useful components of laravel. Like for example, they can be used to check whether the user is logged in or not before loading a view and the decision can be made based on it. Let us see how this works. Open up your */LARAVEL_PROJECT_ROOT/app/filters.php* file and in that go to line ** Authentication Filters**. Change the code block for `auth` filter to

	{% highlight php %}
Route::filter('auth', function()
{
	if (Auth::guest())
	{
		if (Request::ajax())
		{
			return Response::make('Unauthorized', 401);
		}
		else
		{
			return Redirect::guest('users/login');
		}
	}
});
	{% endhighlight %}

What the above does is basically, it sees if the user is authenticated or not and if it finds that if user is not authenticated, it will redirect him to 'users/login' so that the user can login first before viewing the page. But wait, it will not work simply by the filter itself. We need to specify on which routes we want this `auth` filter to be applied. So let's do that now. Open up your */LARAVEL_PROJECT_ROOT/app/routes.php* file and add

	{% highlight php %}
Route::get('/dashboard', array('before' => 'auth', function()
{
	return View::make('users.home'); //load view home.blade.php present in view/users/ folder after authentication check.
}));
	{% endhighlight %}

That's it. It looks great. What we did here is basically applied a filter to a route. Now there is one more way to do this. Since we will be needing `auth` filter on many routes in our application, it is not a good idea to repeat same code again and again. Well, laravel has a way to do this. This is a sample from one of my applications, you can take a look at this.

	{% highlight php %}
Route::group(['before' => 'auth'], function()
{
    	Route::post('users/passwordupdate', 'UsersController@passwordupdate');
	Route::get('/profile/edit',array('as'=>'profileditform','uses'=>'ProfilesController@edit'));
	Route::post('profile/update/{id}',array('as'=>'profileupdate', 'uses'=>'ProfilesController@update'));
	Route::post('/upload/image','ProfilesController@postUpload');
});
	{% endhighlight %}

As you see, these are all routes which require authentication. So we used `Route::group` instead of repeating same code again and again. Simple, right? Moreover, this shows how we can use it with controller actions as well. You will also see all the routes created by confide as well. Now to test if it all works well, go to http://localhost:8000/users/create and create a new user. Once done, login. Now test out by going to http://localhost:8000/dashboard and it should display "Hi, Username." If you see it, then it's all good. If you don't, then you can look up where it went wrong. You must have seen that by default, when you login, it takes you to the root http://localhost:8000/. How does it do that? Well, here is where your controller kicks in.

Open up /LARAVEL_PROJECT_ROOT/app/controllers/UsersController.php file. In that you will see the actions used in the routes.php by the preset routes of confide. Like `login()`, `doLogin()`, `create()` etc. The doLogin() is the one that kicks in whenever user submits the login form. So let us change it. Find your `doLogin()` method and in that `if ($repo->login($input)) {` and change its `Redirect` to `return Redirect::intended('/dashboard');`. See **/dashboard** is the one our route points to. So now if you will login, you will be taken directly to your dashboard. There is a lot of code in this Controller. We can't cover all that here. Maybe sometime in [coming tutorials](/pages/toc-laravel.html) we will. I hope you have your user authentication ready by the end of this.

That's all. I will update these tutorials as per suggestions in comments. Sorry, if i have missed out on anything. <a href="http://laravel.com/docs/4.2/" target="_blank">Read the docs</a> for more information.

[1]:http://laravel.com/docs/4.2/responses#views "Laravel Docs - Views"
[2]:http://laravel.com/docs/4.2/routing "Laravel Docs - Routing"
[3]:https://bhavyanshu.me/tutorials/setup-laravel-project-on-xampp-linux/01/12/2015 "Setup laravel on lamp"
[4]:https://bhavyanshu.me/tutorials/laravel-migrations-tutorial-how-to-manage-database/01/14/2015 "Migrations and seeding"


[View more tutorials on laravel](/pages/toc-laravel.html)

{% include JB/setup %}
