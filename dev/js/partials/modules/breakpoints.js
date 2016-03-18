// Define Breakpoints
// Create module which exports bp functions

const bp = (function(){

	var convertToNum = function(obj){
		let newObj = {};
		for(var key in obj){
			newObj[key] = parseFloat(obj[key]);
		}
		return newObj;
	};

	/* inject: Breakpoints JSON */
	/* endinject */

	var bpObj = convertToNum(bpData["breakpoints"]);

	return {

		// Breakpoint detection function
		// eg: if(bp.min("med")){
		min: function(size){
			if(window.innerWidth >= bpObj[size]) {
				return true;
			}
			else {
				return false;
			}
		},

		max: function(size){
			if(window.innerWidth <= bpObj[size]) {
				return true;
			}
			else {
				return false;
			}
		},

		between: function(from, to){
			if(window.innerWidth >= bpObj[from] && window.innerWidth <= bpObj[to]) {
				return true;
			}
			else {
				return false;
			}
		}
	};

})();

