import 'jest-canvas-mock'
import React from 'react'
import { render, screen, queryByTestId } from '@testing-library/react';
import App from './App';

test('renders the Canvas', () => {
  render(<App />);
  const canvas = screen.findByText('Tanguy Chennaux');
  expect(canvas).toBeTruthy();
});
