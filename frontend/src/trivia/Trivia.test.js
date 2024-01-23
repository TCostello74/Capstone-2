import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Trivia from './Trivia';

// Mock axios
jest.mock('axios');

const mockSetScore = jest.fn();

const renderWithRouter = (component, { route = '/' } = {}) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(<Router history={history}>{component}</Router>),
    history,
  };
};

describe('Trivia Component', () => {
  // Test 1: Component renders correctly
  test('renders without crashing', () => {
    renderWithRouter(<Trivia setScore={mockSetScore} />);
    expect(screen.getByText(/Question 1:/i)).toBeInTheDocument();
  });

  // Test 2: Fetches and displays a trivia question
  test('fetches and displays a trivia question', async () => {
    const mockTriviaQuestion = {
      data: {
        questionId: '1',
        question: 'What is the capital of France?',
        choices: ['Paris', 'London', 'Berlin', 'Rome'],
      },
    };
    axios.get.mockResolvedValueOnce(mockTriviaQuestion);

    renderWithRouter(<Trivia setScore={mockSetScore} />);

    await waitFor(() => {
      expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
      expect(screen.getByText('Paris')).toBeInTheDocument();
    });
  });

  // Test 3: Answer submission and score update
  test('submits an answer and updates score', async () => {
    // Mock data for trivia question and answer validation
    const mockTriviaQuestion = {
      data: {
        questionId: '1',
        question: 'What is the capital of France?',
        choices: ['Paris', 'London', 'Berlin', 'Rome'],
      },
    };
    const mockAnswerValidation = {
      data: {
        isCorrect: true,
      },
    };
    axios.get.mockResolvedValueOnce(mockTriviaQuestion);
    axios.post.mockResolvedValueOnce(mockAnswerValidation);

    renderWithRouter(<Trivia setScore={mockSetScore} />);

    // Wait for the question to be displayed
    await waitFor(() => {
      expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
    });

    // Select an answer and submit
    fireEvent.click(screen.getByText('Paris'));
    fireEvent.click(screen.getByText('Submit Answer'));

    await waitFor(() => {
      expect(screen.getByText('CORRECT!')).toBeInTheDocument();
      expect(mockSetScore).toHaveBeenCalledWith(expect.any(Function));
    });
  });

});
