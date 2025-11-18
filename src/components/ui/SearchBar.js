import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ showSearch, searchQuery, setSearchQuery, handleSearch, darkMode }) => {
  if (!showSearch) return null;

  return (
    <div
      className={`p-4 border-b ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-100 border-gray-300'}`}
      role="search"
    >
      <form onSubmit={handleSearch} className="max-w-6xl mx-auto">
        <div className="relative">
          <label htmlFor="search-input" className="sr-only">
            Search projects, blog posts, or content
          </label>
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, blog posts, or content..."
            className={`w-full px-4 py-2 pl-10 rounded-md border ${
              darkMode
                ? 'bg-slate-900 border-slate-600 text-white'
                : 'bg-white border-gray-300 text-black'
            } focus:outline-none focus:ring-2 focus:ring-blue-600`}
            aria-label="Search projects, blog posts, or content"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
