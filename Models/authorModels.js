const mongoose = require('mongoose');
// const Book = require('./bookModels');

const authorSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'an author must have a name']
        },
        lastName: {
            type: String,
            required: [true, 'an author must have a last name']
        },
    }
);

const Author = mongoose.model('Author', authorSchema);

module.exports = Author
