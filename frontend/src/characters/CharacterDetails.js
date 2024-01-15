// CharacterDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CharacterDetails.css';

const CharacterDetails = () => {
  const { id } = useParams();
  const [characterDetails, setCharacterDetails] = useState(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/characters/${id}`);
        setCharacterDetails(response.data.docs[0]); // Assuming the character details are in an array
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (!characterDetails) {
    return <div className="character-details-container">Loading...</div>;
  }

  return (
    <div className="character-details-container">
      <h1 className="character-name">{characterDetails.name}</h1>
      <p className="character-detail">Race: {characterDetails.race}</p>
      <p className="character-detail">Realm: {characterDetails.realm}</p>
      <p className="character-detail">Gender: {characterDetails.gender}</p>
      <p className="character-detail">Height: {characterDetails.height}</p>
      <p className="character-detail">Hair: {characterDetails.hair}</p>
      <p className="character-detail">Birth: {characterDetails.birth}</p>
      <p className="character-detail">Death: {characterDetails.death}</p>
      <p className="character-detail">Spouse: {characterDetails.spouse}</p>
      <p className="character-detail">Wiki Page: <a className="character-link" href={characterDetails.wikiUrl} target="_blank" rel="noopener noreferrer">Link</a></p>
    </div>
  );
};

export default CharacterDetails;


