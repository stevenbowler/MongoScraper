//@ts-check
/**
 * @module
 * @requires express
 * @see {@link https://www.npmjs.com/package/express}
 * @requires cheerio
 * @requires axios
 * @requires module:models/
 * @todo Refactor: Async return problem with function getNotesArray doesn't return Array to seeNotes, createNote, deleteNote May 27, 2020
 */

// Dependencies
var express = require("express");
// var mongojs = require("mongojs");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

// Initialize Express
var router = express();

// Database configuration
// Save the URL of our database as well as the name of our collection
const { Book, Note } = require('../models/');



/**
 *  Scrape goodreads.com and display, random choice of viable categories to scrape
 * @function
 * @name get/scrape
 * @memberof module:controller/routes
 * @param {string} path - /
 * @returns {object} Returns unique hbsObject
 */
router.get("/scrape/:id", function (req, res) {
    var id = req.params.id;
    // These are valid topics that the goodreads.com will search/scrape
    var bookShelfTopic = ["fiction", "fantasy", "non-fiction", "classics", "science-fiction", "audiobook", "novels", "science", "humor", "literature", "psychology",
        "politics", "school", "dystopia", 'self-help', 'read-for-school', "health", "medical", "popular-science", "skepticism"];

    var randomShelfTopic = bookShelfTopic[Math.floor(Math.random() * bookShelfTopic.length)];
    console.log("randomShelfTopic", randomShelfTopic);
    // var url = `https://www.goodreads.com/shelf/show/${randomShelfTopic}`;
    var url = `https://www.goodreads.com/shelf/show/${id}`;
    var results = [];
    var i = 0;

    // Make a request via axios to grab the HTML body from the site of your choice
    axios.get(url).then(function (response) {

        var $ = cheerio.load(response.data);    // load cheerio for parsing

        $("a.bookTitle").each(async function (i, element) {

            var title = $(element).text();
            var link = "https://www.goodreads.com" + $(element).attr("href");

            results.push({
                _id: i + 1,
                title: title,
                link: link
            });
            i++;

        });

        var hbsObject = {
            book: results
        }
        // console.log("hbsObject", hbsObject);
        res.render("scrape", JSON.parse(JSON.stringify(hbsObject)));  // res.render("index", hbsObject); // doesn't work
    });
});




/**
 * Root: Displays currently saved favorite books
 * @function
 * @name get/
 * @memberof module:controller/routes
 * @param {string} path - /
 * @returns {object} Returns unique book
 */
router.get("/", async function (req, res) {

    try {
        const book = await Book.find({});
        // res.send(book);
        var hbsObject = {
            book
        };
        res.render("index", JSON.parse(JSON.stringify(hbsObject)));
        // console.log(book);
    }
    catch (err) {
        console.log(err);
    }
});




/**
 * Add a book to the saved list in Mongo DB
 * @function
 * @name post/saveBook
 * @memberof module:controller/routes
 * @param {string} path - /savedBook
 * @returns {object} Returns unique savedBook
 */
router.post("/saveBook", async function (req, res) {
    var title = req.body.title;
    var link = req.body.link;
    try {
        const book = new Book({
            title: title,
            link: link
        });
        var savedBook = await book.save();
        res.send(savedBook);
    }
    catch (err) {
        console.log(err);
    }
});



/**
 * Delete a book from the saved list in Mongo DB
 * @function
 * @name delete/deleteBook/:id
 * @memberof module:controller/routes
 * @param {string} path - /deleteBook/:id
 * @returns {object} Returns unique book response object from Mongo
 */
router.delete("/deleteBook/:id", async function (req, res) {
    var id = req.params.id;
    console.log("delete this id: ", id);
    try {
        const book = await Book.remove({
            _id: id
        });
        res.send(book);
        console.log(book);
    }
    catch (err) {
        console.log(err);
    }
});



/**
 * Same as "/" route, may yet delete
 * @function
 * @name get/all
 * @memberof module:controller/routes
 * @param {string} path - /all
 * @returns {object} Returns unique book
 */
router.get("/all", async function (req, res) {

    try {
        const book = await Book.find({});
        // res.send(book);
        var hbsObject = {
            book
        };
        res.render("index", hbsObject);
        // console.log(book);
    }
    catch (err) {
        console.log(err);
    }
});


var thisArray;

/**
 * Get notes associated with a book and return notesArray
 * @function
 * @name getNotesArray
 * @param {string} id 
 * @returns notesArray
 */
const getNotesArray = async (id) => {
    // try {
    // var thisArray =
    Book.findOne({ _id: id })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function (bookResponse) {
            var notesArray = bookResponse.notes;
            console.log("notesArray: ", notesArray);
            Note.find({ _id: { $in: notesArray } })
                .then(function (notesArrayResponse) {
                    console.log("notesArrayResponse: ", notesArrayResponse);
                    thisArray = notesArrayResponse;
                    // return notesArrayResponse;
                })
                .catch(function (err) {
                    return err;
                    // If we were able to successfully find an Article with the given id, send it back to the client
                })
                .finally(function () {
                    console.log("thisArray not defined?: ", thisArray);
                    // return thisArray;
                })
                ;

        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            console.log(err);
            return err;
        })
        ;

}


/**
 * Root: Displays currently saved favorite books
 * @function
 * @name get/seeNotes
 * @memberof module:controller/routes
 * @param {string} path - /seeNotes
 * @returns {object} Returns unique book
 */
router.get("/seeNotes/:id", async function (req, res) {
    var id = req.params.id;
    // var response = getNotesArray(id).then(function(){
    //     console.log("getNotesArray", response);
    //     res.json(response);
    // });
    Book.findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function (bookResponse) {
            var notesArray = bookResponse.notes;
            console.log("notesArray: ", notesArray);
            Note.find({ _id: { $in: notesArray } })
                .then(function (notesArrayResponse) {
                    console.log("notesArrayResponse: ", notesArrayResponse);
                    res.json(notesArrayResponse);
                })
                .catch(function (err) {
                    res.json(err);
                });
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            console.log(err);
            res.json(err);
        });

});


/**
 * Root: Displays currently saved favorite books
 * @function
 * @name post/createNote
 * @memberof module:controller/routes
 * @param {string} path - /createNote
 * @returns {object} Returns unique book
 */
router.post("/createNote/:id", async function (req, res) {
    var id = req.params.id;
    console.log("req.body: ", req.body);
    try {
        const note = new Note({
            title: req.body.title,
            body: req.body.body,
        });
        var savedNote = await note.save();
        try {
            var bookNote = await Book.findOneAndUpdate({ _id: id }, { $push: { notes: savedNote._id } }, { new: true });
            console.log("bookNote added: ", bookNote);
        }
        catch (err) {
            console.log(err);
        }
        // res.send(id);
        console.log("/createNote/:id  notes", note);
    }
    catch (err) {
        console.log(err);
    }

    //this is really ugly, can't yet get async to work so duplicating code 3 times to get display notes 
    Book.findOne({ _id: id })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function (bookResponse) {
            var notesArray = bookResponse.notes;
            console.log("notesArray: ", notesArray);
            Note.find({ _id: { $in: notesArray } })
                .then(function (notesArrayResponse) {
                    res.json(notesArrayResponse);
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    res.json(err);
                    // If we were able to successfully find an Article with the given id, send it back to the client
                });
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            console.log(err);
            res.json(err);
        });
});



/**
 * Delete a book from the saved list in Mongo DB
 * @function
 * @name deleteNote/:id
 * @memberof module:controller/routes
 * @param {string} path - /deleteBook/:id
 * @returns {object} Returns unique Note delete response object from Mongo
 */
router.delete("/deleteNote/:id/:bookId", async function (req, res) {
    var id = req.params.id;
    var bookId = req.params.bookId;
    console.log("delete this id: ", id);
    try {
        const note = await Note.remove({
            _id: id
        });
        console.log("confirmation of delete: ", note);
    }
    catch (err) {
        console.log(err);
    }


    //this is really ugly, can't yet get async to work so duplicating code 3 times to get display notes 
    Book.findOne({ _id: bookId })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function (bookResponse) {
            var notesArray = bookResponse.notes;
            console.log("notesArray: ", notesArray);
            Note.find({ _id: { $in: notesArray } })
                .then(function (notesArrayResponse) {
                    res.json(notesArrayResponse);
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    res.json(err);
                    // If we were able to successfully find an Article with the given id, send it back to the client
                });
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            console.log(err);
            res.json(err);
        });
});



/**
 * Scrape and load goodreads.com, use "history" of viable categories to scrape and load Mongo
 * called only once from the browser just to load something into Mongo Atlas as "Saved"
 * @function
 * @name get/scrapeLoad
 * @memberof module:controller/routes
 * @param {string} path - /scrapeLoad
 * @returns {object} Returns unique savedBook
 */
router.get("/scrapeLoad", function (req, res) {

    var url = "https://www.goodreads.com/shelf/show/history";
    var results = [];

    // Make a request via axios to grab the HTML body from the site of your choice
    axios.get(url).then(function (response) {

        var $ = cheerio.load(response.data);

        $("a.bookTitle").each(async function (i, element) {

            var title = $(element).text();
            var link = "https://www.goodreads.com" + $(element).attr("href");

            try {
                const book = new Book({
                    title: title,
                    link: link
                });
                var savedBook = await book.save();
                // res.send(book);
                console.log(savedBook);

                // Save these results in an object, just used for testing content
                results.push({
                    savedBook
                });

            }
            catch (err) {
                console.log(err);
            }
        });

    });

});


module.exports = router;
