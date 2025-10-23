import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  describe('Navigation', () => {
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

    test('navigates to projects page when Projects button is clicked', () => {
      render(<App />);
      const projectsButton = screen.getByText(/projects/i);
      fireEvent.click(projectsButton);

      expect(screen.getByText(/UX design, research projects/i)).toBeInTheDocument();
    });

    test('navigates to blog page when Blog button is clicked', () => {
      render(<App />);
      const blogButton = screen.getByText(/blog/i);
      fireEvent.click(blogButton);

      expect(screen.getByText(/Thoughts, insights, and reflections/i)).toBeInTheDocument();
    });

    test('navigates to contact page when Contact button is clicked', () => {
      render(<App />);
      const contactButton = screen.getByText(/contact/i);
      fireEvent.click(contactButton);

      expect(screen.getByText(/Let's connect and explore opportunities/i)).toBeInTheDocument();
    });

    test('active navigation button has aria-current attribute', () => {
      render(<App />);
      const aboutButton = screen.getByLabelText(/Navigate to About section/i);
      expect(aboutButton).toHaveAttribute('aria-current', 'page');

      const projectsButton = screen.getByLabelText(/Navigate to Projects section/i);
      fireEvent.click(projectsButton);
      expect(projectsButton).toHaveAttribute('aria-current', 'page');
      expect(aboutButton).not.toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Dark Mode Toggle', () => {
    test('starts in dark mode by default', () => {
      render(<App />);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    test('toggles dark mode when button is clicked', () => {
      render(<App />);
      const darkModeButton = screen.getByLabelText(/Switch to light mode/i);

      fireEvent.click(darkModeButton);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(screen.getByLabelText(/Switch to dark mode/i)).toBeInTheDocument();

      fireEvent.click(screen.getByLabelText(/Switch to dark mode/i));
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    test('shows correct icon for dark mode state', () => {
      render(<App />);
      const darkModeButton = screen.getByLabelText(/Switch to light mode/i);
      expect(darkModeButton).toBeInTheDocument();

      fireEvent.click(darkModeButton);
      expect(screen.getByLabelText(/Switch to dark mode/i)).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    test('shows search bar when search button is clicked', () => {
      render(<App />);
      const searchButton = screen.getByLabelText(/Toggle search/i);

      fireEvent.click(searchButton);
      expect(screen.getByPlaceholderText(/Search projects, blog posts/i)).toBeInTheDocument();
    });

    test('hides search bar when search button is clicked again', () => {
      render(<App />);
      const searchButton = screen.getByLabelText(/Toggle search/i);

      fireEvent.click(searchButton);
      expect(screen.getByPlaceholderText(/Search projects, blog posts/i)).toBeInTheDocument();

      fireEvent.click(searchButton);
      expect(screen.queryByPlaceholderText(/Search projects, blog posts/i)).not.toBeInTheDocument();
    });

    test('search input is focused when search bar opens', () => {
      render(<App />);
      const searchButton = screen.getByLabelText(/Toggle search/i);

      fireEvent.click(searchButton);
      const searchInput = screen.getByPlaceholderText(/Search projects, blog posts/i);
      expect(searchInput).toHaveFocus();
    });

    test('shows alert with search query on form submission', () => {
      render(<App />);
      const searchButton = screen.getByLabelText(/Toggle search/i);
      window.alert = jest.fn();

      fireEvent.click(searchButton);
      const searchInput = screen.getByPlaceholderText(/Search projects, blog posts/i);

      fireEvent.change(searchInput, { target: { value: 'test query' } });
      fireEvent.submit(searchInput.closest('form'));

      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('test query'));
    });
  });

  describe('Contact Form Validation', () => {
    beforeEach(() => {
      render(<App />);
      const contactButton = screen.getByText(/contact/i);
      fireEvent.click(contactButton);
    });

    test('shows error when submitting empty form', async () => {
      const submitButton = screen.getByRole('button', { name: /Send Message/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Message is required/i)).toBeInTheDocument();
      });
    });

    test('shows error for invalid email format', async () => {
      const nameInput = screen.getByRole('textbox', { name: /Name/i });
      const emailInput = screen.getByRole('textbox', { name: /Email/i });
      const messageInput = screen.getByRole('textbox', { name: /Message/i });
      const submitButton = screen.getByRole('button', { name: /Send Message/i });

      userEvent.type(nameInput, 'John Doe');
      userEvent.type(emailInput, 'invalid-email');
      userEvent.type(messageInput, 'Test message');

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    test('submits form successfully with valid data', async () => {
      jest.useFakeTimers();

      const nameInput = screen.getByRole('textbox', { name: /Name/i });
      const emailInput = screen.getByRole('textbox', { name: /Email/i });
      const messageInput = screen.getByRole('textbox', { name: /Message/i });

      userEvent.type(nameInput, 'John Doe');
      userEvent.type(emailInput, 'john@example.com');
      userEvent.type(messageInput, 'Test message');

      const submitButton = screen.getByRole('button', { name: /Send Message/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByRole('status')).toHaveTextContent(/Sending\.\.\./i);
      });

      jest.advanceTimersByTime(1000);

      await waitFor(() => {
        expect(screen.getByRole('status')).toHaveTextContent(/Message sent successfully!/i);
      });

      jest.useRealTimers();
    });

    test('form fields have proper aria attributes when invalid', async () => {
      const submitButton = screen.getByRole('button', { name: /Send Message/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        const nameInput = screen.getByRole('textbox', { name: /Name/i });
        const emailInput = screen.getByRole('textbox', { name: /Email/i });
        const messageInput = screen.getByRole('textbox', { name: /Message/i });

        expect(nameInput).toHaveAttribute('aria-invalid', 'true');
        expect(emailInput).toHaveAttribute('aria-invalid', 'true');
        expect(messageInput).toHaveAttribute('aria-invalid', 'true');
      });
    });

    test('clears error message when user starts typing', async () => {
      const submitButton = screen.getByRole('button', { name: /Send Message/i });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      });

      const nameInput = screen.getByRole('textbox', { name: /Name/i });
      userEvent.type(nameInput, 'J');

      await waitFor(() => {
        expect(screen.queryByText(/Name is required/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    test('all navigation buttons have aria-label attributes', () => {
      render(<App />);

      expect(screen.getByLabelText(/Navigate to About section/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Navigate to Projects section/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Navigate to Blog section/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Navigate to Contact section/i)).toBeInTheDocument();
    });

    test('social media links have descriptive aria-labels', () => {
      render(<App />);

      const linkedinLinks = screen.getAllByLabelText(/Visit Emmanuel's LinkedIn profile/i);
      expect(linkedinLinks.length).toBeGreaterThan(0);
    });

    test('search input has aria-label', () => {
      render(<App />);
      const searchButton = screen.getByLabelText(/Toggle search/i);

      fireEvent.click(searchButton);
      expect(screen.getByLabelText(/Search content/i)).toBeInTheDocument();
    });
  });
});
