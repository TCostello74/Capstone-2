const express = require('express');
const db  = require('../db'); 
const router = express.Router();

router.get('/random', async (req, res) => {
  try {
    // Get the list of used question IDs from the request, if provided
    const usedQuestionIds = req.query.usedQuestionIds ? req.query.usedQuestionIds.split(',') : [];

    // Construct the query to exclude used question IDs
    let query = 'SELECT * FROM trivia_game';
    if (usedQuestionIds.length > 0) {
      const placeholders = usedQuestionIds.map((_, index) => `$${index + 1}`).join(',');
      query += ` WHERE id NOT IN (${placeholders})`;
    }
    query += ' ORDER BY RANDOM() LIMIT 1';

    // Execute the query with the list of used question IDs as parameters
    const questionResponse = await db.query(query, usedQuestionIds);
    if (questionResponse.rows.length === 0) {
      return res.status(404).json({ message: 'No more new questions available.' });
    }

    const question = questionResponse.rows[0];

    res.json({
      questionId: question.id,
      question: question.question,
      correctAnswer: question['option' + question.correct_answer_id],
      choices: [
        question.option1,
        question.option2,
        question.option3,
        question.option4,
      ],
    });
  } catch (error) {
    console.error('Error fetching trivia question:', error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/validate', async (req, res) => {
  const { questionId, selectedOption } = req.body;

  try {
    const correctAnswerResponse = await db.query('SELECT correct_answer_id FROM trivia_game WHERE id = $1', [questionId]);
    const correctAnswerId = correctAnswerResponse.rows[0].correct_answer_id;

    // Convert correct_answer_id to the corresponding option
    const correctAnswer = await db.query(`SELECT option${correctAnswerId} FROM trivia_game WHERE id = $1`, [questionId]);
    const correctAnswerText = correctAnswer.rows[0][`option${correctAnswerId}`];

    const isCorrect = selectedOption === correctAnswerText;
    res.json({ isCorrect });
  } catch (error) {
    console.error('Error validating answer:', error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;

