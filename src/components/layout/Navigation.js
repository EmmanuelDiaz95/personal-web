import React from 'react';

const NavButton = ({ section, currentSection, onClick, onKeyDown, children }) => {
  const isActive = currentSection === section;

  return (
    <button
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`px-4 py-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black ${
        isActive ? 'bg-blue-900/30' : 'hover:bg-blue-900/30'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </button>
  );
};

const Navigation = ({ currentSection, setCurrentSection }) => {
  const handleKeyNavigation = (e, section) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setCurrentSection(section);
    }
  };

  return (
    <nav className="flex space-x-4" aria-label="Main navigation">
      <NavButton
        section="home"
        currentSection={currentSection}
        onClick={() => setCurrentSection('home')}
        onKeyDown={(e) => handleKeyNavigation(e, 'home')}
      >
        About
      </NavButton>
      <NavButton
        section="projects"
        currentSection={currentSection}
        onClick={() => setCurrentSection('projects')}
        onKeyDown={(e) => handleKeyNavigation(e, 'projects')}
      >
        Projects
      </NavButton>
      <NavButton
        section="blog"
        currentSection={currentSection}
        onClick={() => setCurrentSection('blog')}
        onKeyDown={(e) => handleKeyNavigation(e, 'blog')}
      >
        Blog
      </NavButton>
      <NavButton
        section="contact"
        currentSection={currentSection}
        onClick={() => setCurrentSection('contact')}
        onKeyDown={(e) => handleKeyNavigation(e, 'contact')}
      >
        Contact
      </NavButton>
    </nav>
  );
};

export default Navigation;
