'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import CompanyCard from '@/components/ui/CompanyCard';
import LogRow from '@/components/ui/LogRow';
import { companies, earlierRoles } from '@/data/experience';
import { runningIntro, races } from '@/data/running';
import { mountainsIntro, climbs } from '@/data/mountains';

type TabId = 'professional' | 'running' | 'mountains';

const TABS: { id: TabId; label: string }[] = [
  { id: 'professional', label: 'Professional' },
  { id: 'running', label: 'Running' },
  { id: 'mountains', label: 'Mountains' },
];

function Narrative({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="text-[17px] text-text-secondary leading-[1.7] transition-colors duration-300"
        >
          {p}
        </p>
      ))}
    </div>
  );
}

export default function ExperienceTabs() {
  const [active, setActive] = useState<TabId>('professional');

  const maxDist = Math.max(...races.map((r) => r.distanceKm));
  const maxHigh = Math.max(...climbs.map((c) => c.highPointM));

  return (
    <div>
      {/* Secondary sub-navigation */}
      <div
        role="tablist"
        className="flex gap-7 max-sm:gap-6 border-b border-border mb-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TABS.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.id)}
              className={cn(
                'relative -mb-px pb-3 shrink-0 font-mono text-[13px] tracking-[2px] uppercase cursor-pointer transition-colors duration-300',
                isActive
                  ? 'text-text-primary'
                  : 'text-text-muted hover:text-text-secondary'
              )}
            >
              {t.label}
              {isActive && (
                <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-text-primary" />
              )}
            </button>
          );
        })}
      </div>

      {active === 'professional' && (
        <div>
          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-3.5 mb-4">
            {companies.map((company) => (
              <CompanyCard key={company.name} company={company} />
            ))}
          </div>
          <p className="font-mono text-[13px] text-text-muted text-center mt-2 transition-colors duration-300">
            {earlierRoles}
          </p>
        </div>
      )}

      {active === 'running' && (
        <div>
          <Narrative paragraphs={runningIntro} />
          <div className="font-mono text-[11px] tracking-[2px] uppercase text-text-muted mb-1 transition-colors duration-300">
            Race log
          </div>
          <div className="border-t border-border">
            {races.map((r) => (
              <LogRow
                key={`${r.date}-${r.name}`}
                eyebrow={`${r.dateLabel} · ${r.location}`}
                title={r.name}
                detail={`${r.vertM.toLocaleString()} m vert · ${r.time} finish`}
                figure={r.distanceKm.toFixed(1)}
                unit="km"
                figureLabel="Distance"
                barPct={r.distanceKm / maxDist}
              />
            ))}
          </div>
        </div>
      )}

      {active === 'mountains' && (
        <div>
          <Narrative paragraphs={mountainsIntro} />
          <div className="font-mono text-[11px] tracking-[2px] uppercase text-text-muted mb-1 transition-colors duration-300">
            Climb log
          </div>
          <div className="border-t border-border">
            {climbs.map((c) => (
              <LogRow
                key={`${c.date}-${c.name}`}
                eyebrow={
                  <>
                    {c.dateLabel} ·{' '}
                    <span
                      role="img"
                      aria-label={c.location}
                      title={c.location}
                      className="inline-block align-middle text-[15px] leading-none tracking-normal -mt-[3px]"
                    >
                      {c.flag}
                    </span>
                  </>
                }
                title={c.name}
                detail={`${c.gainM.toLocaleString()} m vert · ${c.detail}`}
                figure={c.highPointM.toLocaleString()}
                unit="m"
                figureLabel="High point"
                barPct={c.highPointM / maxHigh}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
