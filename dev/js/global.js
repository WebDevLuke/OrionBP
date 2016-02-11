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
|--------------------------------------------------------------------
| GENERATE CURRENT YEAR
|--------------------------------------------------------------------
*/

var currentYear = (new Date).getFullYear();

$(document).ready(function() {
	$(".year").text( (new Date).getFullYear() );
});

console.log("hello");