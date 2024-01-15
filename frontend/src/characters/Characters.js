// Characters.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import the Link component
import './Characters.css'; // Import the existing stylesheet

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch all characters when the component mounts
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('http://localhost:3000/characters');
        setCharacters(response.data.docs);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/characters/search?name=${searchQuery}`);
      setCharacters(response.data);
    } catch (error) {
      console.error('Error searching characters:', error);
    }
  };

  return (
    <div className="characters-container">
      <h1>LOTR Characters</h1>

      <div>
        <label>Search by Name:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <ul>
        {characters.map((character) => (
          <li key={character._id} className="character-card">
            <Link to={`/characters/${character._id}`}>
              <h3>{character.name}</h3>
            </Link>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Characters;



