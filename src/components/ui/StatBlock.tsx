export default function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-mono text-[32px] font-semibold text-text-primary transition-colors duration-300">
        {value}
      </div>
      <div className="font-mono text-[11px] tracking-[2px] text-text-muted mt-1 transition-colors duration-300">
        {label}
      </div>
    </div>
  );
}
