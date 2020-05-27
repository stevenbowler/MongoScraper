const mongoose = require('mongoose');

var Schema = mongoose.Schema;


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