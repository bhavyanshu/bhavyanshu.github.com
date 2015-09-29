---
layout: page
title: "List of Available Tutorials"
description: "A list of the tutorials i have made till now."
tags: ["tutorials","android application", "linux kernel", "laravel", "raspberry pi"]
change_frequency: "weekly"
priority: 0.9
---

###Below given is a list of featured tutorials pointing to their respective table of contents.				

<br />
{% for cat in site.toc-category %}
<ul>
{% for page in site.pages %}
	{% if page.resource == true %}
		{% for pc in page.category %}
			{% if pc == cat %}
			<li><a style="font-size:20px;" href="{{ page.url }}">{{ page.title }}</a></li><br>
			{% endif %}  
		{% endfor %}  
	{% endif %}   
{% endfor %} 
</ul>
{% endfor %}  



{% include JB/setup %}
