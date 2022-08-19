const Book = require('../Models/bookModels');

exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            status: 'success',
            data: {
                result: books.length,
                books
            }
        });
    } catch (err) {
        err
    }
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
        err
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
        err
    };
};
