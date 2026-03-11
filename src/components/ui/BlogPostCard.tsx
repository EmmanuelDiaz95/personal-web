import Link from 'next/link';
import TagPill from '@/components/ui/TagPill';
import type { BlogPost } from '@/data/blogPosts';

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-surface border border-border rounded-[10px] p-7 hover:border-border-hover transition-all duration-300 block"
    >
      <div className="flex justify-between font-mono text-xs text-text-muted mb-3 transition-colors duration-300">
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </div>
      <h2 className="text-lg font-medium mb-1.5 leading-tight transition-colors duration-300">{post.title}</h2>
      <p className="text-[15px] text-text-secondary leading-relaxed transition-colors duration-300">{post.excerpt}</p>
      <div className="mt-3 flex gap-2">
        <TagPill label={post.category} />
      </div>
    </Link>
  );
}
