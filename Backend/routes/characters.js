
const express = require('express');

const axios = require('axios');
const router = new express.Router();

//Route to Fetch All
router.get('/', async (req, res) => {
    try {
      const response = await axios.get('https://the-one-api.dev/v2/character', {
        headers: {
          'Authorization': `Bearer ${process.env.API_KEY}`
        }
      });
      //console.log(response.data);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Route to fetch by name
router.get('/search', async (req, res) => {
    const searchQuery = req.query.name;
    try {
      const response = await axios.get(`https://the-one-api.dev/v2/character`, {
        headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
      });
      const characters = response.data.docs;
      const filteredCharacters = characters.filter(character =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase()));
      res.json(filteredCharacters);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  //Route to fetch by ID
router.get('/:id', async (req, res) => {
    try {
      const response = await axios.get(`https://the-one-api.dev/v2/character/${req.params.id}`, {
        headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

module.exports = router;
  