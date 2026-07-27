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
    fullDescription: 'A training tracker for a 59km / 2,400m D+ ultra in Sierra Tarahumara (October 2026). It syncs Garmin activities and daily health data, scores every week against a 30-week plan, and pairs a deterministic rule engine with an LLM narrator for coaching.\n\nBuilt solo over five rebuilds. The full story is in the write-up above.',
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
