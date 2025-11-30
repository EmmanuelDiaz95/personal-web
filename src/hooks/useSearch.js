import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { blogPosts } from '../data/blogPosts';

export const useSearch = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleSearch = useCallback(() => {
    setShowSearch((prev) => {
      if (prev) {
        setSearchQuery('');
      }
      return !prev;
    });
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const results = [];

    // Search projects
    projects.forEach((project) => {
      const searchableText = `${project.title} ${project.description} ${project.methods}`.toLowerCase();
      if (searchableText.includes(query)) {
        results.push({
          type: 'project',
          title: project.title,
          description: project.description,
          url: `/projects/${project.slug}`,
        });
      }
    });

    // Search blog posts
    blogPosts.forEach((post) => {
      const searchableText = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
      if (searchableText.includes(query)) {
        results.push({
          type: 'blog',
          title: post.title,
          description: post.excerpt,
          url: `/blog/${post.slug}`,
        });
      }
    });

    return results;
  }, [searchQuery]);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        // If there's exactly one result, navigate to it
        if (searchResults.length === 1) {
          navigate(searchResults[0].url);
          setShowSearch(false);
          setSearchQuery('');
        } else if (searchResults.length > 1) {
          // Show first result or navigate to search results page
          // For now, just navigate to the first result
          navigate(searchResults[0].url);
          setShowSearch(false);
          setSearchQuery('');
        } else {
          // No results found
          alert(`No results found for "${searchQuery}"`);
        }
      }
    },
    [searchQuery, searchResults, navigate]
  );

  return {
    showSearch,
    searchQuery,
    setSearchQuery,
    toggleSearch,
    handleSearch,
    searchResults,
  };
};
