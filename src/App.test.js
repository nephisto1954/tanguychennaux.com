import 'jest-canvas-mock'
import React from 'react'
import { render, screen} from '@testing-library/react';
import Mountain from './Mountain';

test('renders the Canvas', () => {
  render(<Mountain />);
  const canvas = screen.findByText('Tanguy Chennaux');
  expect(canvas).toBeTruthy();
});
