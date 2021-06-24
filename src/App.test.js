import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Canvas', () => {
  render(<App />);
  const rootElem = screen.getByTestId(/root/i);
  expect(rootElem).toBeInTheDocument();
});
