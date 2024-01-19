import React from 'react';
import { Link } from 'react-router-dom';
import './TriviaHome.css';

const TriviaHome = ({ setScore }) => {
  const resetScore = () => {
    setScore(0);
  };

  return (
   <div className="TriviaHome-body">
    <div className="trivia-home-container">
      <h1 className="trivia-home-title">Lord Of The Rings Trivia</h1>
      <p className="trivia-home-instruct">Put your knowledge of Middle-earth to the test by answering a series of questions. At the end, recieve your score and see how you did! Good luck!</p>
      <Link className="trivia-quiz-link" to="/trivia-quiz" onClick={resetScore}>Start Quiz</Link>
    </div>
   </div>
  );
};

export default TriviaHome;
