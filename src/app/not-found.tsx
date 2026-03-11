import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <div className="font-mono text-6xl font-semibold text-text-faint mb-4">404</div>
      <p className="text-text-secondary mb-6">Page not found.</p>
      <Link
        href="/"
        className="font-mono text-sm text-text-primary underline underline-offset-[3px] hover:text-text-secondary transition-colors duration-150"
      >
        Back to home &rarr;
      </Link>
    </div>
  );
}
