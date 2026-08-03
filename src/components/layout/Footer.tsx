import { socialLinks } from './socialLinks';

/**
 * Mobile-only footer. Desktop keeps all five links in the Header and renders no
 * footer at all, so this is hidden from `md` up.
 *
 * It intentionally repeats LinkedIn and GitHub, which are also in the mobile
 * header: this is the canonical list, so someone scrolling to the bottom for
 * links finds all of them here rather than a remainder set.
 */
export default function Footer() {
  return (
    <footer className="md:hidden mt-16 pt-8 border-t border-border">
      <div className="flex items-center gap-2 -ml-2">
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
      </div>
      <p className="mt-3 font-mono text-[11px] tracking-[1.5px] uppercase text-text-faint transition-colors duration-300">
        © 2026 Emmanuel Diaz
      </p>
    </footer>
  );
}
