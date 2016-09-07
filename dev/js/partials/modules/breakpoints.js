//--------------------------------------------------------------------------------------------------------------------------------------
// BREAKPOINT FUNCTIONS
//--------------------------------------------------------------------------------------------------------------------------------------

var bp = (function(){

	var convertToNum = function(obj){
		let newObj = {};
		for(var key in obj){
			newObj[key] = parseFloat(obj[key]);
		}
		return newObj;
	},

		breakpoints = require("../../../data/breakpoints.js"),
		bpObj = convertToNum(breakpoints),
		windowWidth;

	return {

		// Breakpoint detection function
		// eg: if(bp.min("med")){
		min: function(size){

			windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			if(windowWidth >= bpObj[size]) {
				return true;
			}
			else {
				return false;
			}
		},

		max: function(size){

			windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			if(windowWidth <= bpObj[size]) {
				return true;
			}
			else {
				return false;
			}
		},

		between: function(from, to){

			windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			if(windowWidth >= bpObj[from] && windowWidth <= bpObj[to]) {
				return true;
			}
			else {
				return false;
			}
		}
	};

})();

module.exports = bp;