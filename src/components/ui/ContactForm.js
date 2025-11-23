import React, { useState } from 'react';

const STATUS_TYPES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: STATUS_TYPES.IDLE, message: '' });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: STATUS_TYPES.ERROR, message: 'Please fill in all fields' });
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus({ type: STATUS_TYPES.ERROR, message: 'Please enter a valid email address' });
      return;
    }

    if (formData.message.length < 10) {
      setStatus({ type: STATUS_TYPES.ERROR, message: 'Message must be at least 10 characters long' });
      return;
    }

    // Simulate form submission
    setStatus({ type: STATUS_TYPES.LOADING, message: 'Sending...' });
    setTimeout(() => {
      // TODO: Replace with actual form submission
      setStatus({ type: STATUS_TYPES.SUCCESS, message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setStatus({ type: STATUS_TYPES.IDLE, message: '' });
      }, 3000);
    }, 1000);
  };

  const getStatusClassName = () => {
    switch (status.type) {
      case STATUS_TYPES.SUCCESS:
        return 'text-green-400';
      case STATUS_TYPES.ERROR:
        return 'text-red-400';
      case STATUS_TYPES.LOADING:
        return 'text-blue-400';
      default:
        return '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-400">
          Name *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
          placeholder="Your name"
          required
          aria-required="true"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-400">
          Email *
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
          placeholder="your.email@example.com"
          required
          aria-required="true"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-400">
          Message *
        </label>
        <textarea
          id="message"
          rows="4"
          value={formData.message}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
          placeholder="Your message (minimum 10 characters)"
          required
          minLength={10}
          aria-required="true"
        ></textarea>
      </div>
      {status.message && (
        <div className={`text-sm ${getStatusClassName()}`} role="alert" aria-live="polite">
          {status.message}
        </div>
      )}
      <button
        type="submit"
        disabled={status.type === STATUS_TYPES.LOADING}
        className="w-full px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black"
      >
        {status.type === STATUS_TYPES.LOADING ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
