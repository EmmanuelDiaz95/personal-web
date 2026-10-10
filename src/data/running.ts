// Running / training experience. Race figures are pulled from Strava activity
// data (finish time = elapsed time); narrative is a first-draft in Emmanuel's
// voice — edit freely.

export const runningIntro = [
  'I came to running the way I come to most things — by doing it, badly at first, then a little less badly. Road kilometers turned into trails, and trails turned into mountains. The longer and steeper it got, the more it felt like the point.',
  'Most of my training happens on the trails around Mexico City. In October 2026 it carried me through the Ultra Trail Tarahumara: 59 km through the Copper Canyon, on the ground where the Rarámuri have been running farther than any of us for centuries.',
];

export interface Race {
  date: string; // ISO, for sorting
  dateLabel: string; // display
  name: string;
  location: string;
  distanceKm: number;
  vertM: number;
  time: string; // finish time (elapsed), h:mm
}

// Ordered most recent first.
export const races: Race[] = [
  {
    date: '2026-10-02',
    dateLabel: 'Oct 2026',
    name: 'Ultra Trail Tarahumara',
    location: 'Copper Canyon, MX',
    distanceKm: 58.6,
    vertM: 2340,
    time: '13h 27m',
  },
  {
    date: '2026-01-24',
    dateLabel: 'Jan 2026',
    name: 'Zapopan Trail',
    location: 'Jalisco, MX',
    distanceKm: 33.3,
    vertM: 1184,
    time: '5h 15m',
  },
  {
    date: '2025-10-04',
    dateLabel: 'Oct 2025',
    name: 'Urique',
    location: 'Copper Canyon, MX',
    distanceKm: 39.0,
    vertM: 1363,
    time: '8h 03m',
  },
  {
    date: '2025-05-24',
    dateLabel: 'May 2025',
    name: 'Otomí Trail',
    location: 'Estado de México, MX',
    distanceKm: 20.0,
    vertM: 875,
    time: '3h 50m',
  },
];
