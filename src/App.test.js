import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Canvas', () => {
  render(<App />);
  const rootElem = screen.getByText('Tanguy Chennaux');
  expect(rootElem).toBeInTheDocument();
});
