import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const BlogPostCard = ({ post }) => {
  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <article className="space-y-4 bg-blue-900/30 p-6 rounded-lg shadow-md hover:bg-blue-900/40 transition-colors">
        <div className="flex justify-between items-center">
          <time className="text-sm text-gray-400" dateTime={post.date}>
            {post.date}
          </time>
          <span className="text-sm text-gray-400">{post.readTime}</span>
        </div>
        <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-400">{post.excerpt}</p>
        <div className="flex justify-between items-center pt-2">
          <span className="inline-block bg-blue-800/50 text-blue-200 text-sm px-3 py-1 rounded-full">
            {post.category}
          </span>
          <div className="flex items-center gap-2 text-blue-400 group-hover:gap-3 transition-all">
            <span className="text-sm">Read More</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogPostCard;
