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
}

export const projects: Project[] = [
  {
    slug: 'tarahumara-ultra-tracker',
    title: 'Tarahumara Ultra Tracker',
    description: 'PWA dashboard tracking a 30-week ultra marathon prep with real-time Garmin Connect sync, compliance scoring, and smart alerts.',
    fullDescription: 'A full-stack training tracker built for a 59km / 2,400m D+ ultra marathon in Sierra Tarahumara (October 2026). The app syncs directly with Garmin Connect to pull run, gym, and cross-training activities, then scores weekly compliance against a periodized 30-week plan.\n\nThe dashboard is a single-file PWA — installable on any phone — with a dark, topographic-inspired UI. It features a compliance ring, metric cards comparing actual vs. planned targets (distance, vertical gain, long run, gym sessions), a 30-week volume chart, and a context-aware alert system that flags issues like HR drift, volume spikes, or missed workouts.\n\nThe Python backend handles Garmin OAuth token management, activity caching, and a sanitization layer that strips location data from all API responses before they reach the browser. Deployed on Railway with environment-based secrets, rate limiting, and XSS protection.\n\nDesigned and built end-to-end as a personal tool that solves a real problem: staying accountable to a structured training plan across 7 months of preparation.',
    role: 'Full-Stack Developer',
    status: 'in progress',
    tags: ['Python', 'PWA', 'Garmin API', 'Railway', 'Health Tech'],
    methods: 'Python HTTP server, Garmin Connect API (garth OAuth), vanilla JS/CSS, service workers, responsive design, security hardening',
    timeline: 'March 2026 — Ongoing',
    team: 'Solo',
    outcomes: [
      'Live PWA accessible from any device — phone, tablet, desktop',
      'Real-time Garmin sync with OAuth token refresh from cloud',
      'Weighted compliance scoring across 5 training dimensions',
      'Smart alerts: HR drift, volume spikes, recovery compliance, long run timing',
      'Privacy-first: all location data stripped before rendering',
    ],
    liveUrl: 'https://web-production-565ec.up.railway.app',
    repoUrl: 'https://github.com/EmmanuelDiaz95/trail-running-coach',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
