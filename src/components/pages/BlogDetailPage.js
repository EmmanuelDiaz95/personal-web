import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getBlogPostBySlug } from '../../data/blogPosts';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-gray-400 mb-8">
          The blog post you're looking for doesn't exist.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
          <span className="px-3 py-1 bg-blue-800/50 text-blue-200 text-sm rounded-full">
            {post.category}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <p className="text-xl text-gray-400">{post.excerpt}</p>
      </header>

      {/* Content */}
      <section className="mb-12">
        <div className="text-gray-400 leading-relaxed space-y-4 text-lg">
          {post.fullContent
            .trim()
            .split('\n\n')
            .map((paragraph) => (
              <p key={paragraph.substring(0, 50)}>{paragraph.trim()}</p>
            ))}
        </div>
      </section>

      {/* Navigation */}
      <footer className="pt-8 border-t border-gray-800">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          View All Posts
        </Link>
      </footer>
    </article>
  );
};

export default BlogDetailPage;
