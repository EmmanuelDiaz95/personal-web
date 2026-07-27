interface TerminalBlockProps {
  /** Raw terminal output. Rendered verbatim as selectable text, never an image. */
  children: string;
  /** Optional window title, e.g. the working directory. */
  title?: string;
}

/**
 * Terminal output styled as a window. Deliberately text, not a screenshot —
 * screenshotted terminal output is unselectable, illegible on mobile and
 * invisible to screen readers.
 */
export default function TerminalBlock({ children, title }: TerminalBlockProps) {
  return (
    <div className="my-8 overflow-hidden rounded-[10px] border border-border bg-[#0d0d0d]">
      <div className="flex items-center gap-2 border-b border-[#1c1c1c] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#2a2a2a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#2a2a2a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#2a2a2a]" />
        </span>
        {title && (
          <span className="font-mono text-[11px] text-[#666666]">{title}</span>
        )}
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-[1.65] text-[#d0d0d0]">
        <code>{children}</code>
      </pre>
    </div>
  );
}
