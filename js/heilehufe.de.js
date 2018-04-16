$(document).ready(function()
{
	/**
	 * BODY CLASS HANDLING
	 */
	$('body').removeClass('nojs').addClass('javascript').placeholderFix().browserNotice().backToTop();

	/**
	 * ACCORDION CALL
	 */
	$('.accHandler').accordion({openFirst:false});
	

	/**
	 * CALL OF THE SLIDESHOW
	 */
	$('#slideshow').showslide();

	/**
	 * FORM VALIDATION AND SUBMIT VIA AJAX
	 */
	$('form[data-validate="true"]').each(function(iterator)
	{
		$(this).validate(
		{
			submitHandler: function(form){ $(form).formSubmit(); }
		});
	});

	/**
	 * CALL COLORBOX FOR DIFFERENT PURPOSES
	 */
	$('a[rel="lightbox"]:not(.nolightbox), a[href*=".jpg"]:not(.nolightbox), a[href*=".png"]:not(.nolightbox), a[href*=".gif"]:not(.nolightbox), a[href*=".jpeg"]:not(.nolightbox)').colorbox({photo:true, current: "{current} / {total}", maxWidth:'90%', maxHeight:'90%', rel:'lightbox'});
	$('a[data-link="iframe"]').colorbox({iframe:true, width:"80%", height:"80%", current: "Bild {current} von {total}"});
	//$('.slideme').colorbox({slideshow:true, current: "Bild {current} von {total}"});
	

	/**
	 * DETECT EXTERNAL LINKS AND ADD target=_blank
	 */
	$.expr[':'].external = function(obj){return !obj.href.match(/^mailto\:/) && !obj.href.match(/^javascript\:/) && (obj.hostname != location.hostname) && ('www.' + obj.hostname != location.hostname);};
	$('a:external').attr('target', '_blank');
}); 
/////////////// END DOC READY


/**
 * PLACE YOUR OWN SCRIPTS HERE
 */





/**
 * jQuery intersect checker
 * @author Dominik Kressler
 * @version 0.1
 * @date November 20, 2013
 * @category jQuery plugin
 * @description checks if element is visible in the viewport and toggles class 'intersect', 'noIntersect'
*/
(function($){$.fn.intersect=function(settings){var settings=$.extend({},$.fn.intersect.defaultSettings,settings);function checker(settings){if($.fn.intersect.isOnScreen(settings))settings.instance.addClass('intersect').removeClass('noIntersect');else settings.instance.removeClass('intersect').addClass('noIntersect')}this.each(function(i,elm){settings.instance=$(elm);$.fn.intersect.checker(settings);$(window).scroll(function(){$.fn.intersect.checker(settings)})});return this};$.fn.intersect.isOnScreen=function(settings){var win=$(window);var viewport={top:win.scrollTop(),left:win.scrollLeft()};viewport.right=viewport.left+win.width();viewport.bottom=viewport.top+win.height();var bounds=settings.instance.offset();bounds.right=bounds.left+settings.instance.outerWidth();bounds.bottom=bounds.top+settings.instance.outerHeight();return(!(viewport.right<bounds.left||viewport.left>bounds.right||viewport.bottom<bounds.top||viewport.top>bounds.bottom))};$.fn.intersect.checker=function(settings){if($.fn.intersect.isOnScreen(settings))settings.instance.addClass('intersect').removeClass('noIntersect');else settings.instance.removeClass('intersect').addClass('noIntersect')};$.fn.intersect.defaultSettings={}})(jQuery);

/**
 * jQuery backToTop
 * @author Dominik Kressler
 * @version 0.1
 * @date November 13, 2013
 * @category jQuery plugin
 * @description creates a fixed back to top anchor and displays it if page is scrolled
*/
(function($){$.fn.backToTop=function(settings){var settings=$.extend({},$.fn.backToTop.defaultSettings,settings);settings=$.fn.backToTop.createMarkup(settings);settings.button.click(function(e){e.preventDefault();$('html,body').stop().animate({scrollTop:0},settings.speed)});settings.button.fadeOut(0);$(window).scroll(function(e){if($(this).scrollTop()>settings.displayAt)settings.button.fadeIn();else settings.button.fadeOut()});return this};$.fn.backToTop.createMarkup=function(settings){settings.button=$('<a href="#" class="backToTop">'+settings.text+'</a>');$(settings.placement).append(settings.button);return settings};$.fn.backToTop.defaultSettings={placement:'body',text:'Zum Seitenanfang',speed:500,displayAt:200}})(jQuery);

/**
 * jQuery Font Resizer
 * @author Dominik Kressler
 * @version 0.1
 * @date November 6, 2013
 * @category jQuery plugin
*/
(function($){$.fn.fontResizer=function(settings){var settings=$.extend({},$.fn.fontResizer.defaultSettings,settings);settings.placement=$(this);settings=$.fn.fontResizer.createMarkup(settings);settings.targets=(settings.targets.length>0)?settings.targets:$('body');settings.smaller.click(function(e){e.preventDefault();settings.targets.each(function(i,elm){currentSize=parseInt($(elm).css('font-size'));if(currentSize<=settings.min)return false;else $(elm).css({'font-size':'-='+settings.steps})})});settings.bigger.click(function(e){e.preventDefault();settings.targets.each(function(i,elm){currentSize=parseInt($(elm).css('font-size'));if(currentSize>=settings.max)return false;else $(elm).css({'font-size':'+='+settings.steps})})})};$.fn.fontResizer.createMarkup=function(settings){var markup=$('<ul class="fontResizer"><li><a href="#" class="smaller">'+settings.smallText+'</a></li><li><a href="#" class="bigger">'+settings.bigText+'</a></li></ul>');settings.placement.append(markup);settings.smaller=$('.fontResizer .smaller');settings.bigger=$('.fontResizer .bigger');return settings};$.fn.fontResizer.defaultSettings={max:20,min:10,steps:2,targets:{},bigText:'Schrift vergrößern',smallText:'Schrift verkleinern'}})(jQuery);

/**
 * jQuery nice tool tips
 * @author Dominik Kressler
 * @version 0.2
 * @date November 5, 2013
 * @category jQuery plugin
*/
(function($){$.fn.smartTitle=function(settings){var settings=$.extend({},$.fn.browserNotice.defaultSettings,settings);settings.elements=this;settings=$.fn.smartTitle.createMarkup(settings);settings.elements.each(function(i,elm){var title=$(this).attr('title');$(elm).hover(function(){settings.current=$(this);settings.current.attr('title','');settings=$.fn.smartTitle.position(settings);settings.instance.text(title).css({display:'block'}).stop().animate({top:'-=10px',opacity:1},settings.speed);settings.instance.addClass('active')},function(){settings.current.attr('title',title);settings.instance.stop().animate({top:'+=5px',opacity:0},settings.speed,function(){settings.instance.css({top:0,left:0,display:'none'})});settings.instance.removeClass('active')});$(elm).click(function(e){settings.current.attr('title',title);settings.instance.stop().animate({top:'+=5px',opacity:0},settings.speed,function(){settings.instance.css({top:0,left:0,display:'none'})});settings.instance.removeClass('active')})})};$.fn.smartTitle.createMarkup=function(settings){settings.instance=$('<div id="smartTitle"></div>');$('body').append(settings.instance);return settings};$.fn.smartTitle.position=function(settings){settings.height=settings.current.height();settings.left=settings.current.offset().left;settings.top=settings.current.offset().top+settings.height+15;if(settings.top>=($(document).height()-settings.height)){settings.instance.removeClass('bottom').addClass('top');settings.top=settings.current.offset().top-settings.height-10;settings.location="top"}else{settings.location="bottom";settings.instance.removeClass('top').addClass('bottom')}settings.instance.css({top:settings.top,left:settings.left});return settings};$.fn.smartTitle.defaultSettings={speed:500}})(jQuery);

/**
 * jQuery Old Browser Notice
 * @author Dominik Kressler
 * @version 1.0
 * @date August 27, 2013
 * @category jQuery plugin
*/
(function($){$.fn.browserNotice=function(settings){var settings=$.extend({},$.fn.browserNotice.defaultSettings,settings);var N=navigator.appName,ua=navigator.userAgent,tem;var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);if(M&&(tem=ua.match(/version\/([\.\d]+)/i))!=null)M[2]=tem[1];M=M?[M[1],M[2]]:[N,navigator.appVersion,'-?'];settings.name=M[0];settings.version=parseInt(M[1]);if(settings.createNotice)$.fn.browserNotice.createNotice(settings);return this};$.fn.browserNotice.createNotice=function(settings){var html=$('<div class="noticeBar">Ihr Webbrowser ('+settings.name+' '+settings.version+') ist nicht aktuell. Er enthällt bekannte Sicherheitslücken und könnte diese und weitere Webseiten nicht korrekt darstellen. <a href="https://web.archive.org/web/20171024222248/http://browsehappy.com/" target="_blank" title="Jetzt updaten">Lernen Sie aktuell zu bleiben!</a></div>');var notice=false;if(settings.name=="Firefox"&&settings.version<settings.firefox)notice=true;if(settings.name=="Chrome"&&settings.version<settings.chrome)notice=true;if(settings.name=="MSIE"&&settings.version<settings.msie)notice=true;if(settings.name=="Safari"&&settings.version<settings.safari)notice=true;if(settings.name=="Opera"&&settings.version<settings.opera)notice=true;if(notice)$('body').prepend(html)};$.fn.browserNotice.defaultSettings={firefox:17,chrome:25,msie:8,safari:4,opera:13,createNotice:true}})(jQuery);

/**
 * jQuery Accordion
 * @author Dominik Kressler
 * @version 1.2.4
 * @date November 13, 2013
 * @category jQuery plugin
*/
(function ($) {
	$.fn.accordion = function (settings) {
		var settings = $.extend({}, $.fn.accordion.defaultSettings, settings);
		settings.element = this;
		settings.element.next().slideUp(0);
		if (settings.openFirst) {
			settings.current = settings.element.first();
			if (window.location.hash.indexOf("section:") > -1) {
				settings.current = window.location.hash.split("section:");
				settings.current = settings.current[1];
				settings.current = $('#' + settings.current)
			}
		}
		if (window.location.hash.indexOf("section:") > -1) {
			settings.current = window.location.hash.split("section:");
			settings.current = settings.current[1];
			settings.current = $('#' + settings.current)
		}
		if (settings.current) {
			settings.current.addClass('active');
			settings.current.next().slideDown(settings.speed)
		}
		$('a').click(function (e) {
			var href = $(this).attr('href');
			if (href.indexOf("section:") > -1) {
				settings.current = href.split("section:");
				settings.current = settings.current[1];
				settings.current = $('#' + settings.current);
				settings = $.fn.accordion.clickHandler(settings)
			}
		});
		this.click(function (e) {
			e.preventDefault();
			settings.current = $(this);
			settings = $.fn.accordion.clickHandler(settings)
		});
		if (typeof (settings.onSlide) == 'function') settings.onInit();
		return this
	};
	$.fn.accordion.clickHandler = function (settings) {
		if (typeof (settings.onSlide) == 'function') settings.onSlide();
		if (!settings.current.hasClass('active')) {
			if (settings.closeDeselection) {
				settings.element.next().stop().slideUp(settings.speed);
				settings.element.removeClass('active')
			}
			settings.current.next().stop().slideDown(settings.speed, function () {
				if (typeof (settings.onSlideComplete) == 'function') settings.onSlideComplete()
			}).queue(function () {
				$('html,body').animate({
					scrollTop: settings.current.next().offset().top - 100
				})
			});
			settings.current.addClass('active')
		} else if (settings.closable && settings.current.hasClass('active')) {
			settings.current.next().stop().slideUp(settings.speed);
			settings.current.removeClass('active')
		}
		return settings
	};
	$.fn.accordion.defaultSettings = {
		openFirst: false,
		speed: 500,
		closeDeselection: true,
		closable: true
	}
})(jQuery);


/* http://fgnass.github.io/spin.js/dist/spin.min.js */
(function(t,e){if(typeof exports=="object")module.exports=e();else if(typeof define=="function"&&define.amd)define(e);else t.Spinner=e()})(this,function(){"use strict";var t=["webkit","Moz","ms","O"],e={},i;function o(t,e){var i=document.createElement(t||"div"),o;for(o in e)i[o]=e[o];return i}function n(t){for(var e=1,i=arguments.length;e<i;e++)t.appendChild(arguments[e]);return t}var r=function(){var t=o("style",{type:"text/css"});n(document.getElementsByTagName("head")[0],t);return t.sheet||t.styleSheet}();function s(t,o,n,s){var a=["opacity",o,~~(t*100),n,s].join("-"),f=.01+n/s*100,l=Math.max(1-(1-t)/o*(100-f),t),d=i.substring(0,i.indexOf("Animation")).toLowerCase(),u=d&&"-"+d+"-"||"";if(!e[a]){r.insertRule("@"+u+"keyframes "+a+"{"+"0%{opacity:"+l+"}"+f+"%{opacity:"+t+"}"+(f+.01)+"%{opacity:1}"+(f+o)%100+"%{opacity:"+t+"}"+"100%{opacity:"+l+"}"+"}",r.cssRules.length);e[a]=1}return a}function a(e,i){var o=e.style,n,r;if(o[i]!==undefined)return i;i=i.charAt(0).toUpperCase()+i.slice(1);for(r=0;r<t.length;r++){n=t[r]+i;if(o[n]!==undefined)return n}}function f(t,e){for(var i in e)t.style[a(t,i)||i]=e[i];return t}function l(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var o in i)if(t[o]===undefined)t[o]=i[o]}return t}function d(t){var e={x:t.offsetLeft,y:t.offsetTop};while(t=t.offsetParent)e.x+=t.offsetLeft,e.y+=t.offsetTop;return e}var u={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:1/4,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"};function p(t){if(typeof this=="undefined")return new p(t);this.opts=l(t||{},p.defaults,u)}p.defaults={};l(p.prototype,{spin:function(t){this.stop();var e=this,n=e.opts,r=e.el=f(o(0,{className:n.className}),{position:n.position,width:0,zIndex:n.zIndex}),s=n.radius+n.length+n.width,a,l;if(t){t.insertBefore(r,t.firstChild||null);l=d(t);a=d(r);f(r,{left:(n.left=="auto"?l.x-a.x+(t.offsetWidth>>1):parseInt(n.left,10)+s)+"px",top:(n.top=="auto"?l.y-a.y+(t.offsetHeight>>1):parseInt(n.top,10)+s)+"px"})}r.setAttribute("role","progressbar");e.lines(r,e.opts);if(!i){var u=0,p=(n.lines-1)*(1-n.direction)/2,c,h=n.fps,m=h/n.speed,y=(1-n.opacity)/(m*n.trail/100),g=m/n.lines;(function v(){u++;for(var t=0;t<n.lines;t++){c=Math.max(1-(u+(n.lines-t)*g)%m*y,n.opacity);e.opacity(r,t*n.direction+p,c,n)}e.timeout=e.el&&setTimeout(v,~~(1e3/h))})()}return e},stop:function(){var t=this.el;if(t){clearTimeout(this.timeout);if(t.parentNode)t.parentNode.removeChild(t);this.el=undefined}return this},lines:function(t,e){var r=0,a=(e.lines-1)*(1-e.direction)/2,l;function d(t,i){return f(o(),{position:"absolute",width:e.length+e.width+"px",height:e.width+"px",background:t,boxShadow:i,transformOrigin:"left",transform:"rotate("+~~(360/e.lines*r+e.rotate)+"deg) translate("+e.radius+"px"+",0)",borderRadius:(e.corners*e.width>>1)+"px"})}for(;r<e.lines;r++){l=f(o(),{position:"absolute",top:1+~(e.width/2)+"px",transform:e.hwaccel?"translate3d(0,0,0)":"",opacity:e.opacity,animation:i&&s(e.opacity,e.trail,a+r*e.direction,e.lines)+" "+1/e.speed+"s linear infinite"});if(e.shadow)n(l,f(d("#000","0 0 4px "+"#000"),{top:2+"px"}));n(t,n(l,d(e.color,"0 0 1px rgba(0,0,0,.1)")))}return t},opacity:function(t,e,i){if(e<t.childNodes.length)t.childNodes[e].style.opacity=i}});function c(){function t(t,e){return o("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',e)}r.addRule(".spin-vml","behavior:url(#default#VML)");p.prototype.lines=function(e,i){var o=i.length+i.width,r=2*o;function s(){return f(t("group",{coordsize:r+" "+r,coordorigin:-o+" "+-o}),{width:r,height:r})}var a=-(i.width+i.length)*2+"px",l=f(s(),{position:"absolute",top:a,left:a}),d;function u(e,r,a){n(l,n(f(s(),{rotation:360/i.lines*e+"deg",left:~~r}),n(f(t("roundrect",{arcsize:i.corners}),{width:o,height:i.width,left:i.radius,top:-i.width>>1,filter:a}),t("fill",{color:i.color,opacity:i.opacity}),t("stroke",{opacity:0}))))}if(i.shadow)for(d=1;d<=i.lines;d++)u(d,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(d=1;d<=i.lines;d++)u(d);return n(e,l)};p.prototype.opacity=function(t,e,i,o){var n=t.firstChild;o=o.shadow&&o.lines||0;if(n&&e+o<n.childNodes.length){n=n.childNodes[e+o];n=n&&n.firstChild;n=n&&n.firstChild;if(n)n.opacity=i}}}var h=f(o("group"),{behavior:"url(#default#VML)"});if(!a(h,"transform")&&h.adj)c();else i=a(h,"animation");return p});

/**
 * CONVERT RGB TO HEX
 */
function rgb2hex(rgb) {  function hex(x) { hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"); return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16]; } return "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]); } 

$(document).ready(function()
{
	/**
	 * FRAMEWORK DEBUG TOOLS
	 */
	var logvisible = true;
	$('#log_hider').click(function(e)
	{
		e.preventDefault();
		if(logvisible)
		{
			$('#log_container').addClass('show');
			$(this).text("hide console");
			logvisible = false;
		}
		else
		{
			$('#log_container').removeClass('show');
			$(this).text("show console");
			logvisible = true;
		}
	});
});
/*
     FILE ARCHIVED ON 22:22:48 Oct 24, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:29:46 Apr 16, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 82.055 (3)
  esindex: 0.008
  captures_list: 189.167
  CDXLines.iter: 10.369 (3)
  PetaboxLoader3.datanode: 85.91 (4)
  exclusion.robots.fetch: 34.472 (2)
  exclusion.robots: 35.081
  exclusion.robots.policy: 0.281
  RedisCDXSource: 58.871
  PetaboxLoader3.resolve: 35.127
  load_resource: 62.465
*/