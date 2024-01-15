// Quotes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quotes.css';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/quotes'); // Update the route based on your backend setup
        setQuotes(response.data.docs);
      } catch (error) {
        console.error('Error fetching quotes:', error.message);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div>
      <h1>All Quotes</h1>
      <ul>
        {quotes.map(quote => (
          <li key={quote._id}>{quote.dialog}</li>
        ))}
      </ul>
    </div>
  );
};

export default Quotes;
