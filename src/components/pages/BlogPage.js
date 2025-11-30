import React from 'react';
import { blogPosts } from '../../data/blogPosts';
import BlogPostCard from '../ui/BlogPostCard';

const BlogPage = () => {
  return (
    <section className="space-y-16" aria-labelledby="blog-heading">
      <header className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 id="blog-heading" className="text-5xl font-extrabold">
          BLOG
        </h1>
        <p className="text-xl text-gray-400">
          Thoughts, insights, and reflections on urban design, technology, and participatory
          processes.
        </p>
      </header>
      <div className="grid md:grid-cols-1 gap-8">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default BlogPage;
