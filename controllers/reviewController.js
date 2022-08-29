const Review = require('../Models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setBookUserIds = (req, res, next) => {
    if (!req.body.book) req.body.book = req.params.bookId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
}

exports.createReview = catchAsync(async (req, res, next) => {
    const review = await Review.create();

    res.status(201).json({
        status: 'success',
        data: {
            review
        }
    });
});