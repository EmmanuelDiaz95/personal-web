import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['IBM Plex Mono', 'SF Mono', 'Fira Code', 'monospace'],
        sans: ['-apple-system', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1440px',
      },
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        'border-hover': 'var(--border-hover)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'text-faint': 'var(--text-faint)',
        'cta-border': 'var(--cta-border)',
        'badge-bg': 'var(--badge-bg)',
        'logo-bg': 'var(--logo-bg)',
        'logo-border': 'var(--logo-border)',
        'nav-bg': 'var(--nav-bg)',
      },
    },
  },
  plugins: [
    // A real hover (mouse/trackpad), regardless of screen width — tablets are wide
    // but touch-only. Keep in sync with the same query in globals.css.
    plugin(({ addVariant }) => {
      addVariant('can-hover', '@media (hover: hover) and (pointer: fine)');
    }),
  ],
};

export default config;
