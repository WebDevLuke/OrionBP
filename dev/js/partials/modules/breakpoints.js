/*
|--------------------------------------------------------------------
| DEFINE MODULES
|--------------------------------------------------------------------
*/

var bp = (function(){

	var convertToNum = function(obj){
		let newObj = {};
		for(var key in obj){
			newObj[key] = parseFloat(obj[key]);
		}
		return newObj;
	},

		bpData = require("../../../data/config.js"),
		bpObj = convertToNum(bpData["breakpoints"]),
		windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;


	return {

		// Breakpoint detection function
		// eg: if(bp.min("med")){
		min: function(size){
			if(windowWidth >= bpObj[size]) {
				return true;
			}
			else {
				return false;
			}
		},

		max: function(size){
			if(windowWidth <= bpObj[size]) {
				return true;
			}
			else {
				return false;
			}
		},

		between: function(from, to){
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