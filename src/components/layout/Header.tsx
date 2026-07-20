import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { SOCIAL } from '@/data/constants';

function StravaIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
    </svg>
  );
}

function GoodreadsIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function SubstackIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16" />
      <path d="M4 8h16" />
      <path d="M4 12l8 6 8-6" />
    </svg>
  );
}

const socialLinks = [
  { href: SOCIAL.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: SOCIAL.github, icon: Github, label: 'GitHub' },
  { href: SOCIAL.strava, icon: StravaIcon, label: 'Strava' },
  { href: SOCIAL.goodreads, icon: GoodreadsIcon, label: 'Goodreads' },
  { href: SOCIAL.substack, icon: SubstackIcon, label: 'Substack' },
];

export default function Header() {
  return (
    <header className="flex justify-between items-center pb-11">
      <Link href="/" className="font-mono text-xl font-semibold tracking-[5px] text-text-primary transition-colors duration-300">
        EMMANUEL DIAZ
      </Link>
      <div className="flex items-center gap-2">
        {socialLinks.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-lg text-text-muted hover:text-text-primary transition-colors duration-300"
            aria-label={label}
          >
            <Icon size={18} />
          </a>
        ))}
        <ThemeToggle />
      </div>
    </header>
  );
}
