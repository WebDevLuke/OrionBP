// Define Breakpoints
// Create object which will feed into SASS and our JS Breakpoint Function

var breakpoints = {
	data: {
		xxlrg: 1366,
		xlrg: 1280,
		lrg: 925,
		med: 640,
		sml: 480,
		xsml: 370,
		testZZZ: 100
	},
	convertToPX: function(){
		this.pxData = this.data;
		for(key in this.pxData){
		 	this.pxData[key] += "px";
		}
		return this.pxData;
	}
};

// Breakpoint detection function
// var bp = function(size){	
// 	var sizes = {"xxlrg" : 1366, "xlrg" : 1280, "lrg" : 924, "med" : 640, "sml" : 480, "xsml" : 360};
// 	if(window.innerWidth <= sizes[size]){
// 		return true;
// 	}
// 	else {
// 		return false;
// 	}
// };

// var bp = function(size){
// 	if(window.innerWidth <= breakpoints[size]){
// 		return true;
// 	}
// 	else {
// 		return false;
// 	}
// }