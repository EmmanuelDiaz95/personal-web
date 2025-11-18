import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
import { CONTACT_INFO, SOCIAL_LINKS } from '../../data/constants';
import ContactForm from '../ui/ContactForm';

const ContactInfo = ({ icon: Icon, children, href }) => {
  const content = (
    <>
      <Icon className="w-5 h-5 text-blue-400" aria-hidden="true" />
      <span className="text-gray-400">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="flex items-center space-x-3 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black rounded"
      >
        {content}
      </a>
    );
  }

  return <div className="flex items-center space-x-3">{content}</div>;
};

const SocialMediaLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-full bg-blue-900/30 hover:bg-blue-900/40 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black"
    aria-label={label}
  >
    <Icon className="w-5 h-5 text-blue-400" aria-hidden="true" />
  </a>
);

const ContactPage = () => {
  return (
    <section className="space-y-16" aria-labelledby="contact-heading">
      <header className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 id="contact-heading" className="text-5xl font-extrabold">
          CONTACT
        </h1>
        <p className="text-xl text-gray-400">
          Let's connect and explore opportunities for collaboration.
        </p>
      </header>
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Get in Touch</h2>
            <p className="text-gray-400">
              I'm always open to discussing new projects, creative ideas, or opportunities to be
              part of your visions.
            </p>
          </div>
          <address className="space-y-4 not-italic">
            <ContactInfo icon={Mail} href={`mailto:${CONTACT_INFO.email}`}>
              {CONTACT_INFO.email}
            </ContactInfo>
            <ContactInfo icon={Phone}>{CONTACT_INFO.phone}</ContactInfo>
            <ContactInfo icon={MapPin}>{CONTACT_INFO.location}</ContactInfo>
          </address>
          <nav className="flex space-x-4 pt-4" aria-label="Social media">
            <SocialMediaLink
              href={SOCIAL_LINKS.linkedin}
              icon={Linkedin}
              label="Connect on LinkedIn"
            />
            <SocialMediaLink href={SOCIAL_LINKS.github} icon={Github} label="View GitHub profile" />
            <SocialMediaLink href={SOCIAL_LINKS.twitter} icon={Twitter} label="Follow on Twitter" />
          </nav>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactPage;
