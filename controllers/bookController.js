const Book = require('../Models/bookModels');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllBooks = catchAsync(async (req, res, next) => {
    // 1A) Filtering
    const queryObj = { ...req.query }
    const excludedObj = ['sort', 'page', 'limit', 'fields']
    excludedObj.forEach(el => delete queryObj[el])

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    console.log(req.query)
    let query = Book.find(JSON.parse(queryStr));


    // 2) Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    }

    // 3) LimitFields
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        query = query.select(fields)
    } else query = query.select('-__v')

    // 4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100
    const skip = (page - 1) * limit

    query = query.skip(skip).limit(limit);

    const books = await query
    res.status(200).json({
        status: 'success',
        data: {
            result: books.length,
            books
        }
    });
});

exports.getBook = catchAsync(async (req, res, next) => {
    const book = await Book.findById(req.params.id).populate({ path: 'reviews' })

    if (!book) {
        return next(new AppError('their is no book with this Id', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    })
});

exports.createBook = catchAsync(async (req, res, next) => {
    const book = await Book.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    });
});

exports.updateBook = catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!book) {
        return next(new AppError('their is no book with this Id', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    });
});

exports.deleteBook = catchAsync(async (req, res, next) => {

    const book = await Book.findByIdAndDelete(req.params.id)
    if (!book) {
        return next(new AppError('their is no book with this Id', 404))
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
});

exports.getBookStats = catchAsync(async (req, res, next) => {
    const stats = await Book.aggregate([
        {
            $match: { price: { $gt: 150 } }
        },
        {
            $group: {
                _id: '$level',
                numBooks: { $sum: 1 },
                avgRating: { $avg: '$avrageRating' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    });
});
