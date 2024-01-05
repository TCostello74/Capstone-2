const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://the-one-api.dev/v2/book', {
            headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get book by ID
router.get('/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://the-one-api.dev/v2/book/${req.params.id}`, {
            headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
