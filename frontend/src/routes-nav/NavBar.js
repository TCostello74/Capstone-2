import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import './NavBar.css';

const NavBar = () => {
  const { isLoggedIn, logout, username } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = (event) => {
      event.preventDefault();
      logout();
      history.push('/login');
  };


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
        <div className="rightside-nav">
          {!isLoggedIn && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
          )}
          {isLoggedIn && (
              <>
                <span className="user-welcome">Hello, {username}</span>
                <a href="/logout" onClick={handleLogout}>Logout</a>
              </>
          )}
        </div>
      
    </nav>
  );
};

export default NavBar;
