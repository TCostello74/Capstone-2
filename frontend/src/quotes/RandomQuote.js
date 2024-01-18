import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RandomQuote.css'; 

const RandomQuote = () => {
  const [randomQuote, setRandomQuote] = useState({});
  const [character, setCharacter] = useState({});

  const fetchRandomQuote = async () => {
    try {
      let selectedQuote;
  
      // Fetch quotes until a quote with at least 50 characters is found
      do {
        console.log('Fetching a random quote...');
        const quoteResponse = await axios.get('http://localhost:3000/quotes');
        const quotes = quoteResponse.data.docs;
        selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
        console.log('Selected Quote:', selectedQuote);
      } while (selectedQuote.dialog.length < 50);
  
      setRandomQuote(selectedQuote);
  
      // Fetch the character information using the character ID from the quote
      const characterId = selectedQuote.character;
      console.log('Fetching character information for ID:', characterId);
      const characterResponse = await axios.get(`http://localhost:3000/characters/${characterId}`);
      const characterData = characterResponse.data;
      const character = characterData.docs[0]; 
      console.log('Character Information:', character);
  
      // Update state with character information
      setCharacter(character);
    } catch (error) {
      console.error('Error fetching random quote:', error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        console.log('Fetching a random quote...');
        const quoteResponse = await axios.get('http://localhost:3000/quotes');
        const quotes = quoteResponse.data.docs;
        const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
        console.log('Selected Quote:', selectedQuote);

        if (isMounted) {
          setRandomQuote(selectedQuote);

          const characterId = selectedQuote.character;
          console.log('Fetching character information for ID:', characterId);
          const characterResponse = await axios.get(`http://localhost:3000/characters/${characterId}`);
          const characterData = characterResponse.data;
          const character = characterData.docs[0];
          console.log('Character Information:', character);

          setCharacter(character);
        }
      } catch (error) {
        console.error('Error fetching random quote:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleNewQuote = () => {
    fetchRandomQuote();
  };

  return (
   <div className="RandomQuote-body"> 
    <div className="quote-container">
      <div className="who-said-it">Who said it?</div>
      <div className="quote-text">"{randomQuote.dialog}"</div>
      <div className="reveal-answer" onMouseEnter={() => setCharacter({...character, hovered: true})} onMouseLeave={() => setCharacter({...character, hovered: false})}>
        {character.hovered ? character.name || 'Unknown' : ' - Reveal Answer - '}
      </div>
      <div className="button-container">
        <button onClick={handleNewQuote}>New Random Quote</button>
      </div>
    </div>
   </div> 
  );
};

export default RandomQuote;
