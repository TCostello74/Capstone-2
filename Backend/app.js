const express = require('express');
require('dotenv').config();


//Initializes new Express application
const app = express();
const ExpressError = require("./expressError")
const characterRoutes = require('./routes/characters');
const quotesRoutes = require('./routes/quotes');
const moviesRoutes = require('./routes/movies');
const booksRoutes = require('./routes/books');


//Middleware to parse incoming JSON payloads
app.use(express.json());
//Set up Routes
app.use('/characters', characterRoutes);
app.use('/quotes', quotesRoutes);
app.use('/movies', moviesRoutes);
app.use('/books', booksRoutes);


app.use(function(req, res, next) { //defines middleware function
    const err = new ExpressError("Not Found", 404); //catches any request not handled by other routes
    return next(err); //passed to next function in middleware stack
  });
  
  /** general error handler */
  
  app.use((err, req, res, next) => { //general error handling middleware
    res.status(err.status || 500); //called when preceding middleware function calls 'next'
  
    return res.json({
      error: err,
      message: err.message
    });
  });
  
  
  module.exports = app;