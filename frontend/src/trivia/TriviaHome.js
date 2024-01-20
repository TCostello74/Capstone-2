import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import './TriviaHome.css';

const TriviaHome = ({ setScore }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const history = useHistory();

  const handleQuizStart = () => {
    if (!isLoggedIn) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000); 
      return;
    }
    setScore(0);
    history.push('/trivia-quiz'); 
  };

  return (
    <div className="TriviaHome-body">
      <div className="trivia-home-container">
        <h1 className="trivia-home-title">Lord Of The Rings Trivia</h1>
        <p className="trivia-home-instruct">Put your knowledge of Middle-earth to the test by answering a series of questions. At the end, recieve your score and see how you did! Good luck!</p>
        
        {showLoginMessage && <p className="login-message">You must be logged in to play.</p>}
        
        <div classname="start-button-container">
          <button className="start-button-text" onClick={handleQuizStart}>Start Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default TriviaHome;

