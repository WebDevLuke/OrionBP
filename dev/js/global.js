/*
|--------------------------------------------------------------------
| SMOOTH SCROLL MODULE
|--------------------------------------------------------------------
*/

	var jump=function(e)
	{
		//Get the target
		var target = $(this).attr("href");
	
		// Check the target is actually on this page
		if ($(target).length)
		{
			//prevent the "normal" behaviour which would be a "hard" jump
			e.preventDefault();
		
			// perform animated scrolling
			$('html,body').animate(
			{
				// get top-position of target-element and set it as scroll target
				scrollTop: $(target).offset().top
			},1500,function(){});
		}
	}

	$(document).ready(function()
	{
		$('a[href*=#]').bind("click", jump);
		return false;
	});


/*
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| IF IE 10 or 11 append stylesheet
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
*/

// function GetIEVersion() {
// 	var sAgent = window.navigator.userAgent;
// 	var Idx = sAgent.indexOf("MSIE");

// 	// If IE, return version number.
// 	if (Idx > 0)
// 		return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

// 	// If IE 11 then look for Updated user agent string.
// 	else if (!!navigator.userAgent.match(/Trident\/7\./))
// 		return 11;
// 	else
// 		return 0; // It is not IE
// }


// if (GetIEVersion() === 10 || GetIEVersion() === 11 ) {
// 	$('head').append('<link rel="stylesheet" type="text/css" href="css/ie.css">');
// }

/*
|--------------------------------------------------------------------
| GENERATE CURRENT YEAR
|--------------------------------------------------------------------
*/

var currentYear = (new Date).getFullYear();

$(document).ready(function() {
	$(".year").text( (new Date).getFullYear() );
});