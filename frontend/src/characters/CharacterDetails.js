import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CharacterDetails.css';

const CharacterDetails = () => {
  const { id } = useParams();
  const [characterDetails, setCharacterDetails] = useState(null);
  const [characterQuotes, setCharacterQuotes] = useState([]);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const responseDetails = await axios.get(`http://localhost:3000/characters/${id}`);
        setCharacterDetails(responseDetails.data.docs[0]); 

        // Fetch quotes after fetching character details
        const responseQuotes = await axios.get(`http://localhost:3000/characters/${id}/quotes`);
        setCharacterQuotes(responseQuotes.data.docs);

      } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
        console.error('Error fetching character details:', error);
      }
    }
    };

    fetchCharacterDetails();
  }, [id]);

  if (!characterDetails) {
    return <div className="character-details-container">Loading...</div>;
  }

  return (
    <div className="character-details-container">
      <h1 className="character-nameplate">{characterDetails.name}</h1>
      <p className="character-detail">Race:  {characterDetails.race}</p>
      <p className="character-detail">Gender:  {characterDetails.gender}</p>
      <p className="character-detail">Hair:  {characterDetails.hair}</p>
      <p className="character-detail">Birth:  {characterDetails.birth}</p>
      <p className="character-detail">Death:  {characterDetails.death}</p>
      <p className="character-detail">Wiki Page:  <a className="character-link" href={characterDetails.wikiUrl} target="_blank" rel="noopener noreferrer">Link</a></p>
      <h2 className="quotes-header">Quotes:</h2>
      <div className="quotes-list">
        {characterQuotes.map((quote, index) => (
          <div key={index} className="quote-item-container">
            <p className="quote-item">"{quote.dialog}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterDetails;


