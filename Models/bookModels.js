const mongoose = require('mongoose');
const Author = require('./authorModels');

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'A book must have a name'],
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
            required: [true, 'A book must have a ISBN number'],
            minLength: 10,
            maxLength: 13
        },
        avrageRating: {
            type: Number
        },
        level: {
            type: String,
            enum: ['easy', 'intermediate', 'difficult']
        },
        author: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Author',
                required: [true, 'A book must have an author']
            }
        ],
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review',

            }
        ]
    }
);

bookSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'author',
        select: 'firstName'
    })
    next();
});

bookSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'reviews',
        select: '-__V'
    });
    next();
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book