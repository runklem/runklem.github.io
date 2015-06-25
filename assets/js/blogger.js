function getblog() {
	$.getJSON('entries.json', function(jd) {

		for (var i = 0; i < jd.entries.length; i++) {
			var key = i;
			var date = jd.entries[i].date;
			var title = jd.entries[i].title;
			var text = jd.entries[i].text;

			$("#blog").append("<div id=" +key+ " class='col-sm-12 blogpost'><small><p id='date' class='muted' style='float:right;'>" +date+ " </p></small><h5 id='title'>" +title+ " </h5><p id='blogpost'>" +text+ " </p><hr/></div>");
		}
	});
}

$(document).ready(getblog);