---
layout: post
title: "Use of foreign keys and defining relationships in laravel 4.2 - Users and Profiles example"
description: "This tutorial shows how you can use foreign keys using relationships in laravel 4. In this I have used a popular example of users and their profile information being in two separate tables with foreign key referencing a primary key in another."
category: tutorials
image: tuts/laravel/laravel-intro.png
tags: ["laravel","PHP","xampp"]
change_frequency: "weekly"
priority: 0.8
date: 2015-01-27 14:08:23
---

**This tutorial is for laravel 4**

## Overview

This tutorial assumes you have already setup a laravel app. If not then please go through these [tutorials](/pages/toc-laravel.html) first. 
We have already seen how powerful are laravel's views, controllers, routes, models & filters. Now we will look at how we can define relations between our models. In the previous tutorial we used Confide to create user authentication system. In that we had a **users** table. So we won't be going through all that again. This tutorial is specific to defining relationships. We will use a project example to create all this. Sit tight and code along. It will be a lot easier. 



Currently after you are done setting up confide, you will have a **users** table. Now we will create a **profiles** table which will have all the extra information about the user. **users** table has a primary key set as *id*. So in **profiles** table we will create a foreign key *user_id* and additional columns like bio, gender, address etc. The *user_id* (FK) will reference the *id* (PK).

So go on and create a new migration.

	$ php artisan migrate:make profiles

This will create a new migrations file by the name timestamp_profiles.php in the folder */LARAVEL_PROJECT_ROOT/app/database/migrations/*. Now in this write the following code.


	{% highlight php %}
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Profiles extends Migration {


	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('profiles', function($table)
		{
			$table->increments('pid');
			$table->integer('user_id')->unsigned();
			$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
			$table->string('first_name')->nullable();
			$table->string('last_name')->nullable();
			$table->string('address')->nullable();
			$table->string('gender')->nullable();
			$table->string('bio')->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('profiles');
	}

}
	{% endhighlight %}

If you followed my tutorial on migrations you would be familiar with `up()` and `down()` functions. There are mainly two important things to look in this. First is the code `$table->integer('user_id')->unsigned();` and second is the `$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');`. To make sure it is exactly same as the primary key of users table, we need to make sure we set it as an unsigned integer as well. If you set is as something else, it will generate a constraint error. Let's break the second one in parts :

1. The `foreign('user_id')->references('id')->on('users')` says that the *user_id* column is the foreign key that references primary key *id* in the users table.
2. The `onDelete('cascade')` removes corresponding row from users table as well. Automatically? Yay! But wait this is not it. We need something else too.


First open your */LARAVEL_PROJECT_ROOT/app/models/* folder and create a file Profile.php. This will be our new model file. Add following contents to it.

	{% highlight php %}
<?php

Class Profile extends Eloquent
{
	public function user()
	{
		return $this->belongsTo('User');
	}

}
	{% endhighlight %}

In this all we are doing is telling laravel that there is a relationship in between profile & user model and it says that profile belongs to the user. But how many? 1:N? N:1? N:N? What do we do about that? Let's see.

Go to your */LARAVEL_PROJECT_ROOT/app/models/User.php* file and in that add the following method in your User class.

	{% highlight php %}
public function profile()
    {
    	return $this->hasOne('Profile','user_id');
    }
	{% endhighlight %}



This is where we define that the relationship between profile and a user 1:1 and laravel must respect this. In this `hasOne('Profile','user_id')` has the name of the model as its first argument and second argument is an optional argument but is the foreign key. By default it will use whatever column is defined as a FK in our database. Now it is time to modify *UsersController.php* file in */LARAVEL_PROJECT_ROOT/app/controllers/* folder. This comes as a preset with Confide. We will modify this to create a Profile for a user when he/she registers on our site. By default, confide will just create it in our users table. But with just 3 lines of code, we can tell it to create a new row with **user_id** same as **id**. Open that file and look for a line `if ($user->id) {` inside the function `store()`. In that add the three lines of code that saves a profile too.



	{% highlight php %}
    public function store()
    {
        $repo = App::make('UserRepository');
        $user = $repo->signup(Input::all());

        if ($user->id) {
            $profile = new Profile;
            $profile->user()->associate($user);
            $profile->save();
            if (Config::get('confide::signup_email')) {
            .....
	{% endhighlight %}

Now it is time to roll this migration and let it create a **profiles** table in our database. Then we will create a new user through *http://localhost:8000/users/create* which is the default route used by confide to load the registration form view. If you have modified it, please use that. So run the following to migrate and check your database for profiles table.

	$ php artisan migrate:refresh


Also using profile fields in blade template is really easy. I wrote a ProfilesController.php and in that added a show() function which displays user his/her own profile. 



	{% highlight php %}
public function show()
{
	$user = User::with('profile')->find(Auth::user()->id); //Show authenticated user own profile details.
	$profile = $user->profile;
	//dd($profile); //Just for debugging
    	return View::make('users.viewprofile')->with('profile', $profile)->with('user',$user);
}
	{% endhighlight %}

Now you can echo any profile value like `$profile->bio` to load bio column data for the authenticated user. In blade template you can do `{{ $profile->first_name or 'No details found.' }}` to display information from first_name column for authenticated user. Ofcourse you can modify it according to your need. I hope it is easy to understand.

That's all for now. I will update these tutorials as per suggestions in comments. Sorry, if i have missed out on anything. <a href="http://laravel.com/docs/4.2/" target="_blank">Read the docs</a> for more information.

[1]:http://laravel.com/docs/4.2/responses#views "Laravel Docs - Views"
[2]:http://laravel.com/docs/4.2/routing "Laravel Docs - Routing"
[3]:https://bhavyanshu.me/tutorials/setup-laravel-project-on-xampp-linux/01/12/2015 "Setup laravel on lamp"
[4]:https://bhavyanshu.me/tutorials/laravel-migrations-tutorial-how-to-manage-database/01/14/2015 "Migrations and seeding"

[View more tutorials on laravel](/pages/toc-laravel.html)


{% include JB/setup %}
