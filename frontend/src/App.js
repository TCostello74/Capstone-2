import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './routes-nav/NavBar';
import Routes from './routes-nav/Routes';
import './App.css';

function App() {
  const [score, setScore] = useState(0);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes setScore={setScore} score={score} />
      </div>
    </Router>
  );
}

export default App;

