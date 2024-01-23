import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route } from 'react-router-dom';
import CharacterDetails from './CharacterDetails';

jest.mock('axios');

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: MemoryRouter });
};

describe('CharacterDetails Component', () => {
  // Test Component renders loading state initially
  test('renders loading state initially', () => {
    renderWithRouter(<CharacterDetails />, { route: '/characters/1' });
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  // Test Fetches and displays character details
  test('fetches and displays character details', async () => {
    const mockCharacterDetails = {
      data: {
        docs: [
            { 
              name: 'Aragorn II Elessar', 
              race: 'Human', 
              gender: 'Male', 
              hair: 'Dark', 
              birth: 'March 1, 2931', 
              death: 'FO 120', 
              wikiUrl: 'http://lotr.wikia.com//wiki/Aragorn_II_Elessar' 
            }
        ]
      }
    };
    axios.get.mockResolvedValueOnce(mockCharacterDetails);

    renderWithRouter(<CharacterDetails />, { route: '/characters/5cd99d4bde30eff6ebccfbe6' });

    await waitFor(() => {
      expect(screen.getByText('Aragorn II Elessar')).toBeInTheDocument();
    });
  });

  // Test Fetches and displays character quotes
  test('fetches and displays character quotes', async () => {
    const mockCharacterQuotes = {
      data: {
        docs: [
          { dialog: 'Quote One' },
          { dialog: 'Quote Two' }
        ]
      }
    };
    axios.get.mockResolvedValueOnce({ data: { docs: [{}] } }) 
           .mockResolvedValueOnce(mockCharacterQuotes); 

    renderWithRouter(<CharacterDetails />, { route: '/characters/1' });

    await waitFor(() => {
      expect(screen.getByText('"Quote One"')).toBeInTheDocument();
      expect(screen.getByText('"Quote Two"')).toBeInTheDocument();
    });
  });
});
