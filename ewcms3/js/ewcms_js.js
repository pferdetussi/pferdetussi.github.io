function noSpam_() {
	if (document.getElementById) {
		var smto = document.getElementsByName('obfmto');                
		//var escaped= document.getElementsByName('escaped'); // Doesn't work on IE 9
		var sps = document.getElementsByTagName('span');
		escaped = new Array();
		snmto	= new Array();

		for (s=0; s < sps.length; ++s) {
			if (sps[s].getAttribute('name') == 'escaped') {
				escaped.push(sps[s]);
			}
		}

		for (var i = 0; i < smto.length; i++) {
			mto_func(smto[i],escaped[i]);
		}
	
		//var snmto= document.getElementsByName('obfnmto'); // Doesn't work on IE 9 
		for (s=0; s < sps.length; ++s) {
			if (sps[s].getAttribute('name') == 'obfnmto') {
				snmto.push(sps[s]);
			}
		}
		for (var n=0; n < snmto.length ; ++n) {
			nmto_func(snmto[n]);
		}
 	
	}
                
}

function mto_func(element,replacement){
	var children = replacement.childNodes;
	var result= null;
	var count =children.length;
	for(var i=0; i < count ; i++){
		var child = children[i].childNodes;
		var child_count = child.length; 
		var temp= child[0].innerHTML.substr(3);
		switch (temp)
			{
			case 'mailto':	
				result = temp + ':'; 
				for(var k=1; k< child_count; k++){
	        			result += nmto_func(child[k]);
	        			if(child_count > k+1){
	        				result += ',';
	        			}
	        		}		
				break;
			case 'bcc':
			case 'cc':
			case 'to':
				result += (1 == i)?'?':'&';						
				result += temp + '=';
				for(var k=1; k< child_count; k++){
	        			result += nmto_func(child[k]);
	        			if(child_count > k+1){
	        				result += ' ';
	        			}
	        		}	
				break;
			default:
				result += (1 == i)?'?':'&';						
				result += temp + '=';
				var content = child[1].childNodes;
				
				for(var k=0; k< content.length; k++){
					if(typeof(content[k].innerHTML) == 'undefined'){
						result += ' ' + content[k].nodeValue  + ' ';
					}else{
						result += nmto_func(content[k]);
					}
				}
				break;
		}
	}
	element.href=result;	
	replacement.innerHTML='';
}
 
function nmto_func(element){
	var sp = element.childNodes;
	var t_element = document.createTextNode(sp[0].innerHTML + '@' + sp[2].innerHTML);
	var p_element= element.parentNode;
	p_element.replaceChild(t_element,element);
	return  t_element.data;	
}


if(window.addEventListener){ // Mozilla, Netscape, Firefox
	window.addEventListener('load', noSpam_, false); 
} else { // IE
	window.attachEvent('onload', noSpam_);
}
/*
     FILE ARCHIVED ON 21:54:55 Oct 24, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:29:44 Apr 16, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 137.33 (3)
  esindex: 0.005
  captures_list: 180.989
  CDXLines.iter: 10.673 (3)
  PetaboxLoader3.datanode: 59.01 (4)
  exclusion.robots.fetch: 27.934 (2)
  exclusion.robots: 28.67
  exclusion.robots.policy: 0.367
  RedisCDXSource: 1.541
  PetaboxLoader3.resolve: 190.902 (2)
  load_resource: 125.374
*/