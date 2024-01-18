import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/characters">Characters</Link>
        </li>
        <li>
          <Link to="/quotes">Rando-Quote</Link>
        </li>
        <li>
          <Link to="/trivia">Trivia</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
