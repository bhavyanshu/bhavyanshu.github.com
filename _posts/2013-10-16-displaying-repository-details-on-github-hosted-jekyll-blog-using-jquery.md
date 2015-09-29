---
layout: post
title: "Displaying repository details on github hosted jekyll blog using Jquery"
description: "A tutorial on how to list the repository details using jquery and javascript in a github hosted jekyll blog."
category: tutorials
tags: ["tutorial","jquery","javascript","github","jekyll"]
change_frequency: "weekly"
priority: 0.7
---

#Overview 

>I just wanted to list the names of my on-going projects on github right on my blog so that visitors can really look at the work i have done so far or the work i am doing. I google'd for stand-alone jekyll plugins and already built modules that could be integrated with jekyll blog but nothing worked like i wanted.
>So i went on and built my own script to do this task. I used javascript & jquery to achieve this. You can look at the demo on ["My projects"](http://bhavyanshu.me/projects.html).       

##Requirement

1. Make sure you have latest jquery. That's all.                                                      

##Tutorial

I won't be showing you the css for it because that way you can style it yourself according to your site. I am pretty sure of that. I will just show you the javascript code for it.                                                                                                           

* First of all create a page/post where you want to list the names of the projects. It will create a .md file. You can also add a simple html file if you wish to. That's just upto you. Now make a **gitquery.js** file and copy/paste the below given contents.                                                  

###Code - gitquery.js                                                               

                     

	{% highlight javascript %}
        
		jQuery.gitUser = function (username, callback) {
	    jQuery.getJSON('https://api.github.com/users/' + username + '/repos?per_page=100&callback=?', callback) //Change per_page according to your need.
	}

	jQuery.fn.getRepos = function (username) {
	    this.html("<h2 style=\"color:#FFF;\">Hold on tight, digging out " + username + "'s repositories...</h2><br>");

	    var target = this;
	    $.gitUser(username, function (data) {
		var repos = data.data; // JSON Parsing
		//alert(repos.length); Only for checking how many items are returned.
		sortByForks(repos); //Sorting by forks. You can customize it according to your needs.
		var list = $('<dl/>');
		target.empty().append(list);
		$(repos).each(function () {
		    checkfork = this.fork;
		    if ((this.name != (username.toLowerCase() + '.github.com')) && (checkfork != true)) { //Check for username.github.com repo and for forked projects
		        list.append('<dt><a style="font-size:20px;" href="' + (this.homepage ? this.homepage : this.html_url) + '">' + this.name + '</a><em> - ' + (this.language ? ('(' + this.language + ')') : '') + '</em><br>Forks: ' + this.forks + ' | Watchers: ' + this.watchers + '</dt>');
		        //Similarly fetch everything else you need.
		    }
		});
	    });

	    function sortByForks(repos) {
		repos.sort(function (a, b) {
		    return b.forks - a.forks; //Descending order for number of forks based sorting.
		});
	    }
	};
	{% endhighlight %}


* Let us take a look at what all info you can fetch using github API. Take a look at the snippet of the JSON response.                                  

###Code - Snippet of Json Response from Github API                
                                                                                                     
	{% highlight json%}
   {
    "id": 13015554,
    "name": "zBzOCR",
    "full_name": "bhavyanshu/zBzOCR",
    "owner": {
      "login": "bhavyanshu",
      "id": 3829459,
      "avatar_url": "",
      "gravatar_id": "",
      "url": "https://api.github.com/users/bhavyanshu",
      "html_url": "https://github.com/bhavyanshu",
      "followers_url": "https://api.github.com/users/bhavyanshu/followers",
      "following_url": "https://api.github.com/users/bhavyanshu/following{/other_user}",
      "gists_url": "https://api.github.com/users/bhavyanshu/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/bhavyanshu/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/bhavyanshu/subscriptions",
      "organizations_url": "https://api.github.com/users/bhavyanshu/orgs",
      "repos_url": "https://api.github.com/users/bhavyanshu/repos",
      "events_url": "https://api.github.com/users/bhavyanshu/events{/privacy}",
      "received_events_url": "https://api.github.com/users/bhavyanshu/received_events",
      "type": "User",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/bhavyanshu/zBzOCR",
    "description": "zBzOCR is a GUI tool written in python which helps extract text from images. It is based on the tesseract-ocr engine.",
    "fork": false,
    "url": "https://api.github.com/repos/bhavyanshu/zBzOCR",
    "forks_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/forks",
    "keys_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/teams",
    "hooks_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/hooks",
    "issue_events_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/issues/events{/number}",
    "events_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/events",
    "assignees_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/assignees{/user}",
    "branches_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/branches{/branch}",
    "tags_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/tags",
    "blobs_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/languages",
    "stargazers_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/stargazers",
    "contributors_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/contributors",
    "subscribers_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/subscribers",
    "subscription_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/subscription",
    "commits_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/contents/{+path}",
    "compare_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/merges",
    "archive_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/downloads",
    "issues_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/issues{/number}",
    "pulls_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/bhavyanshu/zBzOCR/labels{/name}",
    "created_at": "2013-09-22T15:19:02Z",
    "updated_at": "2013-09-25T13:24:19Z",
    "pushed_at": "2013-09-25T13:24:16Z",
    "git_url": "git://github.com/bhavyanshu/zBzOCR.git",
    "ssh_url": "git@github.com:bhavyanshu/zBzOCR.git",
    "clone_url": "https://github.com/bhavyanshu/zBzOCR.git",
    "svn_url": "https://github.com/bhavyanshu/zBzOCR",
    "homepage": null,
    "size": 2536,
    "watchers_count": 0,
    "language": "OpenEdge ABL",
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "master_branch": "master",
    "default_branch": "master"
   }
	{% endhighlight %}	
                                                                                   
* Now create a .html file or .md file and include the code below. **display-projects** is a div element where the fetched result will be displayed.           
                    

###Code - html file
	
	{% highlight html%}
	...
	<script src="path_to_js/gitquery.js"></script>
	<script type="text/javascript">
    	$(function() {
        $("#display-projects").getRepos("YOUR_GITHUB_USERNAME_GOES_HERE"); //Add your github username.
    	});
	</script>
	<div id="display-projects"></div>
	...
	{% endhighlight %}

That's all. If you still encounter some issue, either comment below or simply drop me an email at ask@bhavyanshu.me . You can also follow via [twitter](https://twitter.com/pytacular).

{% include JB/setup %}
