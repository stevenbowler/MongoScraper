//@ts-check
/**
 * @module
 * @requires mongoose
 */
const mongoose = require('mongoose');

/**
 * @name Schema
 */
var Schema = mongoose.Schema;

/**
 * @namespace
 */
const BookSchema = new Schema({
    title: {
        type: String
    },
    link: {
        type: String
    },
    notes: [
        {
            // Store ObjectIds in the array
            type: Schema.Types.ObjectId,
            // The ObjectIds will refer to the ids in the Note model
            ref: "Note"
        }
    ]
});

var Book = mongoose.model('books', BookSchema);

module.exports = Book;