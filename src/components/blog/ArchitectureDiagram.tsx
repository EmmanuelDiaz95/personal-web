import { ArrowRight } from 'lucide-react';

interface Stage {
  index: string;
  title: string;
  tag: string;
  items: string[];
}

const stages: Stage[] = [
  {
    index: '01',
    title: 'Capture',
    tag: 'garmin',
    items: [
      'Activities — distance, vert, pace, HR',
      'Daily health — sleep, HRV, resting HR, body battery',
      'Gap detectors backfill whatever the sync missed',
    ],
  },
  {
    index: '02',
    title: 'Store',
    tag: 'postgres',
    items: [
      'activities · daily_health · week_snapshots',
      'training_plan · plan_changes',
      'Every plan edit written to an audit log',
    ],
  },
  {
    index: '03',
    title: 'Decide',
    tag: 'deterministic',
    items: [
      'Compliance score against plan targets',
      'Six alert rules — drift, spike, ratio, misses',
      'ACWR readiness and plan adjustments',
    ],
  },
  {
    index: '04',
    title: 'Speak',
    tag: 'claude haiku',
    items: [
      'Receives the verdict, plan, actuals, health',
      'Plus the last 20 exchanges for continuity',
      'Writes the words. Never computes the numbers.',
    ],
  },
];

const surfaces = [
  ['Dashboard', 'Compliance ring, 30-week chart, inline alerts'],
  ['Coach chat', 'Streaming answers over SSE'],
];

/**
 * System overview for the ultra tracker post. Built as text in a grid rather
 * than an exported image so it stays legible on a phone, reflows, and follows
 * the reader's light or dark theme.
 */
export default function ArchitectureDiagram() {
  return (
    <figure className="my-10 lg:-mx-20">
      <div className="rounded-[10px] border border-border bg-surface px-5 py-6 sm:px-7 sm:py-8">
        <div className="grid grid-cols-1 gap-x-2 gap-y-4 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
          {stages.map((stage, i) => (
            <div key={stage.index} className="contents">
              <div className="rounded-[8px] border border-border bg-bg p-4">
                <div className="mb-2.5 flex items-baseline justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-faint">
                    {stage.index}
                  </span>
                  <span className="font-mono text-[10px] lowercase tracking-[0.06em] text-text-muted">
                    {stage.tag}
                  </span>
                </div>
                <h4 className="mb-3 text-[15px] font-semibold text-text-primary">{stage.title}</h4>
                <ul className="space-y-1.5">
                  {stage.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[11px] leading-[1.55] text-text-secondary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {i < stages.length - 1 && (
                <div className="hidden items-center justify-center lg:flex" aria-hidden="true">
                  <ArrowRight size={14} className="text-text-faint" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:gap-8">
          {surfaces.map(([name, detail]) => (
            <div key={name} className="flex items-baseline gap-2.5">
              <ArrowRight size={12} className="shrink-0 translate-y-0.5 text-text-faint" />
              <span className="text-[13px] font-semibold text-text-primary">{name}</span>
              <span className="font-mono text-[11px] leading-[1.5] text-text-muted">{detail}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mx-auto mt-3 max-w-[68ch] font-mono text-xs leading-relaxed text-text-muted">
        The whole system. Nothing here is a fine-tuned model — the coach is grounded by feeding it
        the rule engine&apos;s output alongside current training and health data, so the judgment
        stays in code I can test and the model only handles language.
      </figcaption>
    </figure>
  );
}
