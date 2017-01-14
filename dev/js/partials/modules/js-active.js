//--------------------------------------------------------------------------------------------------------------------------------------
// JS-ACTIVE COMPONENT
//--------------------------------------------------------------------------------------------------------------------------------------

/*
Adds functionality to all elements tagged with data-active tag. Toggles is-active class on the selected element.

In the data-active tag enter a comma seperate list of classes of the elements you wish to toggle is-active class on. Rather than linking to an existing
class, create a new class with a js prefix (eg js-navigation). This seperates js hooks from components, so if things change around it shouldn't affect the JS.
*/

/*
<div data-active="js-classname, js-classname2"></div>
*/


(function(){

	// Grab all elements with data-show attribute
	var elem = document.querySelectorAll("[data-active]");

	if(elem.length){
		// Add event listeners to each one
		for(var i = 0; i < elem.length; i++){
			elem[i].addEventListener("click", function(e){
				// Prevent default action of element
				e.preventDefault();
				// Grab linked elements
				var linkedElements = this.getAttribute('data-active'),
				linkedElements = linkedElements.split(", "),
				linkedElement;

				for(var m = 0; m < linkedElements.length; m++) {
					// Get all instances of linked element
					linkedElement = document.querySelectorAll("." + linkedElements[m]);
					// Toggle linked element if present
					if(linkedElement.length) {
						for(var n = 0; n < linkedElement.length; n++) {
							linkedElement[n].classList.toggle("is-active");
						}
					}
				} 
			});
		}
	}
})();


