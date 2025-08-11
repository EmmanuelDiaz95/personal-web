import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation elements', () => {
  render(<App />);
  const aboutButton = screen.getByText(/about/i);
  const projectsButton = screen.getByText(/projects/i);
  const blogButton = screen.getByText(/blog/i);
  const contactButton = screen.getByText(/contact/i);
  
  expect(aboutButton).toBeInTheDocument();
  expect(projectsButton).toBeInTheDocument();
  expect(blogButton).toBeInTheDocument();
  expect(contactButton).toBeInTheDocument();
});

test('renders main heading on home page', () => {
  render(<App />);
  const nameElement = screen.getByText(/I'm Emmanuel/i);
  expect(nameElement).toBeInTheDocument();
});
