import { useState } from 'react';

export const useSearch = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement actual search functionality
      alert(`Search functionality is a placeholder. You searched for: "${searchQuery}"`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  return {
    showSearch,
    searchQuery,
    setSearchQuery,
    toggleSearch,
    handleSearch,
  };
};
