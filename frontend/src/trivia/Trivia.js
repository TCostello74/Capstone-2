import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Trivia.css';

const Trivia = () => {
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [questionId, setQuestionId] = useState('');

  useEffect(() => {
    fetchTriviaQuestion();
  }, []);

  const fetchTriviaQuestion = async () => {
    try {
      const response = await axios.get('http://localhost:3000/triviaQuestions/random');
      const { questionId, question, choices } = response.data; // Update variable names
      setQuestionId(questionId);
      setQuestion(question); // Update from response.data.quote to response.data.question
      setChoices(choices);
      setSelectedOption('');
      setIsCorrect(null);
    } catch (error) {
      console.error('Error fetching trivia question:', error);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleAnswerSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/triviaQuestions/validate', {
        questionId,
        selectedOption,
      });
      setIsCorrect(response.data.isCorrect);
    } catch (error) {
      console.error('Error validating answer:', error);
    }
  };

  return (
    <div className="trivia-container">
      <h1>Trivia Game</h1>
      <p className="question">{question}</p>
      <ul className="choices">
        {choices.map((choice, index) => (
          <li
            key={index}
            onClick={() => handleOptionSelect(choice)}
            className={selectedOption === choice ? 'selected' : ''}
          >
            {choice}
          </li>
        ))}
      </ul>
      <button className="submit-button" onClick={handleAnswerSubmit}>
        Submit Answer
      </button>
      {isCorrect !== null && (
        <p className={isCorrect ? 'correct-answer' : 'incorrect-answer'}>
          {isCorrect ? 'Correct!' : 'Incorrect. Try again!'}
        </p>
      )}
      <button className="next-button" onClick={fetchTriviaQuestion}>
        Next Question
      </button>
    </div>
  );
};

export default Trivia;
