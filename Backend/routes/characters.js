
const express = require('express');
const router = express.Router();
const axios = require('axios');



router.get('/characters', async (req, res) => {
    try {
      const response = await axios.get('https://the-one-api.dev/v2/character', {
        headers: {
          'Authorization': `Bearer ${process.env.API_KEY}`
        }
      });
      console.log(response.data);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;
  