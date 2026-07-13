'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import CompanyCard from '@/components/ui/CompanyCard';
import LogRow from '@/components/ui/LogRow';
import { profileSummary, companies, earlierRoles } from '@/data/experience';
import { runningIntro, races, goal } from '@/data/running';
import { mountainsIntro, climbs } from '@/data/mountains';

type TabId = 'professional' | 'running' | 'mountains';

const TABS: { id: TabId; label: string }[] = [
  { id: 'professional', label: 'Professional' },
  { id: 'running', label: 'Running' },
  { id: 'mountains', label: 'Mountains' },
];

function Narrative({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="flex flex-col gap-4 max-w-[720px] mb-9">
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

function GoalCard() {
  const [daysToGo, setDaysToGo] = useState<number | null>(null);

  // Computed after mount so the count stays accurate and doesn't cause a
  // server/client hydration mismatch.
  useEffect(() => {
    const race = new Date(`${goal.date}T00:00:00`).getTime();
    const days = Math.ceil((race - Date.now()) / 86_400_000);
    setDaysToGo(Math.max(0, days));
  }, []);

  const figures = [
    { value: goal.distanceKm.toString(), unit: 'km', label: 'Distance' },
    { value: goal.vertM.toLocaleString(), unit: 'm', label: 'Vert' },
    {
      value: daysToGo === null ? '—' : daysToGo.toString(),
      unit: 'days',
      label: 'To go',
    },
  ];

  return (
    <div className="border border-border rounded-[10px] bg-surface p-6 mb-9 transition-colors duration-300">
      <div className="flex items-start justify-between gap-8 max-sm:flex-col max-sm:gap-5">
        <div className="min-w-0">
          <div className="font-mono text-[11px] tracking-[2px] uppercase text-text-muted transition-colors duration-300">
            Current goal · In training
          </div>
          <div className="text-[20px] font-semibold mt-1.5 transition-colors duration-300">
            {goal.name}
          </div>
          <div className="text-sm text-text-secondary mt-1 transition-colors duration-300">
            {goal.location} · {goal.dateLabel}
          </div>
        </div>

        <div className="flex gap-8 max-sm:gap-6 shrink-0">
          {figures.map((f) => (
            <div key={f.label} className="text-right max-sm:text-left">
              <div className="whitespace-nowrap">
                <span className="font-mono text-[26px] max-sm:text-[22px] font-semibold leading-none text-text-primary transition-colors duration-300">
                  {f.value}
                </span>
                <span className="font-mono text-[12px] text-text-muted ml-1 transition-colors duration-300">
                  {f.unit}
                </span>
              </div>
              <div className="font-mono text-[10px] tracking-[1.5px] uppercase text-text-faint mt-1 transition-colors duration-300">
                {f.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ExperienceTabs() {
  const [active, setActive] = useState<TabId>('professional');

  const maxDist = Math.max(...races.map((r) => r.distanceKm));
  const maxGain = Math.max(...climbs.map((c) => c.gainM));

  return (
    <div>
      {/* Secondary sub-navigation */}
      <div
        role="tablist"
        className="flex gap-7 max-sm:gap-6 border-b border-border mb-8 overflow-x-auto"
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
          <Narrative paragraphs={[profileSummary]} />
          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4 mb-4">
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
          <GoalCard />
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
                eyebrow={`${c.dateLabel} · ${c.location}`}
                title={c.name}
                detail={c.detail}
                figure={c.gainM.toLocaleString()}
                unit="m"
                figureLabel="Vert gain"
                barPct={c.gainM / maxGain}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
