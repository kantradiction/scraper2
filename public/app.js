$(document).ready(() => {
    //scrape articles on click
    $("#scrape_articles").on("click", ()=> {
        $.ajax({
            url: "/scrape",
        }).done({function(response) {
        }});
    });

    //load documents on load
    $.ajax({
        url: "/articles"
    }).done(function(response) {
        //get notes from the article


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
                                        "<button type='button' class='btn btn-primary float-right' id='note_button'>Save Note</button>" +
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>" + 
                    "</div>" + 
                "</div>"
            );

        //search for one article to return the notes
        $.ajax({
            url: "/articles/" + response[i]._id,
            type: "GET"
        }).done(function(dbArticle) {
            
            //if the article has any notes
            if (dbArticle.note.length > 0 ) {
                //clear the savednotescontainer
                $(".card[data-id='" + dbArticle._id + "'] .savedNotesRow ul").html("");
                for ( var x = 0; x < dbArticle.note.length; x++) {
                    //append the note to the savedNotesRow of the article
                    $(".card[data-id='" + dbArticle._id + "'] .savedNotesRow ul").append(
                        "<li class='list-group-item' data-id=" + dbArticle.note[x]._id + ">" + 
                            "<div class='col-sm-9'>" +
                                dbArticle.note[x].body + 
                            "</div>" + 
                            "<div class='col-sm-3'>" + 
                                "<button type='button' class='btn btn-danger float-right' id='delete_note_button'>Delete Note</button>" +
                            "</div>" + 
                        "</li>"

                    );
                }
            }
            
            /*$(".card[data-id='" + response[i]._id + "']").append(
                "<li class='list-group-item'>" + dbArticle.note + "</li>"
            );*/
            /*for (var i = 0; i < dbArticle.note.length; i++) {
                //append the note to the savedNotesRow
                $(".savedNotesRow ul").append(
                    "<li class='list-group-item'>" + dbArticle.note[i] + "</li>"
                );
            }*/
        });

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
        let article = $(this).closest(".card").data();
        let note = $(this).closest(".card").find("textarea").val();

        $.ajax({
            type: "POST",
            url: "/articles/" + article.id,
            data: {
                body: note
            }
        }).done(function(response) {
        });

        window.location.reload(true);
    });

    //delete note on click
    $("body").on("click", "#delete_note_button", function(event) {

        let note = $(this).closest(".list-group-item").data();
        let card = $(this).closest(".card").data();

        $.ajax({
            type: "POST",
            url: "/note/delete/" + note.id,
            data: card
        }).done(function(response) {
            window.location.reload();
        });
        window.location.reload(true);
    });
});