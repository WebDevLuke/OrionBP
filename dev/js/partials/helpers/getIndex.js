//--------------------------------------------------------------------------------------------------------------------------------------
// GET INDEX FUNCTION
//--------------------------------------------------------------------------------------------------------------------------------------

/*
Returns the index of the given element
*/

module.exports = function(elem) {
	var index = 0;
	while ((elem = elem.previousSibling)) {
		if (elem.nodeType != 3 || !/^\s*$/.test(elem.data)) {
			index++;
		}
	}
	return index;
}