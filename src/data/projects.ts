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
}

export const projects: Project[] = [
  {
    slug: 'choice-empowers',
    title: 'Choice Empowers',
    description: 'Home building platform making affordable housing accessible through intuitive UX design.',
    fullDescription: 'Choice Empowers is a comprehensive platform designed to democratize home building for families seeking affordable housing solutions.\n\nThe project involved extensive user research to understand the pain points families face when trying to design and build their homes. Through field studies and user interviews, we identified key barriers in the existing platform.\n\nOur team conducted card sorting exercises to reorganize the information architecture, making it more intuitive for users with varying levels of technical expertise.',
    role: 'Lead UX Designer + Researcher',
    status: 'shipped',
    tags: ['UX Design', 'Research', 'Prototyping'],
    methods: 'User interviews, field studies, card sorting, usability testing, paper prototyping, rapid prototyping',
    timeline: '6 months',
    team: '3 designers, 2 developers',
    outcomes: [
      'Increased user completion rate by 40%',
      'Reduced support tickets by 25%',
      'Improved user satisfaction scores',
    ],
  },
  {
    slug: 'proyectos-productivos',
    title: 'Proyectos Productivos',
    description: 'Digital government application process for Monterrey, Mexico. 60% faster processing.',
    fullDescription: 'Proyectos Productivos aimed to transform the bureaucratic process of applying for city funding into a streamlined digital experience.\n\nWorking closely with the municipality of Monterrey, we mapped out the existing paper-based processes and identified opportunities for digitization while ensuring accessibility for users with limited technical literacy.\n\nThe project required careful consideration of interoperability with existing government systems and data privacy requirements.',
    role: 'UX Designer + Researcher',
    status: 'shipped',
    tags: ['Gov Tech', 'UX', 'Process Design'],
    methods: 'Process mapping, field study, user interviews, interoperability analysis, data review',
    timeline: '4 months',
    team: '2 designers, 3 developers, 1 project manager',
    outcomes: [
      'Reduced application processing time by 60%',
      'Increased application submissions by 35%',
      'Enabled remote access for rural business owners',
    ],
  },
  {
    slug: 'tarahumara-ultra-tracker',
    title: 'Tarahumara Ultra Tracker',
    description: 'Training plan manager with Garmin Connect integration for a 59km ultramarathon.',
    fullDescription: 'A CLI-based training plan manager for a 30-week ultra marathon preparation. Syncs with Garmin Connect to track actual workouts against planned training targets.\n\nBuilt with Python, it manages a structured training plan with daily workouts for the first 4 weeks and weekly targets for weeks 5-30. Includes sync, report, and status scripts.',
    role: 'Developer',
    status: 'in progress',
    tags: ['Python', 'Health', 'CLI'],
    methods: 'Python, garminconnect library, JSON data management',
    timeline: 'Ongoing',
    team: 'Solo',
    outcomes: [],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
