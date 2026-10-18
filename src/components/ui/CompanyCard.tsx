import Image from 'next/image';
import { ChevronUp } from 'lucide-react';
import type { Company } from '@/data/experience';
import { cn } from '@/lib/utils';

/**
 * With highlights, the card has two layouts (motion lives in globals.css):
 * - Mouse/trackpad (`can-hover`): looks like a plain card; on hover or keyboard
 *   focus the highlights panel slides up over the front.
 * - Touch: no hover to rely on, so the highlights sit inside the card under a
 *   divider, in place of the summary they would mostly repeat.
 */
export default function CompanyCard({ company }: { company: Company }) {
  const highlights = company.highlights ?? [];
  const hasHighlights = highlights.length > 0;

  return (
    <div
      tabIndex={hasHighlights ? 0 : undefined}
      className={cn(
        'bg-surface border border-border rounded-[10px] hover:border-border-hover transition-all duration-300 cursor-default',
        'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-text-muted',
        hasHighlights && 'highlight-card'
      )}
    >
      <div className={cn('highlight-front p-5', hasHighlights && 'pb-3.5 can-hover:pb-5')}>
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-[42px] h-[42px] rounded-[10px] bg-logo-bg border border-logo-border flex items-center justify-center overflow-hidden shrink-0 transition-all duration-300">
            {company.logo ? (
              <Image
                src={company.logo}
                alt={company.name}
                width={42}
                height={42}
                className="object-cover rounded-[10px]"
              />
            ) : (
              <span className="font-mono text-sm font-semibold text-text-muted transition-colors duration-300">
                {company.monogram}
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-text-muted transition-colors duration-300">
            {company.period}
          </span>
          {hasHighlights && (
            <span className="hidden can-hover:flex ml-auto items-center gap-1.5 font-mono text-[10px] tracking-[1.5px] uppercase text-text-muted transition-colors duration-300">
              Highlights
              <ChevronUp size={12} aria-hidden="true" />
            </span>
          )}
        </div>
        <div className="text-[17px] font-semibold mb-1 transition-colors duration-300">{company.name}</div>
        <div className="text-sm text-text-secondary transition-colors duration-300">
          {company.role}
          {company.countries && ` · ${company.countries}`}
        </div>
        {company.summary && (
          <p
            className={cn(
              'text-[13px] text-text-muted leading-[1.55] mt-2.5 transition-colors duration-300',
              hasHighlights && 'hidden can-hover:block'
            )}
          >
            {company.summary}
          </p>
        )}
      </div>

      {hasHighlights && (
        <div className="highlight-panel px-5 pb-5 can-hover:pt-5 can-hover:bg-surface">
          <div className="hidden can-hover:flex items-baseline justify-between gap-3 mb-3.5">
            <span className="text-[15px] font-semibold transition-colors duration-300">{company.name}</span>
            <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-text-muted transition-colors duration-300">
              Highlights
            </span>
          </div>
          <ul className="space-y-2 border-t border-border pt-3.5 can-hover:border-t-0 can-hover:pt-0 transition-colors duration-300">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="highlight-item flex gap-2.5 text-sm leading-[1.5] text-text-secondary transition-colors duration-300"
              >
                <span aria-hidden="true" className="text-text-muted">—</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
