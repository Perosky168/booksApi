const express = require('express');

const bookController = require('../controllers/bookController');
const authController = require('../controllers/authController');
const reviewRouter = require('../routes/reviewRoutes');

const router = express.Router();

router.use('/:bookId/reviews', reviewRouter)

router.route('/stats').get(bookController.getBookStats)

router
    .route('/')
    .get(authController.protect, bookController.getAllBooks)
    .post(bookController.createBook);

router
    .route('/:id')
    .get(bookController.getBook)
    .patch(bookController.updateBook)
    .delete(bookController.deleteBook);

module.exports = router;