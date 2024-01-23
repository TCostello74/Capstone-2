import React from 'react';
import { render, screen } from '@testing-library/react';
import Homepage from './Homepage';

describe('Homepage Component', () => {
  // Test component renders without crashing
  test('renders without crashing', () => {
    render(<Homepage />);
    const titleElement = screen.getByText('Welcome to Middle-earth');
    expect(titleElement).toBeInTheDocument();
  });

  // Test displays the correct title
  test('displays the correct title', () => {
    render(<Homepage />);
    expect(screen.getByText('Welcome to Middle-earth')).toBeInTheDocument();
  });
});
