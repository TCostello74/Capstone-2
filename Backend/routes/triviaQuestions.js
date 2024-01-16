const express = require('express');
const db  = require('../db'); 
const router = express.Router();

router.get('/random', async (req, res) => {
  try {
    const questionResponse = await db.query('SELECT * FROM trivia_game ORDER BY RANDOM() LIMIT 1');
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

