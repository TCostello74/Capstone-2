const express = require('express');
const ExpressError = require("./expressError");
require('dotenv').config();
const cors = require('cors');
const { authenticateJWT } = require("./middleware/auth")

const app = express();

app.use(express.json());
app.use(authenticateJWT);
app.use(cors());

const userRoutes = require('./routes/users');
const characterRoutes = require('./routes/characters');
const quotesRoutes = require('./routes/quotes');
const moviesRoutes = require('./routes/movies');
const booksRoutes = require('./routes/books');
const triviaRoutes = require('./routes/triviaQuestions')


app.use('/users', userRoutes);
app.use('/characters', characterRoutes);
app.use('/quotes', quotesRoutes);
app.use('/movies', moviesRoutes);
app.use('/books', booksRoutes);
app.use('/triviaQuestions', triviaRoutes);


app.use(function (req, res, next) {
  const err = new ExpressError("Not found!",404);
   return next(err);
});

//general error handler

app.use(function(err, req, res, next) {
  let status = err.status || 500;

  return res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});


module.exports = app;