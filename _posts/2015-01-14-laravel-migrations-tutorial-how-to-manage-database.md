---
layout: post
title: "Laravel 4.2 Migrations tutorial - How to manage database"
description: "An introductory guide to laravel 4 migration and seeding. In this tutorial, i have shown the use of migration and seeding with a very basic example code."
category: tutorials
image: tuts/laravel/laravel-intro.png
tags: ["laravel","PHP","xampp"]
change_frequency: "weekly"
priority: 0.8
date: 2015-01-14 14:20:08
---

# Overview

> Migrations are a type of version control for your database. They allow a team to modify the database schema and stay up to date on the current schema state. ~ [Laravel 4.2 Docs](http://laravel.com/docs/4.2/migrations)

Well, by now I hope you have setup laravel and are able to run it on xampp. If not, then view [previous tutorial][1] on how to set things up. In this tutorial, I will show you how powerful laravel migrations are. Traditionally, you had to write an SQL query for PHP to manage databases. But using laravel migrations, you won't have to write SQL queries in php. Laravel will handle everything for you. Migrations are powerful because they allow you to put milestones whenever your database is modified. For instance, if you want to add a new table to the database, make a migration. If you want to drop a table, then just rollback your migration. Similarly, you can modify individual columns, rows etc.

## Migrate - [Docs][2]

* First of all, you need to create a database. Go to your phpmyadmin, create a new database and edit your */LARAVEL_PROJECT_ROOT/local/database.php* with correct mysql configuration.

* Once done, open your terminal in LARAVEL_PROJECT_ROOT and type,

        php artisan migrate:install

* If you see an error, please refer to [previous tutorial][1] on how to configure lampp on linux. If there is no error, then open your phpmyadmin, go to your database and check if there is a table added by the name **migrations**. If it is created, then it is perfect.

* Next, we will make a users table where we will store some dummy data as well. All using php. No SQL query required. Open terminal and type,

        php artisan migrate:make users

* Once, it is done, go to *LARAVEL_PROJECT_ROOT/app/database/migrations* and in that there will be a file like ** ****_**_**_users ** or something like this. Open it and you will find two methods, namely `up()` and `down()`. Let us first understand what are these and then you can edit the following PHP code according to your need.

  The `up()` method is called when you execute `php artisan migrate` in terminal. It is for executing the actual migration code which is defined inside `up()`. The `down()` method defines what `php artisan migrate:rollback` needs to do. That is, it reverts the last changes. So, you can compare this to rollback a commit in git. If in case, you found that something broke after the migration, you can easily revert it back. This is a very useful technique.

        {% highlight php %}
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Users extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users',function($table)
		{
			$table->increments('id'); //Autoincremented primary key
			$table->string('username');
			$table->string('password');
			$table->text('bio');
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
		Schema::drop('users'); //Drop table `users`
	}

}
        {% endhighlight %}

* Just copy/paste the above code in your ** ****_**_**_users ** file. The above code is pretty much self explanatory. As you see, it is such an easy syntax. Now we execute another command, to actually migrate.

        php artisan migrate

* Let it execute and once done, go on and check your phpmyadmin. There will be a table named *users* in the database. It will be an empty table though. So, we will add some dummy data using migrations. Again execute,

        php artisan migrate:make dummy_users

* Just like before, go to *LARAVEL_PROJECT_ROOT/app/database/migrations*, and open the ** ****_**_**_dummy_users ** file. There will be `up()` and `down()` methods here too. The only difference this time would be that we will need to query the table and for that we cannot use **Schema**. We will need to use **DB**. Let us look at the below code.

        {% highlight php %}
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DummyUsers extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		DB::table('users')->insert(
			array(
			'username'=>'jacksparrow',
			'bio'=>'Jack Sparrow likes rum',
			'password' => Hash::make('rum'), //By default, uses bcrypt algo
			'created_at'=>date('Y-m-d H:m:s'),
			'updated_at'=>date('Y-m-d H:m:s')
			)
			);
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		DB::table('users')->where('username','=','jacksparrow')->delete(); //Deletes the user from the database.
	}

}
        {% endhighlight %}

* The above code works similar to the how the users table was created. The only thing different is that in this we are adding data to the columns. If you want to add more dummy data to the table, just simply duplicate `DB:table(....);` code and change the values in it. Now to call these methods, we again execute

        php artisan migrate

* Now check your phpmyadmin and you can see the values are inserted in the table. Powerful, right? Don't forget to try out `php artisan migrate:rollback` to undo the changes.

> Even though migrations are useful and all but we won't be using migrations to add data to our database. Migrations are mostly used to create tables and modify columns and other table properties. Moreover, if you use migrations, your data will interfere with production data. Hence, it is a bad practice to use migrations for insert. To add dummy data, we use another powerful technique of laravel, which is known as **seeding**. This is mostly used when you are running tests on your development environment.

## Seeder

* We will not use artisan for this. We will do it manually. Go to */app/database/seeds/* folder. Create new file called **UsersSeeder.php**. In that, add below code

        {% highlight php %}
<?php

class UsersSeeder extends Seeder
{

public function run()
{
    DB::table('users')->delete();
    DB::table('users')->insert(array(
			'username'=>'jacksparrow',
			'bio'=>'Jack is awesome',
			'password' => Hash::make('secret'),
			'created_at'=>date('Y-m-d H:m:s'),
			'updated_at'=>date('Y-m-d H:m:s')
			));
}

}
        {% endhighlight %}


* Inside the *LARAVEL_PROJECT_ROOT/app/database/seeds/DatabaseSeeder.php*, add the line `$this->call('UsersSeeder');` immediately after the line `Eloquent::unguard();` inside the `run()` method.

* Before seeding, let us first reset migrations.

        php artisan mirate:reset

  and now,

        php artisan migrate

* Once we’re done migrating, we can inject that user into our table,

        php artisan db:seed

So, in the end I would like to point out one more advantage of using migrations and seed. If ever, I want to distribute the app as open source project, I won't have to provide a mysql export. The migrations and seeding will handle whosoever builds my app on their platform. This is the most impressive thing about laravel. So when you want to view some laravel based project, simply edit the *LARAVEL_PROJECT_ROOT/app/config/database.php* file to include your mysql settings. Then run two commands, one to migrate `php artisan migrate` and then run `php artisan db:seed`. But is this still a lot of work? No problem. There is a command that does both the things in one go. Yes, it will reset, then migrate and finally seed your database.

       php artisan migrate:refresh --seed

That's all. Please do refer to the [docs][2] for more information.

[1]:https://bhavyanshu.me/tutorials/setup-laravel-project-on-xampp-linux/01/12/2015 "Setup laravel on lampp"
[2]:http://laravel.com/docs/4.2/migrations "Laravel Docs - Migrations"


[View more tutorials on laravel](/pages/toc-laravel.html)

{% include JB/setup %}
