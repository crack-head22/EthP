import { render, screen } from '@testing-library/react';
import App from './App';

test('renders USDC Transfer Dashboard title', () => {
  render(<App />);
  const titleElement = screen.getByText(/USDC Transfer Dashboard/i);
  expect(titleElement).toBeInTheDocument();
});
