---
layout: post
title: "How to authenticate users in laravel 5.0"
description: "In this laravel 5.0 tutorial, let us look at how to authenticate users."
category: tutorials
tags: ["laravel 5.0","xampp","PHP"]
change_frequency: "weekly"
image: tuts/laravel5/laravel5-bootstrap.png
priority: 0.8
date: 2015-09-24 07:22:06
---

> **Please note that this tutorial will not work with laravel > 5.2. This is an outdated tutorial.**

This tutorial assumes you have already setup laravel 5.0/5.1 project. If you have not, then refer to my [first tutorial](/tutorials/quickly-setup-laravel-5-on-linux/08/23/2015) of laravel 5.0/5.1 series on how to setup laravel & xampp on linux. This tutorial also assumes you have twitter bootstrap setup with your project. [Optional] If not, then refer to the [second tutorial](/tutorials/styling-laravel-5-based-app-with-twitter-bootstrap/08/23/2015). Come back here when you have setup everything and are ready to add authentication to your laravel 5.0/5.1 project.

#Let's begin

In laravel 5.0/5.1, the authentication has been made really simple. Earlier for laravel 4, I personally preferred to use *Confide* because it was simple to use and very flexible but laravel 5.0/5.1 makes it really easy and I don't need to use confide anymore. The authentication configuration file is located at *config/auth.php*. It also provides default migrations for user table. These are located in *database/migrations/*. For example,

	2014_10_12_000000_create_users_table
	2014_10_12_100000_create_password_resets_table

Now open the *_create_users_table file* and you will see two methods already in it. Nothing is to be changed in these files until and unless you want to add or edit any field that will be created in the database. Not much has changed in case of migrations. It is still very much the same as it was in laravel 4.x. So if you want to learn more on migrations and seeding, [refer to this post](/tutorials/laravel-migrations-tutorial-how-to-manage-database/01/14/2015). By default, you should have all the important fields like name, email, password, etc. Now let us use *artisan* to create these tables. Execute the following commands and you should get the output if you have configured your database correctly.

	$ sudo php artisan migrate:install

	Output : Migration table created successfully.

	$ sudo php artisan migrate

	Output:
	Migrated: 2014_10_12_000000_create_users_table
	Migrated: 2014_10_12_100000_create_password_resets_table

That's it. You can open your *phpmyadmin* and check the tables and their structure. Next step is how do we add data to table using forms. For this, we will first create our layouts using blade. Then we will write a controller to handle the actions of login and register. Also, in laravel, we make use of *HTTP Requests*. These let us validate the input provided by the users when they submit the form and also lets us define whether the users are authorized to make such requests or not.

> **Important Note**: By default, laravel has namespace set to "App" and mapped to *app/* directory. But you can change the namespace of all classes using one simple command. For example, in this tutorial, I have changed namespace for the app using command `sudo php artisan app:name Learnlaravel`, where the new namespace is "LearnLaravel".

## Views

Now moving on, first create the following blade layouts. In laravel 5, the views have been moved to *app/resources/views* directory. In that, create the following files. Please follow the directory structure otherwise you will have to make changes in routes as well.

**baselayout.blade.php** (In app/resources/views/) - This is our parent layout. This uses twitter bootstrap. Learn how to integrate twitter bootstrap with your laravel project in this [post](/tutorials/styling-laravel-5-based-app-with-twitter-bootstrap/08/23/2015). If you just want to try it out, you can use CDN bootstrap and jquery. Just remove Html::style & Html::script instances in <head> section and uncomment the commented part.

	{% highlight html %}
<!DOCTYPE html>
<html>
    <head>
        <title>@yield('title')</title>

        {!! Html::style('css/app.css') !!}
        {!! Html::style('css/style.css') !!}

        {!! Html::script('js/jquery.min.js') !!}
        {!! Html::script('js/bootstrap.min.js') !!}

        <!-- Bootstrap and jquery cdn - Uncomment this to use CDN.
		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
		-->
    </head>

    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Project name</a>
            </div>
            <div id="navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li><a href="">Home</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Item</a></li>
                </ul>
            </div><!--/.nav-collapse -->
        </div>
    </nav>

    <body>
        <div class="container">
            @yield('content')
        </div><!-- /.container -->
    </body>
</html>
	{% endhighlight %}


**login.blade.php**  (In app/resources/views/users directory) - Contains the login form.

	{% highlight html %}
@extends('baselayout')

@section('title')
	Login
@stop

@section('content')

<div class="row">
	<div class="col-md-6">
		<h2>Log in</h2>
		<p>Hi, here you can login to your account. Just fill in the form and press Sign In button.</p>
		<br>
		{!! Html::ul($errors->all(), array('class'=>'alert alert-danger errors')) !!}

		{!! Form::open(array('url' => 'users/login','class'=>'form')) !!}

		<br>{!! Form::label('email', 'E-Mail Address') !!}
		{!! Form::text('email', null, array('class' => 'form-control','placeholder' => 'example@gmail.com')) !!}
		<br>{!! Form::label('password', 'Password') !!}
		{!! Form::password('password', array('class' => 'form-control')) !!}
		<br>
		{!! Form::submit('Sign In' , array('class' => 'btn btn-primary')) !!}

		{!! Form::close() !!}
		<br>
	</div>
</div>

@stop
	{% endhighlight %}

**register.blade.php** (In app/resources/views/users directory)  - Contains the register form.

	{% highlight html %}
@extends('baselayout')

@section('title')
    Register
@stop

@section('content')

<div class="row">
    <div class="col-md-6">
        <h2>Register to create an account</h2>
        <p>Hi, here you can create a new account. Just fill in the form and press sign up button.</p>
        <br>
        {!! Html::ul($errors->all(), array('class'=>'errors')) !!}

        {!! Form::open(array('url' => 'users/register','class'=>'form')) !!}

        <br>{!! Form::label('name', 'Username') !!}
        {!! Form::text('name', null, array('class' => 'form-control','placeholder' => 'kenny')) !!}
        <br>{!! Form::label('email', 'E-Mail Address') !!}
        {!! Form::text('email', null, array('class' => 'form-control','placeholder' => 'example@gmail.com')) !!}
        <br>{!! Form::label('password', 'Password') !!}
        {!! Form::password('password', array('class' => 'form-control')) !!}
        <br>
        {!! Form::label('password_confirmation','Confirm Password',['class'=>'control-label']) !!}
        {!! Form::password('password_confirmation',['class'=>'form-control']) !!}
        <br>
        {!! Form::submit('Sign Up' , array('class' => 'btn btn-primary')) !!}

        {!! Form::close() !!}
        <br>
    </div>
</div>

@stop
	{% endhighlight %}

**dashboard.blade.php** (In app/resources/views/users directory)  - Once users are logged in, they will get redirected to this page which is only accessible to authenticated users. {{ Auth::user()->name }} displays the name of the logged in user. The *name* value corresponding to the authenticated user is stored in database when they register.

	{% highlight html %}
@extends('baselayout')

@section('title') Dashboard @stop

@section('content')
<div class="row">
	<h1>Dashboard</h1>
	<div class="well">
		<p>Welcome <strong>{{ Auth::user()->name }}</strong></p>
	</div>
</div>
@stop
	{% endhighlight %}

That's it. We have our basic layouts ready. Next, we setup routes.

-------------------------------------------------------------------------------------------------

## Routes
Open *app/Http/routes.php*, and in that add the following

	{% highlight php %}
<?php
/* User Authentication */
Route::get('users/login', 'Auth\AuthController@getLogin');
Route::post('users/login', 'Auth\AuthController@postLogin');
Route::get('users/logout', 'Auth\AuthController@getLogout');

Route::get('users/register', 'Auth\AuthController@getRegister');
Route::post('users/register', 'Auth\AuthController@postRegister');

/* Authenticated users */
Route::group(['middleware' => 'auth'], function()
{
    Route::get('users/dashboard', array('as'=>'dashboard', function()
	{
	return View('users.dashboard');
	}));
});
	{% endhighlight %}

-------------------------------------------------------------------------------------------------

## Controller

Next, we move on to the controller. In laravel 5, you are provided with a default AuthController.php in *app/Http/Controllers/Auth/*. We will edit it to handle login, register and logout actions that we have defined in routes.php.

AuthController.php

	{% highlight php %}
<?php

// namespace ....

// use ...

/* IMPORTANT!
   change namespace "Learnlaravel" in below statements to whatever you have set.
   If not set then change it to "App" otherwise it will give an error
   stating LoginRequest not found. */

use Illuminate\Contracts\Auth\Guard;
use Learnlaravel\Http\Requests\Auth\LoginRequest;
use Learnlaravel\Http\Requests\Auth\RegisterRequest;

class AuthController extends Controller
{

    /**
     * User model instance
     * @var User
     */
    protected $user;

    /**
     * For Guard
     *
     * @var Authenticator
     */
    protected $auth;

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct(Guard $auth, User $user)
    {
        $this->user = $user;
        $this->auth = $auth;
        $this->middleware('guest', ['except' => 'getLogout']);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }

    /* Login get post methods */
    protected function getLogin() {
        return View('users.login');
    }

    protected function postLogin(LoginRequest $request) {
        if ($this->auth->attempt($request->only('email', 'password'))) {
            return redirect()->route('dashboard');
        }

        return redirect('users/login')->withErrors([
            'email' => 'The email or the password is invalid. Please try again.',
        ]);
    }

    /* Register get post methods */
    protected function getRegister() {
        return View('users.register');
    }

    protected function postRegister(RegisterRequest $request) {
        $this->user->name = $request->name;
        $this->user->email = $request->email;
        $this->user->password = bcrypt($request->password);
        $this->user->save();
        return redirect('users/login');
    }

    /**
     * Log the user out of the application.
     *
     * @return Response
     */
    protected function getLogout()
    {
        $this->auth->logout();
        return redirect('users/login');
    }
}
	{% endhighlight %}

That's it. You have the controller setup to handle login, register and logout actions. Now, the only thing missing is LoginRequest and RegisterRequest classes. We will create them now.

-------------------------------------------------------------------------------------------------

## Requests

In your projects root, execute

	$ php artisan make:request 'Auth\RegisterRequest'
	Output : Request created successfully.

	$ php artisan make:request 'Auth\LoginRequest'
	Output : Request created successfully.

Now it will automatically create the two required classes in *App/Http/Requests/Auth/* and will add template methods to them. We just have to edit the methods now. In both, set `authorize()` to return true. Like,

	{% highlight php %}
<?php
//......
public function authorize()
{
	return true;
}
	{% endhighlight %}

And in **RegisterRequest.php**, edit `rules()` as,

	{% highlight php %}
<?php
//......
public function rules()
    {
        return [
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:10',
        ];
    }
    {% endhighlight %}

In **LoginRequest.php**, edit `rules()` as,

	{% highlight php %}
<?php
//......
public function rules()
    {
        return [
            'email' => 'required',
            'password' => 'required',
        ];
    }
	{% endhighlight %}


Next, we need to edit *app/Http/Middleware/Authenticate.php* which handles redirection of user who is not logged in and is trying to access a page that requires authentication. Open that file and edit `handle()` function,

	{% highlight php %}
<?php
//......
public function handle($request, Closure $next)
{
    if ($this->auth->guest()) {
        if ($request->ajax()) {
            return response('Unauthorized.', 401);
        } else {
            return redirect()->guest('users/login'); //Redirect to login page if no auth!
        }
    }
    return $next($request);
}
	{% endhighlight %}

That's all. You can now test it. On project root, execute `php artisan serve` and try to open *http://localhost:8000/users/dashboard*. You will be redirected to login page. To open register page, visit *http://localhost:8000/users/register* and submit the form. Check the database to verify. That's all there is to user authentication in laravel 5.0/5.1.

{% include JB/setup %}
