//--------------------------------------------------------------------------------------------------------------------------------------
// FIRE EVENT FUNCTION
//--------------------------------------------------------------------------------------------------------------------------------------

/*
Manually fires the given event for the given element
*/

module.exports = function(elem, event) {
	if (document.createEventObject){
		// dispatch for IE
		var evt = document.createEventObject();
		elem.fireEvent("on" + event,evt)
	}
	else{
		// dispatch for firefox + others
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent(event, true, true ); // event type,bubbling,cancelable
		elem.dispatchEvent(evt);
	}
}