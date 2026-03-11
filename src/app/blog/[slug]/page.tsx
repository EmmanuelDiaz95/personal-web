import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { blogPosts, getBlogPostBySlug } from '@/data/blogPosts';
import TagPill from '@/components/ui/TagPill';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="max-w-2xl">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-text-primary transition-colors duration-150 mb-8"
      >
        <ArrowLeft size={14} /> Back to blog
      </Link>

      <div className="flex justify-between font-mono text-xs text-text-muted mb-4 transition-colors duration-300">
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6 leading-tight">{post.title}</h1>

      <div className="text-[15px] text-text-secondary leading-relaxed whitespace-pre-line mb-8 transition-colors duration-300">
        {post.content}
      </div>

      <div className="flex gap-2 flex-wrap">
        <TagPill label={post.category} />
        {post.tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>
    </div>
  );
}
