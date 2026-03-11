'use client';

export default function SearchBar({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-surface border border-border rounded-lg px-4 py-2.5 font-mono text-[13px] text-text-muted w-[260px] max-md:w-full outline-none focus:border-border-hover transition-all duration-300"
    />
  );
}
