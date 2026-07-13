export interface LogRowProps {
  eyebrow: string;
  title: string;
  detail?: string;
  figure: string;
  unit: string;
  figureLabel?: string;
  /** 0..1 — fraction of the row's headline metric relative to the largest in the list. */
  barPct: number;
}

export default function LogRow({
  eyebrow,
  title,
  detail,
  figure,
  unit,
  figureLabel,
  barPct,
}: LogRowProps) {
  return (
    <div className="group py-5 border-b border-border transition-colors duration-300">
      <div className="flex items-start justify-between gap-6 max-sm:gap-4">
        <div className="min-w-0">
          <div className="font-mono text-[11px] tracking-[2px] uppercase text-text-muted transition-colors duration-300">
            {eyebrow}
          </div>
          <div className="text-[18px] font-semibold mt-1.5 transition-colors duration-300">
            {title}
          </div>
          {detail && (
            <div className="text-sm text-text-secondary mt-1.5 max-w-[560px] transition-colors duration-300">
              {detail}
            </div>
          )}
        </div>

        <div className="text-right shrink-0">
          <div className="whitespace-nowrap">
            <span className="font-mono text-[30px] max-sm:text-[25px] font-semibold leading-none text-text-primary transition-colors duration-300">
              {figure}
            </span>
            <span className="font-mono text-[13px] text-text-muted ml-1 transition-colors duration-300">
              {unit}
            </span>
          </div>
          {figureLabel && (
            <div className="font-mono text-[10px] tracking-[1.5px] uppercase text-text-faint mt-1 transition-colors duration-300">
              {figureLabel}
            </div>
          )}
        </div>
      </div>

      {/* Proportional metric bar — the signature: encodes the real headline number. */}
      <div className="mt-3.5 h-[2px] w-full bg-border rounded-full overflow-hidden transition-colors duration-300">
        <div
          className="h-full bg-text-muted group-hover:bg-text-primary transition-all duration-500"
          style={{ width: `${Math.max(4, Math.round(barPct * 100))}%` }}
        />
      </div>
    </div>
  );
}
