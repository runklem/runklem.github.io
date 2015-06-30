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

function search() {
    $("#search-second").keyup(function(){
 
        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val(), count = 0;
        filter = filter.replace(/\s/g, "");
 
 		// Loop through the comment list
        $(".blogpost").each(function(){
 
            // If the list item does not contain the text phrase fade it out
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();
 
            // Show the list item if the phrase matches and increase the count by 1
            } else {
                $(this).show();
                count++;
            }
        });
 
        // Update the count
        var numberItems = count;
        if (count > 0) {
        	$("#filter-count").show();
        	$("#filter-count").text("Number of Comments = "+count);
        } else {
        	$("#filter-count").hide();
        }
    });
}

function hideContentForSearch() {
	$("#search-second").focus(function() {
		$(".searchHide").hide();
	});
}

function showHiddenContent() {
	$("#search-second").focusout(function() {
		$("#search-second").val("");
		$(".searchHide").show();
		$("#filter-count").hide();

		$("#blog").empty();
		defaultPageLoad(postsPerPage);
	});
}

function useTopSearch() {
	$("#search2").keyup(function() {
		var input = $(this).val();
		$("#search-second").val(input);
		$("#search2").val("");
		$("#search-second").focus();
	});
}


//BASIC BLOG GENERATION
var postsPerPage = 5;

$(document).ready(defaultPageLoad(postsPerPage));
$(document).ready(getBlog(postsPerPage));

//SEARCH FUNCTIONALITY
$(document).ready(search());
$(document).ready(hideContentForSearch());
$(document).ready(showHiddenContent());
$(document).ready(useTopSearch());