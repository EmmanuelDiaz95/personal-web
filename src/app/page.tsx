import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { bio, highlights } from '@/data/about';

export default function AboutPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-7">
        <h1 className="font-mono text-[13px] tracking-[3px] text-text-muted uppercase transition-colors duration-300">
          About Me
        </h1>
      </div>

      <div className="flex gap-10 max-md:flex-col mb-10">
        {/* Profile photo */}
        {/* Fluid below md so the photo scales with the phone rather than sitting
            at a fixed 200px. The 3:4 ratio is preserved by w-full h-auto on the
            768x1024 source, so 80% is a width choice, not a crop. */}
        <div className="w-[240px] max-md:w-[80%] max-md:mx-auto shrink-0">
          <Image
            src="/images/profile.jpg"
            alt="Emmanuel Diaz"
            width={768}
            height={1024}
            priority
            className="w-full h-auto rounded-[10px] border border-border transition-colors duration-300"
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-4">
          {bio.map((paragraph, i) => (
            <p
              key={i}
              className={`text-[17px] leading-[1.7] transition-colors duration-300 ${
                i === 0 ? 'text-text-primary font-medium' : 'text-text-secondary'
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4">
        {highlights.map((highlight) => {
          const inner = (
            <>
              <div className="font-mono text-[11px] tracking-[2px] text-text-muted uppercase mb-2 transition-colors duration-300">
                {highlight.label}
              </div>
              <div className="text-[17px] font-semibold flex items-start gap-1.5 transition-colors duration-300">
                <span>{highlight.value}</span>
                {highlight.href && (
                  <ArrowUpRight
                    size={15}
                    className="mt-1 shrink-0 text-text-muted group-hover:text-text-primary transition-colors duration-300"
                  />
                )}
              </div>
            </>
          );

          return highlight.href ? (
            <a
              key={highlight.label}
              href={highlight.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-surface border border-border rounded-[10px] p-6 hover:border-border-hover transition-all duration-300"
            >
              {inner}
            </a>
          ) : (
            <div
              key={highlight.label}
              className="bg-surface border border-border rounded-[10px] p-6 hover:border-border-hover transition-all duration-300"
            >
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
