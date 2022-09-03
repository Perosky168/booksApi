const mongoose = require('mongoose');

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
            enum: ['fantasy', 'love', 'crime', 'action'],
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
            maxLength: 13,
            unique: true
        },
        avrageRating: {
            type: Number
        },
        level: {
            type: String,
            enum: ['easy', 'intermediate', 'difficult']
        },
        author: String,
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Virtual populate
bookSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'book',
    localField: '_id'
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book