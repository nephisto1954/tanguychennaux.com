import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Canvas', () => {
  render(<App />);
  const linkElement = screen.getByTestId(/TanguyChennaux/i);
  expect(linkElement).toBeInTheDocument();
});
