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

      {/* Below md this drops out of flex to a block box so the photo can float
          and the bio can wrap around it. A flex container would be pushed aside
          by the float whole rather than flowing around it. */}
      <div className="flex gap-10 max-md:block mb-10">
        {/* Profile photo */}
        {/* Floated left on mobile with the bio running alongside, then under.
            Width is a deliberate compromise: every pixel here comes straight
            out of the text measure beside it. */}
        <div className="w-[240px] shrink-0 max-md:float-left max-md:w-[45%] max-md:max-w-[170px] max-md:mr-5 max-md:mb-2">
          <Image
            src="/images/profile.jpg"
            alt="Emmanuel Diaz"
            width={768}
            height={1024}
            priority
            className="w-full h-auto rounded-[10px] border border-border transition-colors duration-300"
          />
        </div>

        {/* Bio — block below md so its line boxes shorten around the float. */}
        <div className="flex flex-col gap-4 max-md:block">
          {bio.map((paragraph, i) => (
            <p
              key={i}
              className={`text-[17px] leading-[1.7] transition-colors duration-300 max-md:mb-4 ${
                i === 0 ? 'text-text-primary font-medium' : 'text-text-secondary'
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Highlights */}
      {/* clear-both so the floated photo can never spill into this grid if the
          bio is ever shortened below the photo's height. */}
      <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4 max-md:clear-both">
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
