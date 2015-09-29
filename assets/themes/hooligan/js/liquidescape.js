(function(window, document, undefined) {

  // Replaces ERB-style tags with Liquid ones as we can't escape them in posts
  // Accepts:
  //   elements: jQuery elements in which to replace tags
  // Returns:
  //   undefined
  var replaceERBTags = function(elements) {
    elements.each(function() {
      // Only for text blocks at the moment as we'll strip highlighting otherwise
      var $this = $(this),
          txt   = $this.html();

      // Replace <%=  %>with {{ }}
      txt = txt.replace(new RegExp('&lt;%=(.+?)%&gt;', 'g'), '{{$1}}');
      // Replace <% %> with {% %}
      txt = txt.replace(new RegExp('&lt;%(.+?)%&gt;', 'g'), '{%$1%}');

      $this.html(txt);
    });
  };

  // Define the app object and expose it in the global scope
  window.screwliquid = {
    replaceERBTags: replaceERBTags
  };
})(window, window.document);

$(function() {
  // Replace ERB-style Liquid tags in highlighted code blocks...
  screwliquid.replaceERBTags($('div.highlight').find('code.language-text'));
  // ... and in inline code
  screwliquid.replaceERBTags($('p code'));
});
