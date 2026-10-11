// Mountains / hiking experience. Figures are pulled from Strava activity data;
// narrative is a first-draft in Emmanuel's voice.

export const mountainsIntro = [
  'The mountains are where I\'m happiest. There\'s a specific clarity that only shows up a few thousand meters up — usually when everything hurts and the view makes it irrelevant.',
  'It\'s a hobby I plan to keep at for a long time — always chasing the next summit and new mountains to explore.',
];

export interface Climb {
  date: string; // ISO, for sorting
  dateLabel: string; // display
  name: string;
  location: string; // country name — the flag's tooltip / accessible label
  flag: string; // country flag emoji, shown in place of the name
  highPointM: number; // official height when summited, otherwise the watch's high point
  gainM: number; // vertical gain
  detail: string; // one-line honest description (summit / approach, etc.)
}

// Ordered by high point, highest first.
export const climbs: Climb[] = [
  {
    date: '2026-09-23',
    dateLabel: 'Sep 2026',
    name: 'Chimborazo',
    location: 'Ecuador',
    flag: '🇪🇨',
    highPointM: 5305,
    gainM: 460,
    detail: 'From the Carrel refuge past Whymper, on Ecuador\'s highest volcano. My highest point yet.',
  },
  {
    date: '2026-09-20',
    dateLabel: 'Sep 2026',
    name: 'Cotopaxi',
    location: 'Ecuador',
    flag: '🇪🇨',
    highPointM: 4874,
    gainM: 241,
    detail: 'Acclimatization hike to the José Rivas refuge, below the glacier.',
  },
  {
    date: '2024-11-10',
    dateLabel: 'Nov 2024',
    name: 'Nevado de Toluca',
    location: 'Mexico',
    flag: '🇲🇽',
    highPointM: 4690,
    gainM: 1128,
    detail: 'Summited Pico del Fraile, Mexico\'s fourth-highest peak.',
  },
  {
    date: '2026-09-19',
    dateLabel: 'Sep 2026',
    name: 'Rumiñahui',
    location: 'Ecuador',
    flag: '🇪🇨',
    highPointM: 4549,
    gainM: 762,
    detail: 'Acclimatization climb on the jagged volcano across the valley from Cotopaxi.',
  },
  {
    date: '2026-04-03',
    dateLabel: 'Apr 2026',
    name: 'Iztaccíhuatl',
    location: 'Mexico',
    flag: '🇲🇽',
    highPointM: 4458,
    gainM: 884,
    detail: 'High-altitude acclimatization hike from Amecameca.',
  },
  {
    date: '2026-05-27',
    dateLabel: 'May 2026',
    name: 'Acatenango',
    location: 'Guatemala',
    flag: '🇬🇹',
    highPointM: 3976,
    gainM: 2032,
    detail: 'Overnight summit facing the eruptions of Volcán de Fuego.',
  },
  {
    date: '2026-09-24',
    dateLabel: 'Sep 2026',
    name: 'Quilotoa',
    location: 'Ecuador',
    flag: '🇪🇨',
    highPointM: 3878,
    gainM: 378,
    detail: 'Down to the crater lagoon and back up the rim.',
  },
];
