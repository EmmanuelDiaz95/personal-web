export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  readTime: string;
  category: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-my-own-ultra-training-tracker',
    title: 'I Built My Own Ultra Training Tracker Because Strava Wasn\'t Enough',
    date: 'March 15, 2026',
    excerpt: 'How a finance ops guy with no CS degree built a full-stack PWA — from Python CLI to live dashboard with Garmin sync — to stay honest during a 30-week ultramarathon training block.',
    content: `I'm training for the Ultra Trail Tarahumara — a 59km race through the Copper Canyons in October. 30 weeks of structured training. And the first thing I did wasn't lace up my shoes. It was open a terminal.

Here's the thing: I already had Garmin. I already had Strava. But neither of them could answer the question I actually cared about — am I following the plan?

Not "how far did I run today." Not "what's my VO2 max estimate." I needed something that would look at my training plan, look at what I actually did, and tell me where I'm falling short. So I built it.

THE PROBLEM WITH EXISTING TOOLS

My coach and I put together a 30-week plan with specific weekly targets: distance, vertical gain, long run distance, gym sessions, and interval work (tempo, hills, fartlek — rotating each week). The plan has three phases — Base (weeks 1-12), Specific (13-27), and Taper (28-30) — with recovery weeks every fourth week where volume drops 25-30%.

Strava can tell me I ran 26km this week. But it can't tell me that my plan called for 27km, that I hit 715m of vert against a 400m target (not bad), and that my long run ratio is sitting at 53% of weekly volume when it probably shouldn't exceed 30%.

Garmin Connect is better at the data side but still doesn't know what my plan says. And none of these tools have any concept of compliance scoring or alerts.

PHASE 1: THE CLI

The first version was pure terminal. Three Python scripts:

python scripts/sync.py pulls activities from Garmin Connect using their API, caching everything as JSON. Authentication was the most annoying part — Garmin's OAuth flow is... let's call it "character-building." I used the garminconnect library with garth token persistence so I only log in once.

python scripts/report.py --week 1 loads the plan, loads cached activities, classifies each one (run, gym, or other), aggregates totals, and generates a markdown report with a compliance score.

python scripts/status.py gives a quick dashboard — current week, phase, days until race, this week's targets.

Here's what Week 1 looked like:

| Metric        | Planned | Actual | Delta   |
|:--------------|--------:|-------:|:--------|
| Distance (km) |      27 |   26.3 | -2.6%   |
| Vert (m)      |     400 |    715 | +78.8%  |
| Long Run (km) |      14 |     14 | +0.0%   |
| Gym Sessions  |       3 |      5 | +2      |

Compliance Score: 99%

Not bad for week one. But the system also flagged an alert: my long run (14km) was 53% of my total weekly distance. Way above the 30% threshold. The system caught it before I could lie to myself about it.

THE ALERT ENGINE

Six rules that check my training against both the plan and my own historical data:

HR Drift — If my easy runs are averaging more than 10bpm above my 4-week rolling average, something is off. Either I'm not recovering or I'm running "easy" runs too hard (which, honestly, I am — my Z2 target is 125-145 but I keep showing up at 153-163).

Volume Spike — Flags if actual distance jumps more than 10% above the previous week unexpectedly. The 10% rule exists for a reason.

Long Run Ratio — That 53% flag from week one. Keeps me from making my long run too large a percentage of my weekly volume.

Missed Gym / Missed Series — If I planned 3 gym sessions and only did 1, it shows up as a warning. Same for interval work.

Recovery Week Check — During recovery weeks, volume should drop at least 20%. If it doesn't, the system warns me I'm not actually recovering.

One detail I'm proud of: the long run alert is weekend-aware. Since long runs are always on Saturday or Sunday, the alert only fires after the weekend ends. No more false alarms on a Wednesday.

SERIES DETECTION

How do you automatically detect whether someone did interval work from raw Garmin data? I went with a heuristic: if the gap between average and max heart rate is 20+ bpm AND max HR hit 160+, it was probably intervals. Also catches short runs (<10km) with high average HR (155+). Not perfect, but it works.

PHASE 2: THE DASHBOARD

The CLI worked. But I wanted to check my training from my phone while waiting for coffee, not just at my laptop. So I built a web dashboard.

It's a single-file PWA — one HTML file with embedded CSS and vanilla JS. No React, no build step. The aesthetic is dark and topographic-inspired, matching the trail running theme. It features:

A compliance ring — the big number that tells me immediately how the week went.

Metric cards — actual vs. planned for distance, vertical gain, long run, and gym sessions. Each with a progress bar and delta indicator.

A 30-week volume chart — every week of the plan visualized with planned (grey) and actual (copper) bars. You can see the whole arc of the training block at a glance.

Activity cards — each workout from Garmin, formatted with date, type, distance, pace, heart rate, and elevation.

Smart alerts — the same alert engine from the CLI, but rendered inline with the week view.

The backend is a Python HTTP server (no framework, just http.server) that serves static files and exposes two API endpoints: GET /api/weeks for cached data and POST /api/sync to pull fresh data from Garmin.

PHASE 3: GOING LIVE

I wanted this on my phone. For real. Not "open laptop, run server, load localhost." Tap an icon and see my training.

The PWA bits were straightforward — manifest.json, a service worker for offline caching, an SVG icon with a trail runner silhouette. The harder part was deployment.

Garmin's API blocks authentication from datacenter IPs. So I couldn't just deploy to Railway and have it sync directly... or could I? The trick was seeding OAuth tokens from my local machine as base64 environment variables. The server decodes them on startup, and token refresh (unlike full login) works from any IP. If the tokens eventually expire, I run one command locally and push fresh ones.

The security hardening was its own project: API key authentication for sync, rate limiting (60s cooldown), XSS escaping on all user content, input validation, dotfile blocking, and a sanitization layer that strips location names from Garmin activity data before it reaches the browser. The raw Garmin JSON contains GPS coordinates, home city names, device IDs — none of that belongs in a public API response.

The live dashboard: https://web-production-565ec.up.railway.app
Source code: https://github.com/EmmanuelDiaz95/trail-running-coach

THE HONEST PART

The dashboard doesn't let me hide. Week 2's compliance score stares at me every time I open the app. Some weeks will be great. Some weeks life will happen. The point isn't perfection — it's awareness. Having the data right there, in a format I can't ignore, changes how I think about consistency.

That 5% week? It's still in the chart. It'll always be in the chart. And week 3 was better because of it.

WHAT I LEARNED

I'm a finance operations guy, not a software engineer. This project taught me:

OAuth is a maze. Garmin's implementation doubly so. Token persistence and refresh logic took longer than the entire alert engine.

PWAs are underrated. One HTML file, a manifest, and a service worker — and suddenly you have an installable app with offline support and no app store.

Security is a mindset. It's not a checkbox at the end. Every API response, every user input, every environment variable is a surface to think about.

Ship, then improve. The CLI version took a weekend. The dashboard took another weekend. Each layer made the previous one more useful. I didn't need to plan the whole thing upfront.

28 weeks to go. 59 kilometers through the Copper Canyons. One JSON file, one dashboard, and zero excuses.`,
    readTime: '10 min read',
    category: 'Projects',
    tags: ['Python', 'PWA', 'running', 'health', 'Garmin API'],
  },
  {
    slug: 'intersection-urban-design-technology',
    title: 'The Intersection of Urban Design and Technology',
    date: 'March 15, 2023',
    excerpt: 'Exploring how technology is reshaping urban spaces and community engagement in city planning.',
    content: 'Technology is fundamentally transforming how we design, plan, and experience urban spaces. From smart city initiatives to digital participation platforms, the intersection of urban design and technology offers unprecedented opportunities for creating more responsive, inclusive, and sustainable cities.\n\nIn this article, we explore how emerging technologies are enabling new forms of community engagement, data-driven decision making, and innovative approaches to addressing urban challenges. We examine case studies from cities around the world that are leveraging technology to reimagine the relationship between people, place, and infrastructure.',
    readTime: '5 min read',
    category: 'Urban Design',
    tags: ['UX', 'urban'],
  },
  {
    slug: 'participatory-design-in-practice',
    title: 'Participatory Design in Practice',
    date: 'February 28, 2023',
    excerpt: 'A deep dive into successful participatory design methodologies and their impact on community outcomes.',
    content: 'Participatory design is more than a methodology\u2014it\'s a fundamental shift in how we approach problem-solving and decision-making. By centering the voices and experiences of those most affected by design decisions, we create solutions that are more effective, equitable, and sustainable.\n\nThis article examines successful participatory design processes, from initial community engagement through implementation and evaluation. We discuss key principles, common challenges, and practical strategies for facilitating meaningful participation across diverse communities.',
    readTime: '7 min read',
    category: 'Design Methods',
    tags: ['UX', 'research'],
  },
  {
    slug: 'spatial-justice-digital-age',
    title: 'Spatial Justice in the Digital Age',
    date: 'February 10, 2023',
    excerpt: 'How digital tools can help address spatial inequalities and create more equitable urban environments.',
    content: 'Spatial justice examines how power, resources, and opportunities are distributed across geographic space. In the digital age, new technologies offer both opportunities and challenges for addressing spatial inequalities.\n\nThis article explores how digital mapping, data visualization, and online participation platforms can make spatial inequalities visible and empower communities to advocate for change. We also examine the risks of digital divides and technological solutions that may reinforce existing inequalities if not implemented thoughtfully.',
    readTime: '6 min read',
    category: 'Technology',
    tags: ['AI', 'fintech'],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getCategories(): string[] {
  return Array.from(new Set(blogPosts.map((p) => p.category)));
}

export function getAllTags(): string[] {
  return Array.from(new Set(blogPosts.flatMap((p) => p.tags)));
}
