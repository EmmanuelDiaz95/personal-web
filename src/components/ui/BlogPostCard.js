import React from 'react';

const BlogPostCard = ({ post }) => {
  return (
    <article className="space-y-4 bg-blue-900/30 p-6 rounded-lg shadow-md hover:bg-blue-900/40 transition-colors cursor-pointer">
      <div className="flex justify-between items-center">
        <time className="text-sm text-gray-400" dateTime={post.date}>
          {post.date}
        </time>
        <span className="text-sm text-gray-400">{post.readTime}</span>
      </div>
      <h3 className="text-3xl font-bold text-white">{post.title}</h3>
      <p className="text-gray-400">{post.excerpt}</p>
      <div className="pt-2">
        <span className="inline-block bg-blue-800/50 text-blue-200 text-sm px-3 py-1 rounded-full">
          {post.category}
        </span>
      </div>
    </article>
  );
};

export default BlogPostCard;
