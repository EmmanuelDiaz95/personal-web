'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const tabs = [
  { href: '/', label: 'ABOUT ME' },
  { href: '/experience', label: 'EXPERIENCE' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/blog', label: 'BLOG' },
];

export default function PageTabs() {
  const pathname = usePathname();

  return (
    <div className="flex gap-px mb-11 bg-border rounded-lg overflow-hidden sticky top-0 z-50">
      {tabs.map(({ href, label }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex-1 py-4 text-center font-mono text-[13px] tracking-[2px] cursor-pointer transition-all duration-300',
              isActive
                ? 'text-text-primary bg-bg'
                : 'text-text-muted bg-surface hover:text-text-primary'
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
