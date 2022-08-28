const User = require('../Models/userModel');

exports.getAllUser = async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    });
};
