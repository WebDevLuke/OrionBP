/*
|--------------------------------------------------------------------
|  GLOBALS
|--------------------------------------------------------------------
*/

// Bind querySelector for jQuery-esq selection method
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

// Function to allow for breakpoint detection
var bp = function(size){	
	var sizes = {"xxlrg" : 1366, "xlrg" : 1280, "lrg" : 924, "med" : 640, "sml" : 480, "xsml" : 360};
	if(window.innerWidth <= sizes[size]){
		return true;
	}
	else {
		return false;
	}
};

console.log(bp("med"));