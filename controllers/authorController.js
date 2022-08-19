const Author = require('../Models/authorModels');

exports.getAllAuthors = async (req, res, next) => {
    try {
        const authors = await Author.find();

        res.status(200).json({
            status: 'success',
            result: authors.length,
            data: {
                authors
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            err: {
                err
            }
        })
        console.error(err);
    }
};

exports.createAuthor = async (req, res, next) => {
    try {
        const author = await Author.create(req.body);

        res.status(200).json({
            status: 'success',
            data: {
                author
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
