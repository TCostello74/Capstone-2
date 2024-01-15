const express = require('express');
const ExpressError = require("./expressError");
require('dotenv').config();
const cors = require('cors');
const { authenticateJWT } = require("./middleware/auth")

//Initializes new Express application
const app = express();
//Middleware to parse incoming JSON payloads
app.use(express.json());
app.use(authenticateJWT);
app.use(cors());

const userRoutes = require('./routes/users');
const characterRoutes = require('./routes/characters');
const quotesRoutes = require('./routes/quotes');
const moviesRoutes = require('./routes/movies');
const booksRoutes = require('./routes/books');
const triviaRoutes = require('./routes/triviaQuestions')

//Set up Routes

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

/** general error handler */

app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});


module.exports = app;