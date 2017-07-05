/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 116);
/******/ })
/************************************************************************/
/******/ ({

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(117);
__webpack_require__(118);
__webpack_require__(119);
__webpack_require__(120);

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
* jQuery URL Shortener v@VERSION
* https://github.com/hayageek/jQuery-URL-shortener
*
*
* Date: @DATE
*/
(function ($) {

	$.urlShortener = function (options) {
		var settings = {};
		$.extend(settings, $.urlShortener.settings, options);

		var requestUrl = settings.requestUrl;

		if (settings.apiKey.length > 1) {
			requestUrl += "key=" + settings.apiKey;
		}

		if (settings.longUrl != undefined) {
			var data = { longUrl: settings.longUrl };
			var shortUrl = undefined;

			return $.urlShortener.shortUrl(requestUrl, data);
		} else if (settings.shortUrl != undefined) //URL info
			{
				requestUrl += "&shortUrl=" + settings.shortUrl;
				return $.urlShortener.urlInfo(requestUrl, settings.projection);
			}

		return undefined;
	};

	$.urlShortener.shortUrl = function (requestUrl, data) {
		var shortUrl = undefined;
		$.ajax({
			async: false,
			type: "POST",
			url: requestUrl,
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			dataType: "json"
		}).done(function (info) {
			shortUrl = info.id;
		}).fail(function (jqXHR, textStatus, errorThrown) {});

		return shortUrl;
	};
	$.urlShortener.urlInfo = function (requestUrl, projection) {
		if (projection != undefined) {
			requestUrl += "&projection=" + projection;
		}
		var urlInfo = undefined;
		$.ajax({
			async: false,
			type: "GET",
			url: requestUrl,
			contentType: "application/json; charset=utf-8",
			dataType: "json"
		}).done(function (info) {
			if (projection == undefined) {
				urlInfo = info.longUrl; //return long URL;
			} else {
				urlInfo = info; //return full info;
			}
		}).fail(function (jqXHR, textStatus, errorThrown) {});

		return urlInfo;
	};

	$.urlShortener.settings = {
		apiKey: '',
		version: 'v1',
		requestUrl: 'https://www.googleapis.com/urlshortener/v1/url?'
	};
})(jQuery);

/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (window, document, undefined) {

  // Replaces ERB-style tags with Liquid ones as we can't escape them in posts
  // Accepts:
  //   elements: jQuery elements in which to replace tags
  // Returns:
  //   undefined
  var replaceERBTags = function replaceERBTags(elements) {
    elements.each(function () {
      // Only for text blocks at the moment as we'll strip highlighting otherwise
      var $this = $(this),
          txt = $this.html();

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

$(function () {
  // Replace ERB-style Liquid tags in highlighted code blocks...
  screwliquid.replaceERBTags($('div.highlight').find('code.language-text'));
  // ... and in inline code
  screwliquid.replaceERBTags($('p code'));
});

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * jQuery PlusAnchor 1.0.7.3
 * By Jamy Golden
 * http://css-plus.com
 *
 * Copyright 2011, Jamy Golden
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function ($) {
    $.plusAnchor = function (el, options) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        // Access to jQuery and DOM versions of element
        base.el = el;
        base.$el = $(el);
        base.$el.data('plusAnchor', base); // Add a reverse reference to the DOM object
        base.scrollEl = 'body, html';
        base.initHash = window.location.hash;
        base.offsetTop = function () {

            return $('html').offset().top;
        }; // base.offsetTop()
        base.init = function () {

            base.options = $.extend({}, $.plusAnchor.defaults, options);

            // onInit callback
            if (base.options.onInit && typeof base.options.onInit == 'function') base.options.onInit(base);
            // End onInit callback

            base.$el.find('a[href^="#"]').click(function (e) {

                e.preventDefault();

                var $this = $(this),
                    href = $this.attr('href'),
                    $name = $('a[name="' + $(this).attr('href').substring(1) + '"]');
                //alert('scrollto ');
                if ($(href).length) {

                    // onSlide callback
                    if (base.options.onSlide && typeof base.options.onSlide == 'function') base.options.onSlide(base);
                    // End onSlide callback
                    $(base.scrollEl).animate({

                        scrollTop: $(href).offset().top + base.options.offsetTop

                    }, base.options.speed, base.options.easing);
                } else if ($name.length) {

                    // onSlide callback
                    if (base.options.onSlide && typeof base.options.onSlide == 'function') base.options.onSlide(base);
                    // End onSlide callback
                    $(base.scrollEl).animate({

                        scrollTop: $name.offset().top

                    }, base.options.speed, base.options.easing);
                }
            });
        }; // base.init()
        // Run initializer
        base.init();
    };
    $.plusAnchor.defaults = {
        easing: 'swing', // Anything other than "swing" or "linear" requires the easing.js plugin
        offsetTop: 0,
        speed: 1000, // The speed, in miliseconds, it takes to complete a slide
        onInit: null, // Callback function on plugin initialize
        onSlide: null // Callback function that runs just before the page starts animating
    };
    $.fn.plusAnchor = function (options) {
        return this.each(function () {
            new $.plusAnchor(this, options);
        });
    };
})(jQuery);

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


!function (d, s, id) {
  var js,
      fjs = d.getElementsByTagName(s)[0],
      p = /^http:/.test(d.location) ? 'http' : 'https';if (!d.getElementById(id)) {
    js = d.createElement(s);js.id = id;js.src = p + "://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js, fjs);
  }
}(document, "script", "twitter-wjs");

/***/ })

/******/ });