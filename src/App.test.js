import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation elements', () => {
  render(<App />);
  const nav = screen.getByRole('navigation', { name: /main navigation/i });

  expect(nav).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
});

test('renders main heading on home page', () => {
  render(<App />);
  const nameElement = screen.getByText(/I'm Emmanuel/i);
  expect(nameElement).toBeInTheDocument();
});
