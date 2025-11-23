import React from 'react';
import { Sun, Moon, Search } from 'lucide-react';
import Navigation from './Navigation';

const Header = ({ darkMode, currentSection, setCurrentSection, toggleDarkMode, toggleSearch }) => {
  return (
    <header className={`p-6 sticky top-0 z-10 backdrop-blur-sm ${darkMode ? 'bg-black/90' : 'bg-white/90'}`}>
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSearch}
            className="p-2 rounded-full hover:bg-blue-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-blue-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Moon className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
