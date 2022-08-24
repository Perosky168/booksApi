const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            unique: true,
            required: [true, 'A user must provide a username'],
            maxLength: 15,
            minLength: 5
        },
        password: {
            type: String,
            required: [true, 'ple provide a password'],
            minLength: 8
        },
        confirmPassword: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                validator: function (el) {
                    return el === this.password
                },
                message: 'Password are not the same'
            }
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, 'please input your email'],
            validate: [validator.isEmail, 'please provide a valid email'],
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastNane}`
});

const User = mongoose.model('User', userSchema);

module.exports = User
