const Book = require('../Models/bookModels');

exports.getAllBooks = async (req, res, next) => {
    try {
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
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            err: {
                err
            }
        });
    };
};

exports.getBook = async (req, res, next) => {
    const tour = await Book.findById(req.params.id)

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
};

exports.createBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);

        res.status(200).json({
            status: 'success',
            data: {
                book
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            err: {
                err
            }
        });
    }
};

exports.updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                book
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            err: {
                err
            }
        });
    };
};

exports.deleteBook = async (req, res, next) => {
    try {
        await Book.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            err: {
                err
            }
        });
    }
};
