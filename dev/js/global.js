/*
|--------------------------------------------------------------------
|  PROJECT CODE
|--------------------------------------------------------------------
*/

// Bind querySelector for jQuery-esq selection method
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

if(bp("med")){
    console.log("med hit");
    // Do other stuff
}
else {
	console.log("ERROR");
}

console.log(bpObj);