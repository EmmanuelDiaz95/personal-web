'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const tabs = [
  { href: '/', label: 'ABOUT ME' },
  { href: '/experience', label: 'EXPERIENCE' },
  { href: '/projects', label: 'PROJECTS' },
  // Blog hidden until ready — restore this tab to bring it back.
  // { href: '/blog', label: 'BLOG' },
];

export default function PageTabs() {
  const pathname = usePathname();

  return (
    // Below md the bar breaks out of the layout's px-5 to run edge to edge, which
    // also buys each tab ~14px more room — "EXPERIENCE" overflowed its tab at 320px
    // while the bar was inset. Corners squared off so the full-bleed reads as
    // deliberate, especially once it sticks.
    <div className="flex gap-px mb-11 bg-border rounded-lg overflow-hidden sticky top-0 z-50 max-md:-mx-5 max-md:rounded-none">
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
