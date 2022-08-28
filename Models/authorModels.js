const mongoose = require('mongoose');
const Book = require('./bookModels');

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
        books: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
            }
        ]
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

const virtualName = authorSchema.virtual('name');
virtualName.get(function () {
    return `${this.firstName} ${this.lastName}`;
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author
