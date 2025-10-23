import React, { useState, useEffect } from 'react';
import { Sun, Moon, Search, Linkedin, Github, Twitter } from 'lucide-react';
import HomePage from './components/HomePage';
import ProjectsPage from './components/ProjectsPage';
import BlogPage from './components/BlogPage';
import ContactPage from './components/ContactPage';
import { siteConfig } from './config/siteConfig';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Search functionality is a placeholder. You searched for: "${searchQuery}"`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <header className={`p-6 sticky top-0 z-10 ${darkMode ? 'bg-black' : 'bg-white'}`}>
          <nav className="flex justify-between items-center max-w-6xl mx-auto">
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentSection('home')}
                className={`px-4 py-2 rounded-full transition-colors ${currentSection === 'home' ? (darkMode ? 'bg-blue-900/30' : 'bg-blue-100') : 'hover:bg-blue-900/30 dark:hover:bg-blue-900/30'}`}
                aria-label="Navigate to About section"
                aria-current={currentSection === 'home' ? 'page' : undefined}
              >
                About
              </button>
              <button
                onClick={() => setCurrentSection('projects')}
                className={`px-4 py-2 rounded-full transition-colors ${currentSection === 'projects' ? (darkMode ? 'bg-blue-900/30' : 'bg-blue-100') : 'hover:bg-blue-900/30 dark:hover:bg-blue-900/30'}`}
                aria-label="Navigate to Projects section"
                aria-current={currentSection === 'projects' ? 'page' : undefined}
              >
                Projects
              </button>
              <button
                onClick={() => setCurrentSection('blog')}
                className={`px-4 py-2 rounded-full transition-colors ${currentSection === 'blog' ? (darkMode ? 'bg-blue-900/30' : 'bg-blue-100') : 'hover:bg-blue-900/30 dark:hover:bg-blue-900/30'}`}
                aria-label="Navigate to Blog section"
                aria-current={currentSection === 'blog' ? 'page' : undefined}
              >
                Blog
              </button>
              <button
                onClick={() => setCurrentSection('contact')}
                className={`px-4 py-2 rounded-full transition-colors ${currentSection === 'contact' ? (darkMode ? 'bg-blue-900/30' : 'bg-blue-100') : 'hover:bg-blue-900/30 dark:hover:bg-blue-900/30'}`}
                aria-label="Navigate to Contact section"
                aria-current={currentSection === 'contact' ? 'page' : undefined}
              >
                Contact
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSearch}
                className="p-2 rounded-full hover:bg-blue-900/30 transition-colors"
                aria-label="Toggle search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-blue-900/30 transition-colors"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </header>

        {showSearch && (
          <div className={`p-4 border-b ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-100 border-gray-300'}`}>
            <form onSubmit={handleSearch} className="max-w-6xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, blog posts, or content..."
                  className={`w-full px-4 py-2 pl-10 rounded-md border ${darkMode ? 'bg-slate-900 border-slate-600 text-white' : 'bg-white border-gray-300 text-black'} focus:outline-none focus:ring-2 focus:ring-blue-600`}
                  autoFocus
                  aria-label="Search content"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </form>
          </div>
        )}

        <main className="max-w-6xl mx-auto mt-16 p-4 pb-20">
          {currentSection === 'home' && <HomePage />}
          {currentSection === 'projects' && <ProjectsPage />}
          {currentSection === 'blog' && <BlogPage />}
          {currentSection === 'contact' && <ContactPage />}
        </main>

        <footer className={`fixed bottom-0 left-0 right-0 p-4 ${darkMode ? 'bg-black' : 'bg-white'}`}>
          <div className="flex justify-between max-w-6xl mx-auto">
            <p className="text-sm text-gray-400">© 2023 Emmanuel. All rights reserved.</p>
            <div className="flex space-x-4">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Visit Emmanuel's LinkedIn profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Visit Emmanuel's GitHub profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Visit Emmanuel's Twitter profile"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </footer>
      </div>
  );
}

export default App;
