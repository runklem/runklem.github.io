function pager(pages) {
	$("#pag").bootpag({
		total: pages
	}).on("page", function(event, num){
	 	$(".content").html("Page" + num);
	});
}

function getblog(postsPerPage) {
	//GET JSON
	$.getJSON('entries.json', function(jd) {
	
	//ESTABLISH TOTAL NUMBER OF ENTRIES
	var entries = [];
	for (var i = 0; i < jd.entries.length; i++) {
		var key = i;
		var date = jd.entries[i].date;
		var title = jd.entries[i].title;
		var text = jd.entries[i].text;
		entries.push(key);
	}

	//PROGRAMMATICALLY SET NUMBER OF PAGES
	var pages = Math.floor(entries.length / postsPerPage);
	pages += 1;
	
	//PAGER() INSIDE GETBLOG  ** with content generation inside "pager" code **  TO ACCESS "NUM"
	$("#pag").bootpag({
		total: pages
	}).on("page", function(event, num){
	 	$(".content").html("Page" + num);
	 	console.log(num);

	//CLEAR PREVIOUS POSTS
	$("#blog").empty();
	
	//ADD BLOG POSTS
	var startIndex = (num - 1) * postsPerPage;
	var finishIndex = startIndex + (postsPerPage - 1);

	for (var i = startIndex; i <= finishIndex; i++) {
		var key = i;
		var date = jd.entries[i].date;
		var title = jd.entries[i].title;
		var text = jd.entries[i].text;

		$("#blog").append("<div id=" +key+ " class='col-sm-12 blogpost'><small><p id='date' class='muted' style='float:right;'>" +date+ " </p></small><h5 id='title'>" +title+ " </h5><p id='blogpost'>" +text+ " </p><hr/></div>");
	}
	});

	pager(pages)

	});
}


$(document).ready(getblog(5));