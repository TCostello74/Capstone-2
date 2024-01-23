import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import RandomQuote from './RandomQuote';

// Mock axios
jest.mock('axios');

describe('RandomQuote Component', () => {
  // Test 1: Component renders correctly
  test('renders without crashing', () => {
    render(<RandomQuote />);
    expect(screen.getByText(/New Random Quote/i)).toBeInTheDocument();
  });

  // Test 2: Fetches and displays a random quote
  test('fetches and displays a random quote', async () => {
    const mockQuote = {
      data: {
        docs: [
          { dialog: 'A day may come when the courage of men fails...', character: '1' }
        ]
      }
    };

    const mockCharacter = {
      data: {
        docs: [
          { name: 'Aragorn' }
        ]
      }
    };

    axios.get.mockResolvedValueOnce(mockQuote)
           .mockResolvedValueOnce(mockCharacter);

    render(<RandomQuote />);

    await waitFor(() => {
      expect(screen.getByText(/A day may come when the courage of men fails.../i)).toBeInTheDocument();
    });
  });

});
