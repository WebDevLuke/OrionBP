// Define Breakpoints
// Create object which will feed into SASS and our JS Breakpoint Function

var bpObj = {
	convertToNum: function(){
		for(var key in this.data){
			this.data[key] = parseFloat(this.data[key]);
		}
		return this.data;
	},
	data: {}
};

/* inject: Breakpoints JSON */
/* endinject */

bpObj.convertToNum();

// Breakpoint detection function
// eg: if(bp("med")){
var bp = function(size){
	if(window.innerWidth >= bpObj["data"][size]) {
		return true;
	}
	else {
		return false;
	}
}

var bpMax = function(size){
	if(window.innerWidth <= bpObj["data"][size]) {
		return true;
	}
	else {
		return false;
	}
}

var bpBetween = function(from, to){
	if(window.innerWidth >= bpObj["data"][from] && window.innerWidth <= bpObj["data"][to]) {
		return true;
	}
	else {
		return false;
	}
}