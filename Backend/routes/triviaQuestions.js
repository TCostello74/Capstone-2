const express = require('express');
const axios = require('axios');
const router = express.Router();

// question randomizer
router.get('/random', async (req, res) => {
    try {
        // Fetch a random quote from The One API
        const quoteResponse = await axios.get('https://the-one-api.dev/v2/quote', {
            headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
        });
        const randomQuote = quoteResponse.data.docs[Math.floor(Math.random() * quoteResponse.data.docs.length)];

        // Fetch characters for multiple-choice options
        const charactersResponse = await axios.get('https://the-one-api.dev/v2/character', {
            headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
        });
        const characters = charactersResponse.data.docs;

        // Ensure one of the characters is the one who said the quote
        // and select three other characters randomly for the options
        const correctCharacter = characters.find(char => char._id === randomQuote.character);
        const otherCharacters = characters.filter(char => char._id !== randomQuote.character);
        shuffleArray(otherCharacters); // Randomize the array
        const choices = [correctCharacter, ...otherCharacters.slice(0, 3)];

        // Send the trivia question and choices
        res.json({
            quote: randomQuote.dialog,
            choices: choices.map(char => char.name)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST endpoint to validate an answer
router.post('/validate', async (req, res) => {
    const { questionId, selectedOption } = req.body; // Both IDs are strings

    try {
        const question = await getTriviaQuestionById(questionId); // Implement this based on your database

        // Compare the selectedOption (string) with the correct answer's ID (string)
        const isCorrect = question.character_id === selectedOption;

        res.json({ isCorrect: isCorrect });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Function to shuffle array (Fisher-Yates shuffle algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

module.exports = router;
