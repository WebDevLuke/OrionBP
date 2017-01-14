//--------------------------------------------------------------------------------------------------------------------------------------
// JS-ACTIVE SWIPE MODULE
//--------------------------------------------------------------------------------------------------------------------------------------

/*
Adds functionality to all elements with data-active-swipe data tag. Sets up swipe functionality at the specified direction so
the is-active class is toggled when a swipe is detected.
*/

/*
<div data-active-swipe="left"></div>
*/

(function(){
	// Import swipe helper
	var swipeDetect = require("../helpers/swipeDetect.js"), // Script to detect mobile swipes
	elems = document.querySelectorAll("[data-active-swipe]");

	if(elems.length){
		for(var i = 0; i < elems.length; i++) {
			let myDirection = elems[i].getAttribute("data-active-swipe"),
			currentElem = elems[i];
			swipeDetect(currentElem, function(swipedir){
				if(swipedir === myDirection && currentElem.classList.contains("is-active")) {
					currentElem.classList.remove("is-active");
				}
			})
		}
	}
})();