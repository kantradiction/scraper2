$(document).ready(() => {
    $("#scrape_articles").on("click", ()=> {
        $.ajax({
            url: "/scrape"
        }).done({function(response) {
            console.log(response);
        }});
    });
    //load documents on load
    $.ajax({
        url: "/articles"
    }).done(function(response) {
        // Grab the articles as a json
        for (var i = 0; i < response.length; i++) {
            $("#card_row").append(
                "<div class=\"col-sm-12\">" +
                    "<div class=\"card\" data-id=\"" + response[i].id + "\">" + 
                        "<div class=\"card-body\">" + 
                            "<div class=\"card-header\">" + 
                                "<a href=\"" + response[i].link + "\"><h3 class=\"card-title\">" + response[i].title + "</h3></a>" +
                            "</div>" + 
                            "<div class=\"card-block\">" +
                                "<p class=\"card-text\">" + response[i].summary + "</p>" + 
                                "<a href=# class=\"btn btn-primary\">Save Article</a>" +
                            "</div>" +
                        "</div>" + 
                    "</div>" + 
                "</div>"
            );
        }
        // $.getJSON("/articles", function(data) {
        //     // For each one
        //     for (var i = 0; i < data.length; i++) {
        //     // Display the apropos information on the page
        //     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
        //     }
        // });
    });
});