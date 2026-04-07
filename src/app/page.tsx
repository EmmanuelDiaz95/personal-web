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
        {/* Photo placeholder */}
        <div className="w-[220px] h-[220px] max-md:w-[180px] max-md:h-[180px] rounded-[10px] bg-surface border border-border flex items-center justify-center shrink-0 transition-all duration-300">
          <span className="font-mono text-3xl font-semibold text-text-muted transition-colors duration-300">
            ED
          </span>
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
        {highlights.map((highlight) => (
          <div
            key={highlight.label}
            className="bg-surface border border-border rounded-[10px] p-6 hover:border-border-hover transition-all duration-300"
          >
            <div className="font-mono text-[11px] tracking-[2px] text-text-muted uppercase mb-2 transition-colors duration-300">
              {highlight.label}
            </div>
            <div className="text-[17px] font-semibold transition-colors duration-300">
              {highlight.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
