// Quotes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quotes.css';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/quotes');
        setQuotes(response.data.docs);
      } catch (error) {
        console.error('Error fetching quotes:', error.message);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="quotes-container">
      <h2 className="quotes-header">Quotes:</h2>
      <div className="quotes-list">
        {quotes.map((quote, index) => (
          <div key={index} className="quote-item-container">
            <p className="quote-item">"{quote.dialog}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quotes;
