const Author = require('../Models/authorModels');

exports.getAllAuthors = async (req, res, next) => {
    try {
        const queryObj = { ...req.query }
        const excludedObj = ['sort', 'limit', 'fields', 'page'];
        excludedObj.forEach(el => delete queryObj[el])

        const authors = await Author.find(queryObj);

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
