import React from 'react';
import { blogPosts } from '../data/blogPosts';

function BlogPage() {
  return (
    <div className="space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-5xl font-extrabold">BLOG</h2>
        <p className="text-xl text-gray-400">
          Thoughts, insights, and reflections on urban design, technology, and participatory processes.
        </p>
      </div>
      <div className="grid md:grid-cols-1 gap-8">
        {blogPosts.map((post, index) => (
          <div key={index} className="space-y-4 bg-blue-900/30 p-6 rounded-lg shadow-md hover:bg-blue-900/40 transition-colors cursor-pointer">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">{post.date}</span>
              <span className="text-sm text-gray-400">{post.readTime}</span>
            </div>
            <h3 className="text-3xl font-bold text-white">{post.title}</h3>
            <p className="text-gray-400">{post.excerpt}</p>
            <div className="pt-2">
              <span className="inline-block bg-blue-800/50 text-blue-200 text-sm px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogPage;
