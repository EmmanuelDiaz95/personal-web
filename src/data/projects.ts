export type ProjectStatus = 'shipped' | 'in progress' | 'archived';

export interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  role: string;
  status: ProjectStatus;
  tags: string[];
  methods: string;
  timeline: string;
  team: string;
  outcomes: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Slug of a blog post writing this project up in depth. */
  writeupSlug?: string;
}

export const projects: Project[] = [
  {
    slug: 'tarahumara-ultra-tracker',
    title: 'Tarahumara Ultra Tracker',
    description: 'Training tracker for a 59km ultra — Garmin sync, weekly compliance scoring, and a rule-engine coach with an LLM narrator, on FastAPI and Postgres.',
    fullDescription: 'A full-stack training tracker built for a 59km / 2,400m D+ ultra marathon in Sierra Tarahumara (October 2026). It syncs with Garmin Connect for both activities and daily health data, then scores every week against a periodized 30-week plan.\n\nThe dashboard is an installable PWA with a dark, topographic-inspired UI: a compliance ring, metric cards comparing actual vs. planned targets (distance, vertical gain, long run, gym sessions), a 30-week volume chart, and a context-aware alert system that flags HR drift, volume spikes, missed sessions and shortfalls in recovery weeks.\n\nA coach sits on top of the numbers. A deterministic rule engine computes multi-week trends, acute-to-chronic workload readiness and plan adjustments; a Claude model receives that verdict and writes it up in plain language, streaming into a chat drawer over SSE. Nothing is fine-tuned — the judgment stays in testable Python and the model only handles the words.\n\nThe backend is FastAPI over PostgreSQL, holding activities, daily health, week snapshots, the training plan itself and an audit log of every change made to it. Sync is self-healing: pure gap detectors find missing weeks and health days and backfill them, built after an earlier version failed silently for two months. Deployed on Railway with environment-based secrets, rate limiting, cloud OAuth token refresh, and a sanitization layer that strips location data from every API response.',
    role: 'Full-Stack Developer',
    status: 'in progress',
    tags: ['Python', 'FastAPI', 'Postgres', 'LLM', 'PWA', 'Garmin API', 'Railway'],
    methods: 'FastAPI, PostgreSQL, Garmin Connect API (garth OAuth), Claude API, vanilla JS/CSS PWA, service workers, pytest, Railway, security hardening',
    timeline: 'March 2026 — Ongoing',
    team: 'Solo',
    outcomes: [
      'Installable PWA — training visible from any phone, tablet or desktop',
      'Rule-engine coach with an LLM narrator; the model never computes the verdict',
      'Postgres data layer with an audit trail on every training-plan change',
      'Self-healing sync that detects its own gaps and backfills them',
      'Weighted compliance scoring across 5 dimensions, with 6 alert rules',
      'Privacy-first: location data stripped before it leaves the API',
    ],
    liveUrl: 'https://web-production-565ec.up.railway.app',
    repoUrl: 'https://github.com/EmmanuelDiaz95/trail-running-coach',
    writeupSlug: 'building-my-own-ultra-training-tracker',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
