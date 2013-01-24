// Find the next Interest in the Array and replace the old one with this one
function changeInterest() {
	count++;
	if (count == arrayInterests.length) {
		count = 0;
	}
	$("#interets").html(arrayInterests[count]);
}

$(document).ready(function() {
	// Global var
	count = 0;
	arrayInterests = new Array("Windows 8", "Design", "Html 5", "SEO", 
									"Php", "Scrum", "C++", "CSS 3", "Symfony 2", 
									"Metro", "ASP.NET MVC", "jQuery", "Windows Phone",
									"JavaScript");

	setInterval(function(){changeInterest()},3000);
});