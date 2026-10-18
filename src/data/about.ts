export const bio = [
  'Hey! I\'m Emmanuel. I\'m a philomath, a lifelong learner, very much a self-taught type of person.',
  'I learned to code back when AI wasn\'t a thing yet. Since then I\'ve built finance teams in 10+ countries across LatAm, Asia and Europe, launched products in private credit, treasury and finance ops automation, and shipped tools that teams at BlackRock, Nubank and Rappi use. Lately I spend my time building AI agents to automate the stuff I used to do by hand, and apps for trail running.',
  'Outside of work I read, hike, and run ultras. I\'m happiest when there\'s mountains involved. If any of that sounds like your thing, say hi.',
];

export interface Highlight {
  label: string;
  value: string;
  href?: string;
}

export const currentlyReading = 'Despedidas';
export const currentlyReadingUrl = 'https://www.goodreads.com/book/show/244739872';

export const highlights: Highlight[] = [
  { label: 'Based in', value: 'Mexico City but traveling a lot' },
  { label: 'Current obsession', value: 'Ultra trail running & AI' },
  { label: 'Currently reading', value: currentlyReading, href: currentlyReadingUrl },
  { label: 'Languages', value: 'Spanish, English, Portuguese' },
];
