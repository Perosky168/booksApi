const mongoose = require('mongoose');
// const Author = require('./authorModels');

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'A book must have a name'],
            minLength: 10,
            maxLength: 13
        },
        price: {
            type: Number,
            required: [true, 'A book must have a price']
        },
        genre: {
            type: String,
            enum: ['fantasy', 'movie', 'educatio'],
            required: [true, 'A book must have a genre']
        },
        type: {
            type: String
        },
        publicationYear: {
            type: Date,
            required: [true, 'A book must have a publication Year']
        },
        ISBN: {
            type: String,
            required: [true, 'A book must have a ISBN number']
        },
        // author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
    }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book