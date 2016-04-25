"use strict";

/*
|--------------------------------------------------------------------
|  LAST-CHILD REPLACEMENT FOR IE8
|--------------------------------------------------------------------
*/

(function(document){

	// Exit prematurely if not on about page as no need to run this module
	if(!document.querySelector("body").classList.contains("about")){
		return false;
	}

	var boxes = document.querySelectorAll(".about__skills .text-box"),
		i,
		max,
		item;

	for(i = 0, max = boxes.length; i < max; i++) {
		item = boxes[i].querySelectorAll("li");
		item[item.length - 1].classList.add("ie8");
	}

})(document);