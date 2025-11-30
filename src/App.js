import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useSearch } from './hooks/useSearch';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SearchBar from './components/ui/SearchBar';

// Lazy load page components for code splitting
const HomePage = lazy(() => import('./components/pages/HomePage'));
const ProjectsPage = lazy(() => import('./components/pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./components/pages/ProjectDetailPage'));
const BlogPage = lazy(() => import('./components/pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./components/pages/BlogDetailPage'));
const ContactPage = lazy(() => import('./components/pages/ContactPage'));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-400">Loading...</p>
    </div>
  </div>
);

function AppContent() {
  const { darkMode } = useTheme();
  const { showSearch, searchQuery, setSearchQuery, toggleSearch, handleSearch } = useSearch();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Header toggleSearch={toggleSearch} />

      <SearchBar
        showSearch={showSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      <main className="max-w-6xl mx-auto mt-16 p-4 pb-20" role="main">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
