const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A book must have a name']
        },
        Author: {
            type: String,
            numberOfBooks: Number,
        },
        genre: {
            type: String,
            enum: ['fantasy', 'movie', 'educatio'],
            required: false
        },
        type: {
            type: String
        },
        publicationYear: {
            type: Date
        },
    }
);

const Book = mongoose.Model('Book', bookSchema);

module.exports = Book