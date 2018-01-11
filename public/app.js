$(document).ready(() => {
    //scrape articles on click
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
                    "<div class=\"card\" data-id=\"" + response[i]._id + "\">" + 
                        "<div class=\"card-body\">" + 
                            "<div class=\"card-header\">" + 
                                "<div class='row'>" + 
                                    "<div class='col-sm-12'>" + 
                                        "<a href=\"" + response[i].link + "\"><h3 class=\"card-title\">" + response[i].title + "</h3></a>" +
                                    "</div>" + 
                                "</div>" +
                            "</div>" + 
                            "<div class=\"card-block\">" +
                                "<div class='row summaryRow'>" + 
                                    "<div class='col-sm-12'>" + 
                                        "<p class=\"card-text\">" + response[i].summary + "</p>" + 
                                    "</div>" +
                                "</div>" +
                                "<div class='row savedNotesRow'>" + 
                                    "<div class='col-sm-12'>" + 
                                        "<ul class='list-group note-container'>" + 
                                            "<li class='list-group-item'>No notes for this article yet.</li>" +
                                        "</ul>" +
                                    "</div>" +
                                "</div>" +
                                "<div class='row newNoteRow'>" + 
                                    "<div class='col-sm-12'>" + 
                                        "<textarea placeholder='New Note' rows='4' cols='60'></textarea>" + 
                                    "</div>" +
                                "</div>" +
                                "<div class='row'>" + 
                                    "<div class='col-sm-12'>" +
                                        "<button type='button' class='btn btn-primary float-right' id='note_button' data-toggle='modal' data-target='#note-modal'>Save Note</button>" +
                                    "</div>" +
                                "</div>" +
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

    //add note on click
    $("body").on("click", "#note_button", function(event) {
        event.preventDefault();
        let article = $(this).closest(".card").data();
        let note = $(this).closest(".card").find("textarea").val();

        $.ajax({
            type: "POST",
            url: "/articles/" + article.id,
            data: {
                body: note
            }
        }).done(function(response) {
            console.log(response);
        });
    });
});