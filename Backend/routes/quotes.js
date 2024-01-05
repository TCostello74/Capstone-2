const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get all quotes
router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://the-one-api.dev/v2/quote', {
            headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get quote by ID
router.get('/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://the-one-api.dev/v2/quote/${req.params.id}`, {
            headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
