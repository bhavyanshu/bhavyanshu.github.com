---
layout: post
title: "The basics of OpenGL part II"
description: "This is the part II of the basic of openGL. In this i will be writing the first code for openGL and will explain every bit of it."
category: tutorials
tags: ["openGL, c++"]
change_frequency: "weekly"
priority: 0.8
date: 2014-01-02 11:45:43
---

# Overview

In this lesson first i will teach you the basics of initializing your application with openGL and then I will tell you about shaders and how to draw with openGL.

I won't be going according to the book specified in the previous chapter. As it is more complex and uses its own header files. Setting it up is a different thing. Maybe later I will add a seperate tutorial for setting up the project to use the examples from book. Instead for now, I will start off with the basics of openGL and we will draw some awesome stuff on the window.

## Initializing Application

    glutInit(&argc,argv);

This call initializes GLUT. Oh wait, what is glut? I didn't tell you about GLUT previously. Okay, I think this is the right time. GLUT is like an API that lets us explore OpenGL programming in a lot easier way. It provides an interface for windowing. The parameters can be provided directly from the command line and include useful options like -sync and -gldebug which disable the asynchronous nature of X and automatically checks for GL errors and displays them.

    glutDisplayMode(GLUT_DOUBLE | GLUT_RGBA);

This is pretty much understandable. In this we are configuring GLUT according to our need. There are various configuration options that we can provide to GLUT.. Like above, we first configure it to enable double buffering, which simply means that we are drawing a background buffer while another buffer is being displayed. The second configuration is the color option. RGBA term might be understandable to people who have been programming UI for web apps. Red Green Blue Alpha is what it stands for. Where the Alpha defines the opacity of the background.

## Creating the main window

    glutInitWindowSize(1024,768);
    glutInitWindowPosition(100,100);
    glutCreateWindow("This is my Game Window");

The first line informs about the window size. Here we have set it as 1024x768. The second line tells the position of the window as to where it will be rendered. The third line is for giving a title to the window we have just rendered on screen.

    glClearColor(0.0f,0.0f,0.0f,0.0f); //RGBA values

Actually the rendering is a complex task that it requires you to specify shaders, buffers and various flags that affect how the rendering will take place. There will be times when you will need to clear out the framebuffer. The call above will be used when clearing the framebuffer.

    glutMainLoop();

This call passes control to GLUT which now begins its own internal loop. During this, it listens to events happening in the windowing system and passes them via the callbacks that we have configured.     

    glutDisplayFunc(RenderGame);

In this case, GLUT will only call the function we registered as a display callback which is *RenderGame* to give us a chance to render the frame.

    glClear(GL_COLOR_BUFFER_BIT);
    glutSwapBuffers();

These are the contents of our RanderGame or any render function we create. By this we clear the framebuffer using the color specified above. The second line swaps the roles of the backbuffer and the frontbuffer.

This is enough of theory for now. Let us look at the complete code now in which we will create a window.

    {% highlight c++ %}

#include "GL/freeglut.h"
#include "GL/gl.h"
void renderFunction()
{
    glClearColor(1.0, 0.0, 0.0, 0.0);
    glClear(GL_COLOR_BUFFER_BIT);
    /* drawing a triangle by defining 3 (x,y) pair coordinates */
	glBegin(GL_POLYGON);
	glVertex2f(-0.5, -0.5);
	glVertex2f(-0.5, 0.5);
	glVertex2f(0.8, -0.8);
	glEnd();
	glFlush(); //Flush GL buffers
}

/* Main method - main entry point of application
the freeglut library does the window creation work for us,
regardless of the platform. */

int main(int argc, char** argv)
{
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_SINGLE);
    glutInitWindowSize(1024,768);
    glutInitWindowPosition(100,100);
    glutCreateWindow("OpenGL - This is the First Window");
    glutDisplayFunc(renderFunction);
    glutMainLoop();    
    return 0;
}

    {% endhighlight %}



{% include JB/setup %}
