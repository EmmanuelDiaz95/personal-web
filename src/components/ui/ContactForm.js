import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState('');

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
      setSubmitStatus('Please fill in all fields');
      return;
    }

    if (!validateEmail(formData.email)) {
      setSubmitStatus('Please enter a valid email address');
      return;
    }

    if (formData.message.length < 10) {
      setSubmitStatus('Message must be at least 10 characters long');
      return;
    }

    // Simulate form submission
    setSubmitStatus('Sending...');
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setSubmitStatus('');
      }, 3000);
    }, 1000);
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
          aria-required="true"
        ></textarea>
      </div>
      {submitStatus && (
        <div
          className={`text-sm ${
            submitStatus.includes('successfully')
              ? 'text-green-400'
              : submitStatus.includes('Please') ||
                  submitStatus.includes('valid') ||
                  submitStatus.includes('must')
                ? 'text-red-400'
                : 'text-blue-400'
          }`}
          role="alert"
          aria-live="polite"
        >
          {submitStatus}
        </div>
      )}
      <button
        type="submit"
        disabled={submitStatus === 'Sending...'}
        className="w-full px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black"
      >
        {submitStatus === 'Sending...' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
