const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.protect, authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

router.patch('/updatePassword', authController.protect, authController.updatePassword);

router.route('/').get(userController.getAllUser)

module.exports = router;