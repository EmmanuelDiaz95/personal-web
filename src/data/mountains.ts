// Mountains / hiking experience. Climb figures are pulled from Garmin activity
// data (vertical gain); narrative is a first-draft in Emmanuel's voice.

export const mountainsIntro = [
  'The mountains are where I\'m happiest. There\'s a specific clarity that only shows up a few thousand meters up — usually when everything hurts and the view makes it irrelevant.',
  'It\'s a hobby I plan to keep at for a long time — always chasing the next summit and new mountains to explore.',
];

export interface Climb {
  date: string; // ISO, for sorting
  dateLabel: string; // display
  name: string;
  location: string;
  gainM: number; // vertical gain, from Garmin
  detail: string; // one-line honest description (summit / approach, etc.)
}

// Ordered by vertical gain, biggest first.
export const climbs: Climb[] = [
  {
    date: '2026-05-27',
    dateLabel: 'May 2026',
    name: 'Acatenango',
    location: 'Guatemala',
    gainM: 2032,
    detail: 'Summited 3,976 m — overnight climb facing the eruptions of Volcán de Fuego.',
  },
  {
    date: '2024-11-10',
    dateLabel: 'Nov 2024',
    name: 'Nevado de Toluca',
    location: 'Mexico',
    gainM: 1128,
    detail: 'Summited Pico del Fraile at 4,690 m — Mexico\'s fourth-highest peak.',
  },
  {
    date: '2026-04-03',
    dateLabel: 'Apr 2026',
    name: 'Iztaccíhuatl',
    location: 'Mexico',
    gainM: 884,
    detail: 'High-altitude acclimatization hike from Amecameca.',
  },
];
