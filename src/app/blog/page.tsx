'use client';

import { useState } from 'react';
import { blogPosts, getCategories, getAllTags } from '@/data/blogPosts';
import BlogPostCard from '@/components/ui/BlogPostCard';
import SearchBar from '@/components/ui/SearchBar';
import TagPill from '@/components/ui/TagPill';
import NewsletterForm from '@/components/ui/NewsletterForm';
import { cn } from '@/lib/utils';

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = getCategories();
  const tags = getAllTags();

  const filtered = blogPosts.filter((post) => {
    const matchesSearch = [post.title, post.excerpt, post.category]
      .some((f) => f.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-7">
        <h1 className="font-mono text-[13px] tracking-[3px] text-text-muted uppercase transition-colors duration-300">
          Blog
        </h1>
      </div>

      <div className="flex gap-10 max-md:flex-col">
        {/* Sidebar */}
        <aside className="w-60 max-md:w-full shrink-0">
          <div className="mb-7">
            <SearchBar placeholder="Search articles..." value={search} onChange={setSearch} />
          </div>

          <div className="mb-7">
            <div className="font-mono text-[11px] tracking-[2px] text-text-muted uppercase mb-3.5 transition-colors duration-300">Categories</div>
            <div
              onClick={() => setActiveCategory('All')}
              className={cn(
                'text-[15px] py-1.5 cursor-pointer transition-colors duration-150',
                activeCategory === 'All' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              )}
            >
              All
            </div>
            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'text-[15px] py-1.5 cursor-pointer transition-colors duration-150',
                  activeCategory === cat ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {cat}
              </div>
            ))}
          </div>

          <div className="mb-7">
            <div className="font-mono text-[11px] tracking-[2px] text-text-muted uppercase mb-3.5 transition-colors duration-300">Tags</div>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <TagPill key={tag} label={tag} />
              ))}
            </div>
          </div>

          <NewsletterForm />
        </aside>

        {/* Articles */}
        <div className="flex-1 flex flex-col gap-4">
          {filtered.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
          {filtered.length === 0 && (
            <p className="text-text-muted font-mono text-sm">No articles found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
