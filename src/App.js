import React, { useState } from 'react';
import { useDarkMode } from './hooks/useDarkMode';
import { useSearch } from './hooks/useSearch';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SearchBar from './components/ui/SearchBar';
import HomePage from './components/pages/HomePage';
import ProjectsPage from './components/pages/ProjectsPage';
import BlogPage from './components/pages/BlogPage';
import ContactPage from './components/pages/ContactPage';

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { showSearch, searchQuery, setSearchQuery, toggleSearch, handleSearch } = useSearch();
  const [currentSection, setCurrentSection] = useState('home');

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <HomePage />;
      case 'projects':
        return <ProjectsPage />;
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      <Header
        darkMode={darkMode}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        toggleDarkMode={toggleDarkMode}
        toggleSearch={toggleSearch}
      />

      <SearchBar
        showSearch={showSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        darkMode={darkMode}
      />

      <main className="max-w-6xl mx-auto mt-16 p-4 pb-20" role="main">
        {renderSection()}
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
