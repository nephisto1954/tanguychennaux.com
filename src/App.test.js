import React from 'react'
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Canvas', () => {
  render(<App />);
  const rootElem = screen.queryByTestId('Tanguy Chennaux');
  expect(rootElem).toBeInTheDocument();
});
