const express = require('express');
const axios = require('axios');
require('dotenv').config();
const characterRoutes = require('./routes/characters');

//Initializes new Express apllication
const app = express();
const port = process.env.PORT || 3000;

//Middleware to parse incoming JSON payloads
app.use(express.json());

//Set up Routes
app.use('/characters', characterRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
