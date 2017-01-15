//--------------------------------------------------------------------------------------------------------------------------------------
// JS-TOGGLE-TEXT COMPONENT
//--------------------------------------------------------------------------------------------------------------------------------------

/*
Adds functionality for any components with a data-toggle-text attribute.

data-toggle-text = On click the elements text toggles to this
*/

/*
<div data-toggle-text="Goodbye">Hello</div>
*/

(function(){

	// Grab all elements with data-show attribute
	var elem = document.querySelectorAll("[data-toggle-text]");

	if(elem.length){
		// Add event listeners to each one
		for(var i = 0; i < elem.length; i++){

			// Grab and store original value
			elem[i].setAttribute("data-toggle-original", elem[i].innerText);
			// Add event listener
			elem[i].addEventListener("click", function(e){
				// Prevent default action of element
				e.preventDefault();
				// Grab toggle value
				var toggleText = this.getAttribute('data-toggle-text'),
				// Grab original value
				originalValue = this.getAttribute("data-toggle-original");
				// Swap text values
				if(this.innerText === toggleText) {
					this.innerText = originalValue;
				}
				else {
					this.innerText = toggleText;
				}
			});
		}
	}

})();