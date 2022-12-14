const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
    const message = `invalid ${err.path}: ${err.value}`
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.keyValue.title
    const message = `Duplicate fiels value: ${value}, please use another value`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message)

    const message = 'Invalid input data: ' + errors.join(', ')
    return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        //1) Log error
        console.error('ERROR 💥');

        res.status(500).json({
            // status: 'error',
            // message: 'Something went very wrong'
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack

        });
    }
};

module.exports = (err, req, res, next) => {
    //console.log(err.stack);

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === 'production') {
        let error = JSON.parse(JSON.stringify(err));
        const errors = Object.values(error.errors).map(el => el.message)
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

        sendErrorProd(error, res)
    }
};
