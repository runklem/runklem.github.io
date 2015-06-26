/*  PAGER FUNCTION IS IN GETBLOG(), SO "NUM" VALUE CAN BE REFERENCED
function pager(pages) {
	$("#pag").bootpag({
		total: pages
	}).on("page", function(event, num){
	 	$(".content").html("Page" + num);
	});
}
*/

function defaultPageLoad(postsPerPage) {
	$.getJSON('entries.json', function(jd) {	
	for (i = 0; i <= (postsPerPage - 1); i++) {
		var key = i;
		var date = jd.entries[i].date;
		var title = jd.entries[i].title;
		var text = jd.entries[i].text;

		$("#blog").append("<div id=" +key+ " class='col-sm-12 blogpost'><small><p id='date' class='muted' style='float:right;'>" +date+ " </p></small><h5 id='title'>" +title+ " </h5><p id='blogpost'>" +text+ " </p><hr/></div>");			
	}
	});
}

function getSelection() {

}

function getBlog(postsPerPage) {
	//GET JSON
	$.getJSON('entries.json', function(jd) {
	
	//ESTABLISH TOTAL NUMBER OF ENTRIES
	var entries = [];
	for (var i = 0; i < jd.entries.length; i++) {
		var key = i;
		entries.push(key);
	}

	//PROGRAMMATICALLY SET NUMBER OF PAGES
	if (entries.length % postsPerPage === 0) {
		var pages = entries.length / postsPerPage;
	} else {
		var pages = Math.floor(entries.length / postsPerPage);
		pages += 1;
	}
	
	//PAGER() INSIDE GETBLOG()  ** with CLEAR & ADD POSTS inside "pager" code **  TO ACCESS "NUM"
	$("#pag").bootpag({
		total: pages
	}).on("page", function(event, num){
	 	$(".content").html("Page" + num);
	 	
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
	});
}


var postsPerPage = 5;

$(document).ready(defaultPageLoad(postsPerPage));
$(document).ready(getBlog(postsPerPage));