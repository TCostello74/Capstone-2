import React from 'react';
import { Link } from 'react-router-dom';
import './TriviaScore.css';

const TriviaScore = ({ score }) => {
  return (
   <div className="TriviaScore-body">
    <div className="trivia-score-container">
      <h1 className="trivia-score-header">Your score is...</h1>
      <p className="trivia-score">{`${score}/10`}!</p>
      <Link className="play-again-link" to="/trivia">Play Again</Link>
    </div>
   </div>
  );
};

export default TriviaScore;