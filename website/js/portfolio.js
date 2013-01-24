$(document).ready(function() {
	// Pictures
	$(".item").mouseenter(function () {
		// If the descriptive cover is hidden
		if(!$(this).children(".cover").hasClass("hiddenV")) {
			// Display the desciptive cover
			$(this).siblings("div.cover").addClass("hidden");
		} else {
			// Hidden the desciptive cover
			$(this).children(".cover").removeClass("hiddenV");
		}
	}).mouseleave(function () {
		// Display the desciptive cover
		$(this).children(".cover").addClass("hiddenV");
	});
});