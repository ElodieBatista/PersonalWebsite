// Check if every field are filled
function isFilled () {
	var count = 0;
	$(".toFill").each(function(index) {
		if($(this).attr("value") == "") {
			count++;
		}
   	});
	return count;
}

$(document).ready(function() {
	$("#send").click(function () {
		var essai = isFilled();
		if (essai > 0) {
			alert("Veuillez renseigner tous les champs.");
		} else {
			var myChaine = "mailto:elodie.batista@supinfo.com?subject=" + $("#subject").attr("value") + "&body=" + $("#msgBody").attr("value") + "     " + $("#name").attr("value");
			document.sendEmail.action = myChaine;
			document.sendEmail.submit();
		}
	});
});