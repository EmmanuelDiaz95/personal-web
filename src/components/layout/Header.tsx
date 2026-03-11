import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  return (
    <header className="flex justify-between items-center pb-11">
      <Link href="/" className="font-mono text-xl font-semibold tracking-[5px] text-text-primary transition-colors duration-300">
        EMMANUEL DIAZ
      </Link>
      <ThemeToggle />
    </header>
  );
}
