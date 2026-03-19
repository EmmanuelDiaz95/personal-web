import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { SOCIAL } from '@/data/constants';

function StravaIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-4-8-4 8" />
      <path d="M15 18l4-8h-5" />
    </svg>
  );
}

const socialLinks = [
  { href: SOCIAL.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: SOCIAL.github, icon: Github, label: 'GitHub' },
  { href: SOCIAL.strava, icon: StravaIcon, label: 'Strava' },
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
