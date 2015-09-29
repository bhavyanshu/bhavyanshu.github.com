---
layout: post
title: "Writing linux command line applications and handling arguments"
description: "This isn't much of a tutorial. In this post i will be talking about how to write linux applications and how to handle the argument list."
tags: ["linux"]
change_frequency: "weekly"
priority: 0.8
---

#Argument List

If you have studied c/c++, then you must know that you always define <code>main()</code> function because you know the first function that takes control of the program in recognized by that particular name only. In linux, we can pass **arguments** in command line execution. For example, the popular git syntax for making commits and appending messages to the commit is <code>git commit -m "Your commit message"</code>. The additional information you supply in the command line while running the program are called command line arguments. These constitute the program's argument list. Let us look at another example. <code>ls -l</code> command is used to list the files. The <code>-l</code> in this is the argument. Now if you have been coding on windows Turbo C/C++ compiler, then you must have never tried **argv** & **argc** parameters in the <code>main()</code> function.  The first parameter **argc** is an int value that is set to the number of items in the arg list. The argv is an array of character pointers.								

Let us look at an example code on how to pass these important parameters to build a basic GNU/Linux command line application in C.				

	{% highlight c %}
#include <stdio.h>

int main(int argc, char* argv[]) //Main defined
{
	printf("Program Name: %s\n",argv[0]); //Name of the command
	if(argc>1){ //Check if there were actually any arguments given.
		printf("Arguments: %d\n",argc-1); //Number of arguments
		int i;
		printf("The arguments are:\n");
		for(i=0;i<argc;i++) //Let us loop through the argument array
			printf("%s\n",argv[i]);
	}
return 0;
}
	{% endhighlight %}

Well i hate to admit but providing arguments can be a bit annoying. For example, if we have a program that accepts two type of options/flags, short (With one hyphen, quick to type,hard to remember) and long (With two hyphens, time consuming to write, easy to remember), the GNU C lib provides a function that makes it easier for the program to understand both type of options. The function is <code>getopt_long</code> from <code>getopt.h</code> header file. To use this, you need two data structures. First for the character string containing the valid short options represented by a single char. For the long one, you need to create <code>option</code> array of type struct. It would look somewhat like this							

	{% highlight c %}
const struct option long_options[] = {
	{ “help”,0, NULL, ‘h’ }, //First field is the name
	{ “output”,1, NULL, ‘o’ }, //Second is 1 if the option takes an argument or 0 otherwise.
	{ “verbose”, 0, NULL, ‘v’ }, // Third is NULL
	{ NULL,0, NULL, 0 } // Fourth is a character constant specifying the short option synonym.
};
	{% endhighlight %}

Pretty easy to implement, right? Typically you would wanna loop through this to process all the options the user has specified & then handle each using a switch statement.								

Now if the above mentioned function runs into an invalid option, it will return a ? which will stop the program from executing any further. When handling an option that takes an argument, the global var <code>optarg</code> points to the text of that argument. After getopt_long has finished parsing, the global var <code>optind</code> contains the index of the first nonoption argument.								

Now let us do some coding using getopt_long to process arguments.							

You can view the GNU Coding
Standards’ guidelines for command-line options by invoking the following from a shell prompt on most GNU/Linux systems:	<code>% info “(standards)User Interfaces”</code>.

	{% highlight c %}
#include <stdio.h>
#include <stdlib.h>
#include <getopt.h>

const char* name_of_the_program; //Name of the program goes here

void print_usage (FILE* stream, int exit_code) //Prints usage info to the stdout & exits the program with exit code.
{
fprintf (stream, “Usage: %s options [ inputfile ... ]\n”, name_of_the_program);
fprintf (stream,
“ -h --help
Display this usage information.\n”
“ -o --output filename.\n”
“ -v --verbose
Print verbose messages.\n”); //verbose messages usually contain the processing information as the command executes. This is a non-mute command line mode.
exit (exit_code);
}

int main (int argc, char* argv[]) //Same as explained above
{
int next_option;

const char* const short_options = “ho:v”; // A string listing valid short options letters.

const struct option long_options[] = { //Same as explained above
{ “help”,0, NULL, ‘h’ },
{ “output”,1, NULL, ‘o’ },
{ “verbose”, 0, NULL, ‘v’ },
{ NULL,0, NULL, 0}
};

const char* output_filename = NULL; //Output filename variable declared

int verbose = 0; // To display verbose or not.


name_of_the_program = argv[0]; //Program name is stored as the first element in argv[0] remember?
	do {
	next_option = getopt_long (argc, argv, short_options,long_options, NULL);
		switch (next_option)
		{
		case ‘h’:
		print_usage (stdout, 0); //User requesting help
		break;

		case ‘o’:
		output_filename = optarg; //Takes the name of the output file.
		break;

		case ‘v’:
		verbose = 1; //Set verbose to 1
		break;

		case ‘?’:
		/* The user specified an invalid option. */

		print_usage (stderr, 1); //Output with error 
		case -1:
		break;

		default: //Unexpected or something that does not require any arguments.
		abort ();
		}
	}
while (next_option != -1);

if (verbose) { //If verbose option set
int i;
for (i = optind; i < argc; ++i) //OPTIND points to first nonoption argument.
printf (“Argument: %s\n”, argv[i]);
}

return 0;
}
	{% endhighlight %}

That's it. Now you can enjoy building some awesome linux command line applications using the GNU C library.			


{% include JB/setup %}
