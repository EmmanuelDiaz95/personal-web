import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDarkMode } from './hooks/useDarkMode';
import { useSearch } from './hooks/useSearch';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SearchBar from './components/ui/SearchBar';
import HomePage from './components/pages/HomePage';
import ProjectsPage from './components/pages/ProjectsPage';
import ProjectDetailPage from './components/pages/ProjectDetailPage';
import BlogPage from './components/pages/BlogPage';
import ContactPage from './components/pages/ContactPage';

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { showSearch, searchQuery, setSearchQuery, toggleSearch, handleSearch } = useSearch();

  return (
    <Router>
      <div
        className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
      >
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleSearch={toggleSearch} />

        <SearchBar
          showSearch={showSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          darkMode={darkMode}
        />

        <main className="max-w-6xl mx-auto mt-16 p-4 pb-20" role="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
}

export default App;
