// Start the slider only when its modal is shown
$('.modal').on('show', function () {
	var idSlider = $(this).find(".nivoSlider").attr("id");
	$('#' + idSlider).nivoSlider({ effect: 'sliceDownLeft', pauseTime:5000, animSpeed: 200 });
	$('#' + idSlider).data('nivoslider').start();
});

// Stop the Slider when its modal is hidden
$('.modal').on('hidden', function () {
	var idSlider = $(this).find(".nivoSlider").attr("id");
	$('#' + idSlider).data('nivoslider').stop();
});