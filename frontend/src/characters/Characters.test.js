import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import Characters from './Characters';

jest.mock('axios');

describe('Characters Component', () => {
  // Wrap the component in a Router
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: Router });
  };

  test('renders Characters component', () => {
    renderWithRouter(<Characters />);
    expect(screen.getByText(/CHARACTERS/i)).toBeInTheDocument();
  });

  test('fetches and displays characters', async () => {
    const mockCharacters = [
        {
          "_id": "5cd99d4bde30eff6ebccfbe6",
          "height": "198cm (6'6\")",
          "race": "Human",
          "gender": "Male",
          "birth": "March 1, 2931",
          "spouse": "Arwen",
          "death": "FO 120",
          "realm": "Reunited Kingdom, Arnor, Gondor",
          "hair": "Dark",
          "name": "Aragorn II Elessar",
          "wikiUrl": "http://lotr.wikia.com//wiki/Aragorn_II_Elessar"
        },
        {
			"_id": "5cd99d4bde30eff6ebccfc38",
			"height": "1.25m (4'1\")",
			"race": "Hobbit",
			"gender": "Male",
			"birth": "22 September ,TA 2890",
			"spouse": "None",
			"death": "Unknown (Last sighting 29 SeptemberTA 3021,) (,SR 1421,)",
			"realm": "",
			"hair": "Brown, later white",
			"name": "Bilbo Baggins",
			"wikiUrl": "http://lotr.wikia.com//wiki/Bilbo_Baggins"
		}
      ];
      
    axios.get.mockResolvedValue({ data: { docs: mockCharacters } });

    renderWithRouter(<Characters />);

    await waitFor(() => {
      mockCharacters.forEach((character) => {
        expect(screen.getByText(character.name)).toBeInTheDocument();
      });
    });
  });

});



