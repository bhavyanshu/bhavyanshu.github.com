jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/users/'+username+'/repos?per_page=100&callback=?',callback)
}

jQuery.fn.loadRepositories = function(username) {
    this.html("<h2 style=\"color:#333;\">Hold on tight, digging out " + username +"'s repositories...</h2><br><img src=\"assets/themes/hooligan/images/bgs/453.GIF\" style=\"margin-left: auto;margin-right:auto; box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.8);  margin-bottom:20px;display:block;\" alt=\"Loading..\" />");

    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
        sortByStars(repos);
        var list = $('<dl/>');
        target.empty().append(list);
        $(repos).each(function() {
            checkfork = this.fork;
            if ((this.name != (username.toLowerCase()+'.github.com')) && (checkfork != true)) {
                list.append('<dt><h2><a href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a> '+(this.language?('('+this.language+')'):'')+'</h2> '+'<div class="seperator" style="margin:10px;"> <a href="'+this.html_url+'/fork" class="btn btn-default btn-sm">  Fork it </a> <a href="'+this.html_url+'" class="btn btn-default btn-sm">  Watchers ('+ this.watchers +') </a> <a class="btn btn-default btn-sm" href="'+ (this.html_url) +'/releases'+'"> View Releases  </a> <a class="btn btn-default btn-sm" href="'+ (this.html_url) +'/issues'+'">  Currently '+this.open_issues_count+' pending issue(s)  </a></div></dt>');
                list.append('<blockquote> ' + this.description +' <pre style="width:auto; margin-top:5px; word-wrap: break-word;">git clone <font color=\"#4cb4e8\"">'+this.ssh_url+'</font></pre></blockquote><hr>');
            }
        });
      });

    function sortByStars(repos) {
        repos.sort(function(a,b) {
        return b.stargazers_count - a.stargazers_count; //Descending order for number of stars based sorting.
       });
    }
};
