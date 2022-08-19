const express = require('express');
const bookRouter = require('./routes/bookRoutes');
const authorRouter = require('./routes/authorRoutes');

const app = express();

app.use(express.json());

app.use('/api/v1/books', bookRouter);
app.use('/api/v1/authors', authorRouter);

module.exports = app
