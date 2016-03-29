---
layout: post
title: "Learn how to use PDO in PHP in this simple tutorial - Preventing SQL Injection attacks"
description: "This simple tutorial can teach you how to make your PHP web applications more secure using prepared statements and PDO."
category:
tags: ['PHP','MySQL']
change_frequency: "weekly"
priority: 0.4
date: 2014-02-20 14:25:50
---

#Why PDO is required?

First thing first. Let us understand the importance of PDO and why we must not use `mysql_*` & `mysqli` anymore.

>The `mysql_*` functions are getting old. For a long time now `mysql_*` has been at odds with other common SQL database programming interfaces. It doesn't support modern SQL database concepts such as prepared statements, stored procs, transactions etc... and it's method for escaping parameters with mysql_real_escape_string and concatenating into SQL strings is error prone and old fashioned. The other issue with `mysql_*` is that it has had a lack of attention lately from developers, it is not being maintained... which could mean things like security vulnerabilities are not getting fixed, or it may stop working altogether with newer versions of MySQL. One more reason to use the all new PDO is that the *mysql_ functions are all deprecated*.
PDO also **has different drivers for different SQL database vendors** which will allow you to easily use databases by other vendors without having to relearn a different interface. (though you will have to learn slightly different SQL probably).
Instead of concatenating escaped strings into SQL, **in PDO you bind parameters** which is an easier and cleaner way of securing queries. Binding parameters also allow for a performance increase when calling the same SQL query many times with slightly different parameters. PDO also **has multiple methods of error handling**. The biggest issue I have seen with `mysql_*` code is that it lacks consistent handling. With **PDO in exception mode, you can get consistent error handling** which will end up saving you loads of time tracking down issues.


# How to PDO?

Now that we know why we should learn and use PDO, let us begin with some coding.

## Creating a PDO object

    {% highlight php %}
    <?php
    $dbInfo = new PDO('mysql:host=localhost;dbname=testdb;charset=utf8', 'username', 'password'); //Create a new PDO object
    /*
     PDO's constructor takes at most 4 parameters : String of options that tells PDO which driver to use, username, password, and an array of driver options [Optional Param].
    */

    //Not closing PHP tag...

    {% endhighlight %}


## Putting PDO in Exception Mode


Basically the setAttribute() method helps in enabling various debug and error handling modes for PDO. To understand the full list of errors and error handling, read this [manual page](http://www.php.net/manual/en/pdo.error-handling.php).

    {% highlight php %}
    <?php
    $dbInfo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $dbInfo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    /*
    Used to enable various attributes for PDO
    PDO::__construct will always throw a PDOException if the connection fails.
    */
    //Closing PHP tag now
    ?>

    {% endhighlight %}



## Executing a Query using PDO



We have learned how to connect to the MySQL DB using PDO. Now we must understand how to use prepared statements, exception handling and query the MySQL database. Just follow the comments in the code below.

    {% highlight php %}
    <?php
    $dbInfo = new PDO('mysql:host=localhost;dbname=testdb;charset=utf8', 'username', 'password'); //Create a new PDO object
    $dbInfo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $dbInfo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

    /*
    Now we use a try catch block to handle exceptions gracefully
    */
    try {
    $statement = $dbInfo->query("SELECT * FROM table");

    //See the note after this code to know more on fetch modes.
    while($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        echo $row['field1'].' '.$row['field2'];
        //Printing the elements of the table where field represent column names
    }
    }
    catch(PDOException $ex) {
     echo "Something messed up!"; //Some user friendly message
    write_error_to_log($ex->getMessage()); //This is a function which you can create yourself to write errors to an external log file.
    }
    ?>
    {% endhighlight %}

>**NOTE**: *fetch()* & *fetchALL()* with *FETCH_ASSOC* tells PDO to return the rows as an associative array with the field names as keys. Other fetch modes like PDO::FETCH_NUM returns the row as a numerical array. The default is to fetch with PDO::FETCH_BOTH which duplicates the data with both numerical and associative keys. It's recommended you specify one or the other so you don't have arrays that are double the size! PDO can also fetch objects with PDO::FETCH_OBJ, and can take existing classes with PDO::FETCH_CLASS. It can also bind into specific variables with PDO::FETCH_BOUND and using bindColumn method.



## Using Prepared Statements and binding variables to query

    {% highlight php %}

    <?php

    /*
The prepare() method sends the query to the server, and it's compiled with the '?' placeholders to be used as expected arguments. The execute method sends the arguments to the server and runs the compiled statement. Since the query and the dynamic parameters are sent separately, there is no way that any SQL that is in those parameters can be executed... so NO SQL INJECTION can occur! This is a much better and safer solution than concatenating strings together.
     */
    $statement = $dbInfo->prepare("SELECT * FROM table WHERE id=? AND name=?");
    $statement->execute(array($id, $name)); //Common Way, Everything is string here

    /*
    ANOTHER METHOD
    Instead of passing them as an array, which binds each parameter as a String type, you can use bindValue and specify the type for each parameter:
    $statement->bindValue(1, $id, PDO::PARAM_INT);
    $statement->bindValue(2, $name, PDO::PARAM_STR);
    $statement->execute();
    */

$rows = $statement->fetchAll(PDO::FETCH_ASSOC);

    {% endhighlight %}

That's all for PDO. I hope you start applying it in all your PHP web applications to prevent them from getting hacked by SQL Injection attacks.


{% include JB/setup %}
