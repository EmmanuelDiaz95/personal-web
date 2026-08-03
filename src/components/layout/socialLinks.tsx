import type { ComponentType } from 'react';
import { Github, Linkedin } from 'lucide-react';
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

export interface SocialLink {
  href: string;
  icon: ComponentType<{ size?: number }>;
  label: string;
  /** Kept in the header on phones. The rest are header-desktop-only, footer-everywhere. */
  primary?: boolean;
}

/**
 * Single source of truth for the social links, shared by Header and Footer.
 *
 * The header can only fit two links plus the theme toggle on a phone (see
 * docs/superpowers/specs/2026-08-02-mobile-header-footer-design.md), so the
 * non-primary ones are hidden below `md` there and reachable via the footer.
 */
export const socialLinks: SocialLink[] = [
  { href: SOCIAL.linkedin, icon: Linkedin, label: 'LinkedIn', primary: true },
  { href: SOCIAL.github, icon: Github, label: 'GitHub', primary: true },
  { href: SOCIAL.strava, icon: StravaIcon, label: 'Strava' },
  { href: SOCIAL.goodreads, icon: GoodreadsIcon, label: 'Goodreads' },
  { href: SOCIAL.substack, icon: SubstackIcon, label: 'Substack' },
];
