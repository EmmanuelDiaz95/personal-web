import React from 'react';
import { Linkedin, Github, Twitter } from 'lucide-react';
import { SOCIAL_LINKS, CURRENT_YEAR } from '../../data/constants';

const SocialLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black rounded"
    aria-label={label}
  >
    <Icon className="w-5 h-5" aria-hidden="true" />
  </a>
);

const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 p-4 ${darkMode ? 'bg-black' : 'bg-white'} border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
    >
      <div className="flex justify-between max-w-6xl mx-auto items-center">
        <p className="text-sm text-gray-400">© {CURRENT_YEAR} Emmanuel. All rights reserved.</p>
        <nav className="flex space-x-4" aria-label="Social media links">
          <SocialLink href={SOCIAL_LINKS.linkedin} icon={Linkedin} label="Visit LinkedIn profile" />
          <SocialLink href={SOCIAL_LINKS.github} icon={Github} label="Visit GitHub profile" />
          <SocialLink href={SOCIAL_LINKS.twitter} icon={Twitter} label="Visit Twitter profile" />
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
