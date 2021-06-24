import { render, screen } from '@testing-library/react';
import App from './App';

import { JSDOM } from 'jsdom';
const { window } = new JSDOM(`...`);
window.URL.createObjectURL = function() {};

test('renders the Canvas', () => {
  render(<App />);
  const rootElem = screen.getByTestId(/root/i);
  expect(rootElem).toBeInTheDocument();
});
