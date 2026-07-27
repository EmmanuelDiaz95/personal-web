export const bio = [
  'Hey! Thanks for taking the time and the interest to get to know me better. Whether it\'s for professional or personal reasons, I hope you find something interesting, and if you do, let\'s connect!',
  'I consider myself a philomath, a lifelong learner and very much a self-taught-through-experience type of person. From learning to code and creating AI agents that automate manual tasks and build entire teams, to figuring out how to create products in one of the most complex financial industries, to making apps for trail runners. The thread is always learning by doing. I\'ve built finance teams across 10+ countries including LatAm, Asia, and Europe, and shipped tools used by teams at BlackRock, Nubank, Rappi, and Cascade Debt.',
  'I like to read, hike, and run mountains. I\'m happiest when nature and adventure is involved!',
];

export interface Highlight {
  label: string;
  value: string;
  href?: string;
}

export const currentlyReading = 'La piedra de la locura';
export const currentlyReadingUrl = 'https://www.goodreads.com/book/show/59080630';

export const highlights: Highlight[] = [
  { label: 'Based in', value: 'Mexico City but traveling a lot' },
  { label: 'Current obsession', value: 'Ultra trail running & AI' },
  { label: 'Currently reading', value: currentlyReading, href: currentlyReadingUrl },
  { label: 'Languages', value: 'Spanish, English, Portuguese' },
];
