module.exports = (function(){

	/*
	|--------------------------------------------------------------------
	| GENERATE CURRENT YEAR
	|--------------------------------------------------------------------
	*/	

	var year = document.querySelector(".year");	
	year.innerText = (new Date).getFullYear();

})();