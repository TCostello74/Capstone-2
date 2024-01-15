// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './routes-nav/NavBar';
import Routes from './routes-nav/Routes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes />
      </div>
    </Router>
  );
}

export default App;

