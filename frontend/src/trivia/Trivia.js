import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Trivia.css';

const Trivia = ({ setScore }) => {
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [questionId, setQuestionId] = useState('');
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const fetchTriviaQuestionRef = useRef();
  const history = useHistory();
  const [questionNumber, setQuestionNumber] = useState(1);

  const fetchTriviaQuestion = async () => {
    try {
      const response = await axios.get('http://localhost:3000/triviaQuestions/random', {
        params: { usedQuestionIds: usedQuestionIds.join(',') },
      });

      const { questionId, question, choices } = response.data;
      setQuestionId(questionId);
      setQuestion(question);
      setChoices(choices);
      setSelectedOption('');
      setIsCorrect(null);

      setUsedQuestionIds((prev) => [...prev, questionId]);
    } catch (error) {
      console.error('Error fetching trivia question:', error);
    }
  };

  // Assign the function to the ref
  fetchTriviaQuestionRef.current = fetchTriviaQuestion;

  useEffect(() => {
    // Use the ref in useEffect
    fetchTriviaQuestionRef.current(); // Fetch the initial question
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleAnswerSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/triviaQuestions/validate', {
        questionId,
        selectedOption,
      });
  
      const isCorrect = response.data.isCorrect;
  
      // Update the score based on the correctness of the answer
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
  
      setIsCorrect(isCorrect);


      setTimeout(() => {
        if (questionNumber < 10) {
          setQuestionNumber((prev) => prev + 1);
        } else {
          history.push('/trivia-score');
        }
      }, 2000);

    } catch (error) {
      console.error('Error validating answer:', error);
    }
  };

  return (
   <div className="Trivia-body">
    <div className="trivia-container">
      <h1 className="trivia-question-number">Question:</h1>
      <p className="trivia-question">{question}</p>
      <ul className="trivia-choices">
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
      <button className="trivia-submit-button" onClick={handleAnswerSubmit}>
        Submit Answer
      </button>
      {isCorrect !== null && (
        <p className={isCorrect ? 'correct-answer' : 'incorrect-answer'}>
          {isCorrect ? 'CORRECT!' : 'WRONG!'}
        </p>
      )}
      <br></br>
      <button className="trivia-next-button" onClick={fetchTriviaQuestion}>
        Next Question
      </button>
    </div>
   </div>
  );
};

export default Trivia;

