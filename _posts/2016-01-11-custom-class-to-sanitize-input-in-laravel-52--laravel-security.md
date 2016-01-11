---
layout: post
title: "Custom class to sanitize input in laravel 5.x [Laravel Security]"
description: "Using this custom class you can sanitize input in laravel 5.2 to prevent anyone from storing bad data in database."
category: tutorials
tags: ["laravel 5","xampp","PHP", "Security"]
change_frequency: "weekly"
image: tuts/laravel5/laravel5-bootstrap.png
priority: 0.8
date: 2016-01-11 08:28:44
---

First, we will create a folder */app/Common*. In this directory, we will place a Utility.php file which is our custom class containing the required methods to clean user input. This utility sanitizes all input provided by the user.

/app/Common/Utility.php      


{% highlight php %}
<?php
namespace App\Common;

use Illuminate\Support\Facades\Input;

class Utility {

  public static function stripXSS()
  {
    $sanitized = static::cleanArray(Input::get());
    Input::merge($sanitized);
  }

  public static function cleanArray($array)
  {
    $result = array();
    foreach ($array as $key => $value) {
        $key = strip_tags($key);
        if (is_array($value)) {
            $result[$key] = static::cleanArray($value);
        } else {
            $result[$key] = trim(strip_tags($value)); // Remove trim() if you want to.
        }
    }
    return $result;
  }
}
{% endhighlight %}


Now we can use it in any of our controller actions where we are submitting a form and saving some data to our database. For example, 

{% highlight php %}
<?php

use App\Common\Utility;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SomeController extends Controller {
	// some code...
	protected function saveForm(Request $request) {
		
		Utility::stripXSS(); //This will clean input
		//rest of your validation code goes below...
	}
}
{% endhighlight %}

Credits: This utility is based on work of [usman.it](http://usman.it/xss-filter-laravel/). I just made it compatible with 5.2.

{% include JB/setup %}
