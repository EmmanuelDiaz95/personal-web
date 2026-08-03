import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { socialLinks } from './socialLinks';
import { cn } from '@/lib/utils';

export default function Header() {
  return (
    <header className="flex justify-between items-center pb-11">
      {/* Below md the masthead used to wrap to two lines once the icon strip
          crowded it. nowrap plus two size steps keep it on one line down to 320px. */}
      <Link
        href="/"
        className="font-mono text-xl font-semibold tracking-[5px] text-text-primary transition-colors duration-300 max-md:whitespace-nowrap max-md:text-base max-md:tracking-[3px] max-[360px]:text-sm max-[360px]:tracking-[2px]"
      >
        EMMANUEL DIAZ
      </Link>
      <div className="flex items-center gap-2 max-md:shrink-0">
        {socialLinks.map(({ href, icon: Icon, label, primary }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'w-10 h-10 flex items-center justify-center rounded-lg text-text-muted hover:text-text-primary transition-colors duration-300',
              // Only two links fit beside the masthead on a phone; the rest stay
              // reachable through the mobile-only Footer.
              !primary && 'max-md:hidden'
            )}
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
