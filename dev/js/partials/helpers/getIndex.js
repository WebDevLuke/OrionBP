//--------------------------------------------------------------------------------------------------------------------------------------
// GET INDEX FUNCTION
//--------------------------------------------------------------------------------------------------------------------------------------

/*
Returns the index of the given element
*/

module.exports = function(node) {
	var index = 0;
	while ((node = node.previousSibling)) {
		if (node.nodeType != 3 || !/^\s*$/.test(node.data)) {
			index++;
		}
	}
	return index;
}