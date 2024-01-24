import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Characters.css';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLetter, setFilterLetter] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('{process.env.REACT_APP_API_BASE_URL}/characters');
        setCharacters(response.data.docs);
      } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
        console.error('Error fetching characters:', error);
      }
    }
    };

    fetchCharacters();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`{process.env.REACT_APP_API_BASE_URL}/characters/search?name=${searchQuery}`);
      setCharacters(response.data);
      
      // Clear the filter when searching
      setFilterLetter(''); 
    } catch (error) {
      console.error('Error searching characters:', error);
    }
  };

  const handleFilter = (letter) => {
    setFilterLetter(letter === filterLetter ? '' : letter);
    
    // Clear the search query when applying the filter
    setSearchQuery(''); 
  };

  const filteredCharacters = characters.filter((character) =>
    filterLetter ? character.name.startsWith(filterLetter) : true
  );

  return (
  <div className="characters-body">
    <div className="characters-container">
      <h1 className="character-title">CHARACTERS</h1>

      <div className="search-container">
        <label className="search-label">Search by Name:</label>
        <input
          type="text"
          placeholder=" Enter name here "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <div className="filter-bar">
        {/* //Add a button for all */}
        <button className="filter-button" onClick={() => handleFilter('')}>All</button>
        
        {/* Add small buttons for each alphabet letter */}
        {Array.from({ length: 26 }, (_, index) => {
          const letter = String.fromCharCode(65 + index);
          return (
            <button
              key={letter}
              onClick={() => handleFilter(letter)}
              className={filterLetter === letter ? 'active' : ''}
            >
              {letter}
            </button>
          );
        })}
      </div>

      <ul className="search-results">
        {filteredCharacters.map((character) => (
          <li key={character._id} className="character-card">
            <Link to={`/characters/${character._id}`}>
              <h3>{character.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default Characters;
