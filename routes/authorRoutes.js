const express = require('express');
const authorController = require('../controllers/authorController');

const router = express.Router();

router
    .route('/')
    .get(authorController.getAllAuthors)
    .post(authorController.createAuthor);


module.exports = router