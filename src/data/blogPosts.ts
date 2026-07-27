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
    date: 'July 26, 2026',
    excerpt: 'Five rebuilds of the tracker I use to stay honest in a 30-week ultra block — Python CLI to PWA to LLM coach to Postgres — including the two months it quietly stopped telling me the truth.',
    content: `I signed up for a 59-kilometer race through the Copper Canyons of Chihuahua, and the first thing I did wasn't lace up my shoes. It was open a terminal.

What came out of that is a training tracker I've now rebuilt five times across a 30-week plan. It went quietly broken for two months in the middle, which turned out to be the most useful thing that happened to it. This is the log of all five versions, including the one that failed.

![Where it ended up: one compliance score, four metrics measured against plan, and the next four weeks waiting. Every version below was working toward this screen.](/images/blog/ultra-tracker/dashboard-week-view.webp)

## The question no tool would answer

I already had Garmin. I already had Strava. Neither could answer the only question I actually cared about: am I following the plan?

Not "how far did I run today." Not "what's my VO2 max estimate." My coach and I had built a 30-week plan with specific weekly targets — distance, vertical gain, long run distance, gym sessions, and interval work rotating between tempo, hills, and fartlek. Three phases: Base for weeks 1 through 12, Specific for 13 through 27, Taper for the last three. Every fourth week is a recovery week where volume drops 25 to 30 percent.

Strava can tell me I ran 26km this week. It can't tell me the plan called for 27, that I hit 715m of vert against a 400m target, and that my long run was sitting at 53% of my weekly volume when it probably shouldn't clear 30%.

So I built the thing that could.

## v1 — the CLI

The first version took a weekend and never left the terminal. Three Python scripts.

\`sync.py\` pulls activities from Garmin Connect and caches them. Authentication was the worst part by a wide margin. Garmin's OAuth flow is what I'd generously call character-building; I ended up on the garminconnect library with garth handling token persistence so I only log in once.

\`report.py\` loads the plan, loads the activities, classifies each one as run, gym, or other, and scores the week.

\`status.py\` answers "where am I" in one screen. It still does — this is it partway through the block:

\`\`\`console
==================================================
  TARAHUMARA ULTRA TRACKER
==================================================

  Race:  Ultra Trail Tarahumara 59km
  Date:  2026-10-02  (68 days away)
  Goal:  59km / 2400m D+

  Current Week:  21 / 30
  Progress:      [##############------] 70%
  Dates:         2026-07-20 to 2026-07-26
  Phase:         SPECIFIC
  Recovery Week: No
  Weeks Left:    9
\`\`\`

Week 1 scored 99%. Distance 26.3 against 27 planned, vert 715 against 400, long run 14 on the nose, five gym sessions against three. Good week.

It also threw an alert. That 14km long run was 53% of my total weekly distance, way past the 30% threshold. The system caught it before I could talk myself out of noticing.

Six rules do that work. **HR drift** fires if my easy runs average more than 10bpm above their four-week rolling average — either I'm not recovering or I'm running easy runs too hard, and honestly it's usually the second one. My Z2 target is 125–145 and I keep turning up at 153–163. **Volume spike** flags unplanned jumps over 10% week on week. **Long run ratio** is the one that got me in week 1. **Missed gym** and **missed series** catch planned work that didn't happen. **Recovery week check** makes sure volume actually drops at least 20% when it's supposed to.

One detail I'm still pleased with: the long run alert is weekend-aware. Long runs land on Saturday or Sunday, so the rule doesn't fire until the weekend is over. No false alarms on a Wednesday.

Detecting interval work from raw Garmin data needed a heuristic. If the gap between average and max heart rate is 20+ bpm and max cleared 160, it was probably intervals. Short runs under 10km with an average above 155 count too. Not perfect. Good enough.

## v2 — the dashboard

The CLI worked and I still couldn't check my training while waiting for coffee. So: a web dashboard, one HTML file, embedded CSS, vanilla JS, no build step.

A compliance ring for the number that matters. Metric cards for actual against planned. A 30-week volume chart with planned in grey and actual in copper, so the whole arc of the block is visible at once. Activity cards. The same six alerts, rendered inline.

Behind it, a Python \`http.server\` with two endpoints — one to read cached weeks, one to sync.

Getting it onto my phone for real was the hard part. Garmin blocks authentication from datacenter IPs, which should have killed the idea of deploying it anywhere. The way through: seed the OAuth tokens from my laptop as base64 environment variables. The server decodes them on boot, and token *refresh*, unlike full login, works from any IP.

Then the security pass, which turned out to be its own project. API key auth on sync, a 60-second rate limit, XSS escaping on everything rendered, input validation, dotfile blocking, and a sanitization layer that strips location names out of Garmin's payloads before they reach the browser. Raw Garmin JSON carries GPS coordinates, your home city, device identifiers. None of that belongs in a public API response.

## v3 — the coach

Scores tell you what happened. They don't tell you what to do about it.

So the next version added a coach: a rule engine that reads multi-week trends, scores readiness using acute-to-chronic workload ratio, and recommends plan adjustments. Then a language model on top of it, with one hard rule about the division of labor — **the rules decide, the model only writes**. Claude Haiku takes the engine's verdict and turns it into a sentence. It never computes the verdict itself. A coach that hallucinates your training load is worse than no coach.

A keyword classifier routes questions to the right place: data lookups, coaching judgment, general knowledge. On the web side, FastAPI replaced the bare \`http.server\`, and the coach became a chat drawer streaming over SSE with the last 20 exchanges carried along for continuity.

## v4 — Postgres

JSON files ran out in two directions at once.

Daily health data was the first. Sleep, HRV, resting heart rate, body battery, training readiness, stress — a row per day, growing forever, and a coach that ought to be reading it.

The second was worse. My plan needed to change, and I needed to know *why* it changed three weeks later. A JSON file you edit in place has no memory of the edit.

So: Postgres, six tables — activities, daily health, conversations, week snapshots, the training plan itself, and a plan_changes audit log. Every plan edit writes a row saying what changed and what changed it. The plan stopped being a file I owned and became data the system owned.

## The two months it lied to me

On May 4, syncing stopped. I found out on June 27.

The cause was a deadlock of my own making. I'd added a cooldown to respect Garmin's rate limits, and stored it globally — so a single 429 locked out every client, including the healthy ones. Worse, the auto-sync only ever looked at the current week. Once it fell behind, it had no mechanism to catch up. It wasn't failing loudly. It was returning last month's numbers with total confidence.

I wasn't looking, either. I was travelling, then I was injured, and the training I didn't want to look at was exactly the training the dashboard wasn't recording. Two blind spots that happened to line up.

Here's the part that stung. I built this thing specifically so I couldn't hide from my training. Then it went quiet, and its silence let me hide anyway.

Fixing the auth deadlock took an afternoon. Backfilling weeks 10 through 17 took one command. Rebuilding trust in the number on the screen took longer, and the lesson underneath is one I'd now take over any amount of uptime: **a system that fails loudly is worth more than a system that's usually right.** Confident wrong output is the most expensive kind.

The plan needed rebuilding too. The version I'd written in March assumed a fitness I no longer had, so weeks 18 through 30 were recalculated from where I actually was — peak week 48km, longest run 32km — and the reason was written into the audit log. That's what the plan_changes table was for. I just didn't expect the first real entry to be that one.

## v5 — teaching it to heal

The current version starts from the assumption that syncing will fail, because it did.

There's a set of pure functions that answer one question: what's missing? Which training weeks have no activities, which days have no health record. They're pure, so they're trivial to test, and they run before anything touches the network. The refresh engine takes that gap list and fills it — backfilling weeks, backing off when Garmin pushes back, and reporting exactly what it repaired.

All of it sits behind one command:

\`\`\`console
python coach.py checkin
\`\`\`

That's the whole interface now. It fills the gaps, then reads me back a single verdict merging health signals — HRV, resting heart rate, sleep — with training load. One front door instead of five scripts I had to remember the order of.

The whole thing runs on Railway on a daily schedule. 143 tests keep it honest.

## How it fits together

Five rebuilds later, this is the shape of it:

\`\`\`diagram
\`\`\`

The boundary between stages 03 and 04 is the design decision I'd defend hardest. People hear "AI coach" and assume a model was trained on my training data. Nothing was trained. The rule engine computes the verdict in ordinary, testable Python, and the model is handed that verdict along with the current context and asked only to write it up like a coach would. A model that hallucinates your training load is worse than no coach at all — so it never gets to decide anything.

## What five rebuilds taught me

I'm a finance operations guy, not a software engineer. Five versions in, the thing I keep coming back to isn't a framework.

Every layer was only obvious after I'd shipped the one before it. I couldn't have designed the alert engine before living with raw numbers for a month. I couldn't have designed the health tables before the alerts made me want data they didn't have. And I'd never have built the gap detectors if the sync hadn't lied to me for two months first. Planning it upfront wouldn't have made it better. It would have made it wrong earlier, in more detail.

The bad weeks are all still in the chart. They don't come out. That's the entire point.

[Live dashboard](https://web-production-565ec.up.railway.app) · [Source](https://github.com/EmmanuelDiaz95/trail-running-coach)
`,
    readTime: '8 min read',
    category: 'Projects',
    tags: ['Python', 'FastAPI', 'Postgres', 'PWA', 'running', 'Garmin API'],
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
