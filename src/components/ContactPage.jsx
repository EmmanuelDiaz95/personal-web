import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    // Clear error when user starts typing
    if (formErrors[id]) {
      setFormErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    const errors = {
      name: '',
      email: '',
      message: ''
    };

    let hasError = false;

    // Validate all fields
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      hasError = true;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      hasError = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
      hasError = true;
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      hasError = true;
    }

    if (hasError) {
      setFormErrors(errors);
      setSubmitStatus('');
      return;
    }

    // Simulate form submission
    setSubmitStatus('Sending...');
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setFormErrors({ name: '', email: '', message: '' });

      setTimeout(() => {
        setSubmitStatus('');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-5xl font-extrabold">CONTACT</h2>
        <p className="text-xl text-gray-400">
          Let's connect and explore opportunities for collaboration.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Get in Touch</h3>
            <p className="text-gray-400">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Send email to Emmanuel"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400">{siteConfig.contact.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400">{siteConfig.contact.location}</span>
            </div>
          </div>
          <div className="flex space-x-4 pt-4">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-blue-900/30 hover:bg-blue-900/40 transition-colors"
              aria-label="Visit Emmanuel's LinkedIn profile"
            >
              <Linkedin className="w-5 h-5 text-blue-400" />
            </a>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-blue-900/30 hover:bg-blue-900/40 transition-colors"
              aria-label="Visit Emmanuel's GitHub profile"
            >
              <Github className="w-5 h-5 text-blue-400" />
            </a>
            <a
              href={siteConfig.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-blue-900/30 hover:bg-blue-900/40 transition-colors"
              aria-label="Visit Emmanuel's Twitter profile"
            >
              <Twitter className="w-5 h-5 text-blue-400" />
            </a>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
              placeholder="Your name"
              aria-invalid={!!formErrors.name}
              aria-describedby={formErrors.name ? "name-error" : undefined}
            />
            {formErrors.name && (
              <p id="name-error" className="text-sm text-red-400" role="alert">
                {formErrors.name}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
              placeholder="your.email@example.com"
              aria-invalid={!!formErrors.email}
              aria-describedby={formErrors.email ? "email-error" : undefined}
            />
            {formErrors.email && (
              <p id="email-error" className="text-sm text-red-400" role="alert">
                {formErrors.email}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-400">Message</label>
            <textarea
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
              placeholder="Your message"
              aria-invalid={!!formErrors.message}
              aria-describedby={formErrors.message ? "message-error" : undefined}
            ></textarea>
            {formErrors.message && (
              <p id="message-error" className="text-sm text-red-400" role="alert">
                {formErrors.message}
              </p>
            )}
          </div>
          {submitStatus && (
            <div className={`text-sm ${submitStatus.includes('successfully') ? 'text-green-400' : 'text-blue-400'}`} role="status">
              {submitStatus}
            </div>
          )}
          <button
            type="submit"
            disabled={submitStatus === 'Sending...'}
            className="w-full px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitStatus === 'Sending...' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
