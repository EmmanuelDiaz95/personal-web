// Running / training experience. Race figures are pulled from Garmin activity
// data; narrative is a first-draft in Emmanuel's voice — edit freely.

export const runningIntro = [
  'I came to running the way I come to most things — by doing it, badly at first, then a little less badly. Road kilometers turned into trails, and trails turned into mountains. The longer and steeper it got, the more it felt like the point.',
  'Most of my training now happens on the trails around Mexico City, building toward the Ultra Trail Tarahumara: 59 km through the Copper Canyon, on the ground where the Rarámuri have been running farther than any of us for centuries.',
];

export const goal = {
  name: 'Ultra Trail Tarahumara',
  distanceKm: 59,
  vertM: 2400,
  location: 'Sierra Tarahumara, Chihuahua',
  date: '2026-10-02', // race day
  dateLabel: 'Oct 2, 2026',
};

export interface Race {
  date: string; // ISO, for sorting
  dateLabel: string; // display
  name: string;
  location: string;
  distanceKm: number;
  vertM: number;
  time: string; // finish time, h:mm
}

// Ordered most recent first.
export const races: Race[] = [
  {
    date: '2026-01-24',
    dateLabel: 'Jan 2026',
    name: 'Zapopan Trail',
    location: 'Jalisco, MX',
    distanceKm: 33.3,
    vertM: 1184,
    time: '5h 00m',
  },
  {
    date: '2025-10-04',
    dateLabel: 'Oct 2025',
    name: 'Urique',
    location: 'Copper Canyon, MX',
    distanceKm: 39.0,
    vertM: 1363,
    time: '7h 24m',
  },
];
