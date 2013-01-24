// Change Icons Pictures
function changeImage(path) {
	// Get the Image extension
	var posExt = path.lastIndexOf(".");
	var ext = path.slice(posExt, path.length);

	// Get the picture path (with name) without the extension
	var pathWithoutExt = path.slice(0, path.length - 4);
	var img;

	// If the path doesn't possess a "/"
	if (path.search("/") != -1) {
		img = pathWithoutExt;
	}
	// If the path possess one or several "/"
	else {
		var i, possibleImg;
		for (i = 0; i > (-pathWithoutExt.length); i--) {
			possibleImg = pathWithoutExt.slice(pathWithoutExt.length + i, pathWithoutExt.length);
			// If it possess a "/"
			if (possibleImg.search("/") != -1) {
				img = possibleImg.substring(1);
				break;
			}
		}
	}
	// If it possess a "1"
	if (img.search(1) != -1) {
		return path.slice(0, path.length - img.length - ext.length) + img.slice(0, img.length - 1) + ext; ; 
	} else {
		return path.slice(0, path.length - img.length - ext.length) + img + "1" + ext;
	}
}

$(document).ready(function() {
	$(".button").hover(function () {
		if(!$(this).hasClass("disabled")) {
			var img = $(this).attr("src");
			$(this).attr("src", changeImage(img));
		}
	});
});