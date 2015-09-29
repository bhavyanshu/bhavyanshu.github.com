jQuery.githubrepoDetails = function(username, reponame, callback) {
		jQuery.getJSON('https://api.github.com/repos/'+username+'/'+reponame+'/releases?callback=?',callback);
}
 
jQuery.fn.loadReleases = function(username, reponame) {
    this.html("<h2 style=\"color:#FFF;\">Hold on tight, digging out " + reponame +"'s details...</h2><br><img src=\"https://bhavyanshu.me/assets/themes/hooligan/images/bgs/477.GIF\" style=\"margin-left: auto;margin-right:auto; box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.8);  margin-bottom:20px;display:block;\" alt=\"Loading..\" />");
     
    var target = this;
    $.githubrepoDetails(username,reponame, function(data) {
        var repos = data.data; // JSON Parsing
        //alert(repos.length); Only for checking how many items are returned.
        var list = $('<dl/>');
        target.empty().append(list);
        $(repos).each(function() {
                list.append('<dt><a style="font-size:20px;" href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a> | Tag Name : '+this.tag_name );
		if(this.prerelease != true){list.append('<b> { Stable Release } </b>');} else {list.append('<b> { Unstable Release for Devs } </b></dt>');}
                list.append('<br>About :<i>   ' + this.body +'</i><br><br><a class="styled-button-8" href="'+this.tarball_url+'">Download Tar</a><a class="styled-button-8" href="'+this.zipball_url+'">Download Zip</a><hr>');
        });      
      });
};

jQuery.fn.lightmdReleases = function(username, reponame) {
    this.html("<h2 style=\"color:#FFF;\">Hold on tight, digging out " + reponame +"'s details...</h2><br><img src=\"https://bhavyanshu.me/assets/themes/hooligan/images/bgs/477.GIF\" style=\"margin-left: auto;margin-right:auto; box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.8);  margin-bottom:20px;display:block;\" alt=\"Loading..\" />");
     
    var target = this;
    $.githubrepoDetails(username,reponame, function(data) {
        var repos = data.data[0]; // JSON Parsing
        var list = $('<dl/>');
	var linux_download='';
	var linux_filename='';
	var linux_fileSize='';
	var win_download='';
	var win_filename='';
	var win_fileSize='';
        target.empty().append(list);
        $(repos).each(function() {

		$.each(repos.assets, function(){
		  if (this.content_type == 'application/x-deb' ) {
		    linux_download = this.browser_download_url;
                    linux_filename = this.name;
		    linux_fileSize = this.size/1048576;
		    //alert(linux_download);
		  }
		  else if(this.content_type == 'application/x-msdos-program' || this.content_type == 'application/octet-stream') {
		    win_download = this.browser_download_url;
		    win_filename = this.name;
		    win_fileSize = this.size/1048576;
		    //alert(win_download);
		  }
		});		

                list.append('<dt><a style="font-size:20px;" href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a> | Tag Name : '+this.tag_name );
		if(this.prerelease != true){list.append('<b> { Stable Release } </b>');} else {list.append('<b> { Unstable Release for Devs } </b></dt>');}
		if(linux_download=='' && win_download=='') {
			list.append('<br><strong>No downloads are availalbe. Check back later.</strong>');
		}
		else {
                list.append('<style>.installinfo a:hover{ color:#000; } .styled-button-8 {margin: 10px;display: inline-block;}</style><div class="installinfo"><br><br><a class="styled-button-8" href="'+linux_download+'">Linux - Debian (.deb) | Size:'+parseFloat(linux_fileSize).toFixed(2)+' MB</a><br><a class="styled-button-8" href="'+win_download+'">Windows (.exe) | Size:'+parseFloat(win_fileSize).toFixed(2)+' MB</a><br><a class="styled-button-8" href="'+this.tarball_url+'">Download Tarball</a><hr>');
		list.append('<br><strong>Install in Linux (Debian)</strong><br><h3>Apt Installation (Debian):</h3><p>Open terminal and copy paste,</p><br><pre><code>echo "deb [trusted=yes] https://repo.fury.io/bhavyanshu/ /" | sudo tee -a /etc/apt/sources.list.d/fury.list</code></pre><p>Then, </p><pre><code>sudo apt-get update && sudo apt-get install lightmdeditor</code></pre><br><h3>Manual Installation:</h3><br>Download <a href="'+linux_download+'">deb file</a>.<br><br>Open terminal, then run <pre><code>sudo apt-get install libqt5core5a libqt5gui5 libqt5widgets5</code></pre><br><br>Finally, <pre><code>dpkg -i '+linux_filename+' </code></pre><br><br><p><strong>Install in Windows: </strong>Download <a href="'+win_download+'">installer</a> and simply run it<br></p><br><a href="'+ (this.homepage?this.homepage:this.html_url) +'"><strong>View Detailed Information on Setup & Install</strong></a></div>');
		}
        });      
      });
};
