import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import TriviaHome from './TriviaHome';

const mockSetScore = jest.fn();

const renderWithRouterAndAuth = (component, { isLoggedIn = false, route = '/' } = {}) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(
      <Router history={history}>
        <AuthContext.Provider value={{ isLoggedIn }}>
          {component}
        </AuthContext.Provider>
      </Router>
    ),
    history,
  };
};

describe('TriviaHome Component', () => {
  // Component renders correctly
  test('renders without crashing', () => {
    renderWithRouterAndAuth(<TriviaHome setScore={mockSetScore} />);
    expect(screen.getByText(/Lord Of The Rings Trivia/i)).toBeInTheDocument();
    expect(screen.getByText(/Put your knowledge of Middle-earth to the test/i)).toBeInTheDocument();
  });

  // Handles quiz start based on login status
  test('shows login message if not logged in', () => {
    const { getByText } = renderWithRouterAndAuth(<TriviaHome setScore={mockSetScore} />, { isLoggedIn: false });

    fireEvent.click(getByText(/Start Quiz/i));
    expect(getByText(/You must be logged in to play./i)).toBeInTheDocument();
  });

  test('navigates to quiz if logged in', () => {
    const { history, getByText } = renderWithRouterAndAuth(<TriviaHome setScore={mockSetScore} />, { isLoggedIn: true });

    fireEvent.click(getByText(/Start Quiz/i));
    expect(history.location.pathname).toBe('/trivia-quiz');
  });
});
