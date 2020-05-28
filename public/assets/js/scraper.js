//@ts-check
/**
 * @module
 * @todo need to refactor
 */

// clear session storage, which is last id in Mongo chosen to see notes seesionStorage.getItem("seenotesid")
sessionStorage.clear();

/**
 * Onclick event button "Devour Burger" based on id of element. 
 * Update boolean devoured in MySQL record for this id.
 * @function
 * @name #scrape
 * @memberof module:public/assets/js/scraper
 * @event
 */
$("#scrape").on("click", function (event) {
    event.preventDefault();
    console.log(`arrived at #scrapeBooks onclick event`);
    // Get the ID by finding an element with a "name" attribute equal to the string "id"
    $.ajax("/scrape/", {
        type: "GET"

    }).then(
        function () {
            console.log("Scraped GoodReads, loaded Mongo");
            // Reload the page to get the updated list
            location.reload();
        }
    );
});



/**
 * Onclick event button ".deleteBook" based on id of element. 
 * Update boolean devoured in MySQL record for this id.
 * @function
 * @name .deleteBook
 * @memberof module:public/assets/js/scraper
 * @event
 */
$(".deleteBook").on("click", function (event) {
    event.preventDefault();
    console.log(`arrived at .deleteBook onclick event`);
    // Get the ID by finding an element with a "name" attribute equal to the string "id"
    var id = $(this).attr("deleteBookid");
    $.ajax("/deleteBook/" + id, {
        type: "DELETE"
    }).then(
        function (response) {
            console.log("updated id ", id);
            console.log("delete response", response);
            // Reload the page to get the updated list after deleting the row/title
            location.reload();
        }
    );
});



/**
 * Onclick event button "Save" book title and link based on id of element. 
 * @function
 * @name .saveBook
 * @memberof module:public/assets/js/scraper
 * @event
 */
$(".saveBook").on("click", function (event) {
    console.log(`arrived at .saveBook onclick event`);
    event.preventDefault();
    // Get the ID by finding an element with a "name" attribute equal to the string "id"
    var id = $(this).attr("bookid");
    console.log("id: ", id);
    var data = {
        //@ts-ignore
        title: $("#book" + id).text().trim(),
        link: $("#book" + id).attr("href")
    };
    $.ajax("/saveBook/", {
        type: "POST",
        data
    }).then(
        function (response) {
            console.log("updated id ", id);
            console.log("save response", response);
            // Reload the page to get the updated list after deleting the row/title
            location.reload();
        }
    );
});



/**
 * Onclick event button "Notes" based on id of element. 
 * Query notes related to this title: Opens modal to display notes if they exist
 * @function
 * @name .seeNotes 
 * @memberof module:public/assets/js/scraper
 * @event
 */
$(".seeNotes").on("click", function (event) {
    // if there was a previous choice then reset color of selected title
    if (sessionStorage.getItem("seenotesid")) $("#rowid" + sessionStorage.getItem("seenotesid")).css({ "background-color": "lightyellow" });
    // Get the ID from the button.
    var id = $(this).attr("seenotesid");
    sessionStorage.setItem("seenotesid", id);       // save in sessionStorage for when want to update this list of notes
    var title = $("#link" + id).text();              // Book title associated with notes displayed
    console.log("Title: ", title);
    $("#rowid" + id).css({ "background-color": "yellow" });
    $("#titleInput")
        .val(title)
        .attr("backgroundColor", "black")                   // Display chosen book title in Notes section
        .css({ "color": "yellow" });                   // Display chosen book title in Notes section
    // Send the get request.
    $.ajax("/seeNotes/" + id, {
        type: "GET"
    }).then(
        function (notesArrayResponse) {
            console.log("seeing notes for id ", id);
            console.log("seeNotes response: ", notesArrayResponse);
            buildNoteDiv(notesArrayResponse);
            // Reload the page to get the updated list
            // location.reload();
        }
    );
});


/**
 * Called from {@link .seeNotes}, {@link .deleteNote} or {@link .createNote} event to load notes collection for this book
 * Takes notesArrayResponse and loads to notes div on index.handlebars
 * @function
 * @name buildNoteDiv
 * @param {Array<object>} notesArrayResponse 
 */
const buildNoteDiv = (notesArrayResponse) => {
    let notes = $("#notes")
    notes.empty();
    if (notesArrayResponse.length === 0) {
        notes.val("no notes to display");
    } else {
        var notediv = notesArrayResponse.map(note => {
            var title = $("<p>");
            title.html("<i style='color:yellow';>Title: </i>" + note.title);
            var body = $("<p>");
            body.html("<i style='color:yellow';>Note: </i>" + note.body);

            var deleteButton = $("<button>");
            deleteButton
                .attr("deleteNoteId", note._id)
                .attr("margin", 5)
                .text("Delete")
                .addClass("deleteNote btn btn-outline-danger");
            var thisdiv = $("<div>");
            thisdiv.append(title, body, deleteButton)
                .attr("id", "noteId" + note.id)
                .addClass("noteDiv");
            return thisdiv;
        });
        notes.append(notediv);
        $("#noteTitleInput").val("");
        $("#bodyInput").val("");
    }
}




/** 
 * Onclick Event to create a Note, must have 
 * @function
 * @name #createNote 
 * @memberof module:public/assets/js/scraper
 * @event
 */
$("#createNote").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    if (sessionStorage.getItem("seenotesid") != undefined) var id = sessionStorage.getItem("seenotesid");
    else {
        console.log("no title chosen, session variable seeNotesid undefined");
        $("#bodyInput").text("no title chosen, click note button on left");
        return;
    }
    var newNote = {
        //@ts-ignore
        title: $("#noteTitleInput").val().trim(),
        // @ts-ignore
        body: $("#bodyInput").val().trim()
    };

    // Send the POST request.
    $.ajax("/createNote/" + id, {
        type: "POST",
        data: newNote
    }).then(
        function (createNoteResponse) {
            console.log("created new note");
            // Reload the note div with the updated list
            buildNoteDiv(createNoteResponse);
            // location.reload();
        }
    );
});



/** 
 * Onclick event button "Delete a Book" in to Mongo Notes Collection.
 * Update MySQL record for this id.
 * @function
 * @name .deleteNote 
 * @memberof module:public/assets/js/scraper
 * @event
 */
$(document).on("click", ".deleteNote", function (event) {
    console.log("arrived at deleteNote");
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var id = $(this).attr("deleteNoteId");
    var bookId = sessionStorage.getItem("seenotesid");
    // Get the ID by finding an element with a "name" attribute equal to the string "id"
    //@ts-ignore
    console.log(`id ${id}`);

    // Send the DELETE request.
    $.ajax("/deleteNote/" + id + "/" + bookId, {
        type: "DELETE"
    }).then(
        function (deleteNoteResponse) {
            console.log("updated note id ", id);
            console.log("deleteNoteResponse", deleteNoteResponse);
            buildNoteDiv(deleteNoteResponse);
            // $("#noteId" + id).empty();
            // Reload the page to get the updated list
            // location.reload();
        }
    );
});




/** 
 * Onclick event button "Update a note" in to Mongo Book Notes collection.
 * Update Mongo books document for this id.
 * @function
 * @name .updateNote 
 * @memberof module:public/assets/js/scraper
 * @event
 */
$("#updateNote").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    // Get the ID by finding an element with a "name" attribute equal to the string "id"
    //@ts-ignore
    var id = $("[name=id]").val().trim();
    console.log(`id ${id}`);

    var updatedNote = {
        //@ts-ignore
        body: $("#updateNote [name=bookid]").val().trim()
    };
    console.log(`updatedNote ${updatedNote}`);
    // Send the PUT request.
    $.ajax("/updateNote/" + id, {
        type: "PUT",
        data: updatedNote
    }).then(
        function () {
            console.log("updated id ", id);
            // Reload the page to get the updated list
            location.reload();
        }
    );
});
