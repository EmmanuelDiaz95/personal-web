export default function TagPill({ label }: { label: string }) {
  return (
    <span className="font-mono text-[11px] text-text-muted bg-bg px-3 py-1 rounded-xl transition-all duration-300">
      {label}
    </span>
  );
}
