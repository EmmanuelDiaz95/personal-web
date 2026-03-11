import Link from 'next/link';

export default function CTACard() {
  return (
    <Link
      href="mailto:emmanueldc95@hotmail.com"
      className="bg-transparent border border-dashed border-cta-border rounded-[10px] p-7 flex flex-col items-center justify-center text-center hover:border-text-muted transition-all duration-300 min-h-[200px]"
    >
      <div className="text-4xl text-text-faint mb-3 font-light transition-colors duration-300">+</div>
      <div className="text-[15px] text-text-muted mb-2 transition-colors duration-300">Want to collaborate?</div>
      <div className="font-mono text-sm text-text-primary underline underline-offset-[3px] transition-colors duration-300">
        Let&apos;s talk &rarr;
      </div>
    </Link>
  );
}
