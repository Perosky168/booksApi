const jwt = require('jsonwebtoken');

const User = require('../Models/userModel');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statuscode, res) => {
    const token = signToken(user.id);
    const cookiesOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.cookie('jwt', token, cookiesOptions);

    user.password = undefined

    res.status(statuscode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
};

exports.signUp = async (req, res, next) => {
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    });

    createSendToken(newUser, 201, res)
};
