'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CONTACT } from '@/data/constants';

const navItems = [
  { href: '/', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  // Blog hidden until ready — restore this entry to bring it back.
  // { href: '/blog', label: 'Blog' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-nav-bg backdrop-blur-[12px] border-t border-border z-50 px-16 max-md:px-5 transition-all duration-300">
      <div className="max-w-page mx-auto flex gap-9 items-center font-mono text-sm py-4">
        {navItems.map(({ href, label }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'transition-colors duration-150',
                isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {label}
            </Link>
          );
        })}
        <span className="ml-auto text-xs text-text-muted transition-colors duration-300">
          {CONTACT.email}
        </span>
      </div>
    </nav>
  );
}
