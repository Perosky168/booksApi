const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');

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
            required: [true, 'please provide a username'],
            maxLength: 15,
            minLength: 5
        },
        password: {
            type: String,
            required: [true, 'please provide a password'],
            minLength: [8, 'password must have atleast 8 characters'],
            select: false
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
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        active: {
            type: Boolean,
            default: true,
            select: false
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    // hash the password with the cost of 12
    this.password = await bcrypt.hash(this.password, 12)

    // the confirm password is not needed
    this.confirmPassword = undefined
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now();
    next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return bcrypt.compare(candidatePassword, userPassword)
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        return JWTTimestamp < changedTimestamp;
    }

    return false
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken

}

const User = mongoose.model('User', userSchema);

module.exports = User
