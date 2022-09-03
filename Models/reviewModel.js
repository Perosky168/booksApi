const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: [true, 'A review cannot be empty']
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            // required: [true, 'Review must belong to a tour.']
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            // required: [true, 'Review must belong to a user.']
        }
    }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;