"""
Script to generate the 'How My Website Works' Word document.
Run: python3 docs/how_my_website_works.py
Output: docs/How_My_Website_Works.docx
"""

from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.style import WD_STYLE_TYPE

doc = Document()

# ── Styles ──────────────────────────────────────────────────────────
style = doc.styles['Normal']
style.font.name = 'Calibri'
style.font.size = Pt(11)
style.paragraph_format.space_after = Pt(6)
style.paragraph_format.line_spacing = 1.15

for level in range(1, 4):
    h = doc.styles[f'Heading {level}']
    h.font.name = 'Calibri'
    h.font.color.rgb = RGBColor(0x1A, 0x1A, 0x1A)

doc.styles['Heading 1'].font.size = Pt(22)
doc.styles['Heading 2'].font.size = Pt(16)
doc.styles['Heading 3'].font.size = Pt(13)

# Helper for code-like paragraphs
def add_code(text):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.font.name = 'Courier New'
    run.font.size = Pt(9.5)
    run.font.color.rgb = RGBColor(0x33, 0x33, 0x33)
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(4)
    return p

def add_bullet(text, bold_prefix=None):
    p = doc.add_paragraph(style='List Bullet')
    if bold_prefix:
        run = p.add_run(bold_prefix)
        run.bold = True
        p.add_run(text)
    else:
        p.add_run(text)
    return p

def add_note(text):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.italic = True
    run.font.color.rgb = RGBColor(0x55, 0x55, 0x55)
    return p


# ════════════════════════════════════════════════════════════════════
# TITLE PAGE
# ════════════════════════════════════════════════════════════════════
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run('\n\n\n\nHow My Website Works')
run.font.size = Pt(32)
run.bold = True
run.font.color.rgb = RGBColor(0x0A, 0x0A, 0x0A)

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run('A First-Principles Guide to emmanueldiaz.dev')
run.font.size = Pt(14)
run.font.color.rgb = RGBColor(0x55, 0x55, 0x55)

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run('\n\nEmmanuel Diaz\nApril 2026')
run.font.size = Pt(12)
run.font.color.rgb = RGBColor(0x88, 0x88, 0x88)

doc.add_page_break()


# ════════════════════════════════════════════════════════════════════
# TABLE OF CONTENTS (manual)
# ════════════════════════════════════════════════════════════════════
doc.add_heading('Table of Contents', level=1)
toc_items = [
    '1. What Is a Website, Really?',
    '2. The Technology Stack — What and Why',
    '3. Project Architecture — How Files Are Organized',
    '4. How a Page Gets to the Browser',
    '5. Routing — How URLs Map to Pages',
    '6. The Design System — Colors, Fonts, and Themes',
    '7. Components — Building Blocks of the UI',
    '8. The Data Layer — Content Without a Database',
    '9. Interactivity — Search, Filters, and Theme Toggle',
    '10. Responsive Design — Adapting to Every Screen',
    '11. Building and Deploying',
    '12. The Complete Picture',
    'Glossary',
]
for item in toc_items:
    doc.add_paragraph(item, style='List Number')

doc.add_page_break()


# ════════════════════════════════════════════════════════════════════
# CHAPTER 1 — WHAT IS A WEBSITE
# ════════════════════════════════════════════════════════════════════
doc.add_heading('1. What Is a Website, Really?', level=1)

doc.add_paragraph(
    'Before diving into code, let\'s understand what happens when someone types your URL '
    'into a browser and hits Enter.'
)

doc.add_heading('The Simplest Explanation', level=2)
doc.add_paragraph(
    'A website is a collection of files — HTML, CSS, and JavaScript — that a browser downloads '
    'and renders on screen. That\'s it at the most fundamental level.'
)
add_bullet('HTML (HyperText Markup Language)', bold_prefix='')
doc.add_paragraph(
    '    The skeleton. It defines the structure: headings, paragraphs, images, links. '
    'Think of it as a Word document with tags instead of formatting buttons.'
)
add_bullet('CSS (Cascading Style Sheets)', bold_prefix='')
doc.add_paragraph(
    '    The skin. It defines how things look: colors, fonts, spacing, layout. '
    'Without CSS, every website would look like a plain text document.'
)
add_bullet('JavaScript', bold_prefix='')
doc.add_paragraph(
    '    The muscles. It adds interactivity: clicking buttons, filtering search results, '
    'toggling dark mode. Without it, pages are static and non-interactive.'
)

doc.add_heading('What Happens When Someone Visits Your Site', level=2)
steps = [
    ('1. Browser requests the page', 'The browser sends a request to the server where your files live (Railway, in your case).'),
    ('2. Server sends back files', 'The server responds with an HTML file, which tells the browser to also download CSS and JavaScript files.'),
    ('3. Browser renders the page', 'The browser reads the HTML to build the page structure, applies CSS to style it, and runs JavaScript for interactivity.'),
    ('4. User sees the finished page', 'All of this happens in milliseconds. The user sees your Experience page with company cards, stats, and a theme toggle.'),
]
for title, desc in steps:
    p = doc.add_paragraph()
    run = p.add_run(title + ': ')
    run.bold = True
    p.add_run(desc)

doc.add_heading('Static vs. Dynamic Websites', level=2)
doc.add_paragraph(
    'Your website is a static site. This means all the HTML pages are pre-built at build time '
    '(when you run npm run build). The server simply hands over those pre-made files — it doesn\'t '
    'generate anything on the fly.'
)
doc.add_paragraph(
    'A dynamic site (like a social media feed or a banking app) builds each page on every request, '
    'pulling data from a database in real-time. Your portfolio doesn\'t need this because your content '
    '(companies, projects, blog posts) changes infrequently.'
)
add_note('Key takeaway: Your website is a collection of pre-built HTML/CSS/JS files served from Railway. No database, no server-side logic, no API calls at runtime.')

doc.add_page_break()


# ════════════════════════════════════════════════════════════════════
# CHAPTER 2 — THE TECH STACK
# ════════════════════════════════════════════════════════════════════
doc.add_heading('2. The Technology Stack — What and Why', level=1)

doc.add_paragraph(
    'A "tech stack" is the set of tools and technologies used to build a project. Here\'s what powers '
    'your website, and why each piece was chosen.'
)

doc.add_heading('Next.js 14 — The Framework', level=2)
doc.add_paragraph(
    'Next.js is a framework built on top of React (a JavaScript library for building user interfaces). '
    'Think of React as the engine and Next.js as the car — it adds structure, routing, and build tools '
    'so you don\'t have to wire everything together yourself.'
)
p = doc.add_paragraph()
run = p.add_run('Why Next.js? ')
run.bold = True
doc.add_paragraph(
    'You could build a website with raw HTML files. But Next.js gives you:\n'
    '• File-based routing — create a file at /projects/page.tsx and you automatically get a /projects URL\n'
    '• Static generation — pre-builds all pages at build time for speed\n'
    '• Component system (via React) — reusable UI building blocks\n'
    '• Built-in optimizations — fonts, images, code splitting\n'
    '• App Router — the modern way Next.js organizes pages (introduced in Next.js 13)'
)
add_note('You\'re using Next.js 14 with the App Router. This is the latest architecture pattern where every folder inside src/app/ corresponds to a URL route.')

doc.add_heading('TypeScript — Type-Safe JavaScript', level=2)
doc.add_paragraph(
    'TypeScript is JavaScript with type annotations. Instead of hoping that your data has the right shape, '
    'TypeScript checks it at compile time.'
)
doc.add_paragraph('For example, in your project:')
add_code(
    'interface Company {\n'
    '  name: string;      // Must be text\n'
    '  role: string;      // Must be text\n'
    '  period: string;    // Must be text\n'
    '  logo?: string;     // Optional (? means it can be missing)\n'
    '  monogram: string;  // Must be text\n'
    '}'
)
doc.add_paragraph(
    'If you accidentally try to pass a number where a string is expected, TypeScript catches it '
    'before the code even runs. This prevents bugs.'
)
p = doc.add_paragraph()
run = p.add_run('Why TypeScript over plain JavaScript? ')
run.bold = True
p.add_run(
    'It\'s like spellcheck for code. The cost is minimal (you just add type annotations), '
    'and the benefit is catching mistakes early. Your project uses strict: true in tsconfig.json, '
    'which means maximum type safety.'
)

doc.add_heading('Tailwind CSS — Utility-First Styling', level=2)
doc.add_paragraph(
    'Traditional CSS requires writing separate style rules in a .css file. Tailwind takes a different '
    'approach: you apply small, single-purpose CSS classes directly in your HTML.'
)
doc.add_paragraph('Traditional CSS:')
add_code(
    '.card {\n'
    '  background: #111;\n'
    '  border: 1px solid #1a1a1a;\n'
    '  border-radius: 10px;\n'
    '  padding: 28px;\n'
    '}'
)
doc.add_paragraph('Tailwind equivalent (what your site uses):')
add_code('className="bg-surface border border-border rounded-[10px] p-7"')
doc.add_paragraph(
    'Each class does one thing: bg-surface sets the background, border adds a border, '
    'rounded-[10px] sets the corner radius, p-7 adds padding.'
)
p = doc.add_paragraph()
run = p.add_run('Why Tailwind? ')
run.bold = True
p.add_run(
    'Speed. You never leave the HTML to write CSS. You see exactly what styles are applied by reading '
    'the class names. And unused styles are automatically removed in the build, so the final CSS file is tiny.'
)

doc.add_heading('React — The Component Library', level=2)
doc.add_paragraph(
    'React lets you build UIs by composing reusable "components." A component is a function that returns HTML '
    '(technically JSX — HTML written inside JavaScript).'
)
add_code(
    'function StatBlock({ value, label }) {\n'
    '  return (\n'
    '    <div>\n'
    '      <div className="font-mono text-[32px]">{value}</div>\n'
    '      <div className="font-mono text-[11px]">{label}</div>\n'
    '    </div>\n'
    '  );\n'
    '}'
)
doc.add_paragraph(
    'You use it like an HTML tag: <StatBlock value="7+" label="YEARS" />. '
    'Build once, use anywhere. Your site has 9 reusable UI components.'
)

doc.add_heading('next-themes — Dark/Light Mode', level=2)
doc.add_paragraph(
    'A small library that handles theme switching. It adds or removes the .dark class on the <html> element '
    'and saves the user\'s preference in localStorage (so it persists across visits).'
)

doc.add_heading('lucide-react — Icons', level=2)
doc.add_paragraph(
    'Provides SVG icons as React components. Your site uses: LinkedIn, GitHub, Moon, Sun, ArrowLeft. '
    'The Strava icon is a custom SVG since Lucide doesn\'t include it.'
)

doc.add_heading('Stack Summary', level=2)
table = doc.add_table(rows=7, cols=3)
table.style = 'Light Shading Accent 1'
headers = ['Technology', 'Role', 'Why This One']
for i, h in enumerate(headers):
    table.rows[0].cells[i].text = h
    for paragraph in table.rows[0].cells[i].paragraphs:
        for run in paragraph.runs:
            run.bold = True

data = [
    ('Next.js 14', 'Framework', 'File-based routing, static generation, React built-in'),
    ('TypeScript', 'Language', 'Catches bugs at compile time, self-documenting code'),
    ('Tailwind CSS', 'Styling', 'Fast development, small output, utility-first approach'),
    ('React 18', 'UI Library', 'Component-based architecture, huge ecosystem'),
    ('next-themes', 'Theming', 'Simple dark/light toggle with localStorage persistence'),
    ('lucide-react', 'Icons', 'Clean SVG icons as React components'),
]
for row_idx, (tech, role, why) in enumerate(data, 1):
    table.rows[row_idx].cells[0].text = tech
    table.rows[row_idx].cells[1].text = role
    table.rows[row_idx].cells[2].text = why

doc.add_page_break()


# ════════════════════════════════════════════════════════════════════
# CHAPTER 3 — ARCHITECTURE
# ════════════════════════════════════════════════════════════════════
doc.add_heading('3. Project Architecture — How Files Are Organized', level=1)

doc.add_paragraph(
    'The way files are organized in a project is called its "architecture." A well-organized project '
    'means you always know where to find things and where to put new things.'
)

doc.add_heading('The Directory Tree', level=2)
add_code(
    'personal-web/\n'
    '├── public/              → Static assets (images, favicon)\n'
    '│   └── images/logos/    → Company logos (rappi.png, nubank.png, etc.)\n'
    '├── src/                 → All source code lives here\n'
    '│   ├── app/             → Pages (each folder = a URL route)\n'
    '│   │   ├── layout.tsx   → Root layout (wraps ALL pages)\n'
    '│   │   ├── globals.css  → Global styles + theme colors\n'
    '│   │   ├── page.tsx     → Experience page (the "/" route)\n'
    '│   │   ├── not-found.tsx → 404 error page\n'
    '│   │   ├── projects/\n'
    '│   │   │   ├── page.tsx        → /projects route\n'
    '│   │   │   └── [slug]/\n'
    '│   │   │       └── page.tsx    → /projects/choice-empowers route\n'
    '│   │   └── blog/\n'
    '│   │       ├── page.tsx        → /blog route\n'
    '│   │       └── [slug]/\n'
    '│   │           └── page.tsx    → /blog/building-my-own... route\n'
    '│   ├── components/      → Reusable UI pieces\n'
    '│   │   ├── layout/      → Page structure (Header, PageTabs)\n'
    '│   │   ├── ui/          → Cards, badges, pills, forms\n'
    '│   │   └── ThemeToggle.tsx\n'
    '│   ├── data/            → All content (no database needed)\n'
    '│   │   ├── constants.ts → Contact info, social links\n'
    '│   │   ├── experience.ts → Companies, stats, profile\n'
    '│   │   ├── projects.ts  → Projects array + helpers\n'
    '│   │   └── blogPosts.ts → Blog posts + helpers\n'
    '│   └── lib/\n'
    '│       └── utils.ts     → Utility functions\n'
    '├── next.config.js       → Next.js configuration\n'
    '├── tailwind.config.ts   → Tailwind theme (colors, fonts)\n'
    '├── tsconfig.json        → TypeScript configuration\n'
    '└── package.json         → Dependencies + scripts'
)

doc.add_heading('The Four Layers', level=2)
doc.add_paragraph(
    'Your project has a clean separation into four layers. This is a common pattern in frontend architecture:'
)

p = doc.add_paragraph()
run = p.add_run('1. Pages (src/app/) — ')
run.bold = True
p.add_run(
    'Each page is a file. The folder structure mirrors the URL structure. This is the "what" — '
    'what the user sees at each URL.'
)

p = doc.add_paragraph()
run = p.add_run('2. Components (src/components/) — ')
run.bold = True
p.add_run(
    'Reusable UI building blocks. A CompanyCard, a SearchBar, a TagPill. These are the "how" — '
    'how individual pieces of UI look and behave.'
)

p = doc.add_paragraph()
run = p.add_run('3. Data (src/data/) — ')
run.bold = True
p.add_run(
    'All your content lives here as typed TypeScript arrays. Companies, projects, blog posts, '
    'contact info. This is the "content" — what fills the templates.'
)

p = doc.add_paragraph()
run = p.add_run('4. Configuration (root files) — ')
run.bold = True
p.add_run(
    'next.config.js, tailwind.config.ts, tsconfig.json. These tell the tools how to build, '
    'style, and type-check your code.'
)

add_note(
    'This separation means you can update content (data files) without touching the UI code, '
    'and redesign components without changing the data.'
)

doc.add_page_break()


# ════════════════════════════════════════════════════════════════════
# CHAPTER 4 — HOW A PAGE GETS TO THE BROWSER
# ════════════════════════════════════════════════════════════════════
doc.add_heading('4. How a Page Gets to the Browser', level=1)

doc.add_paragraph(
    'Let\'s trace what happens from the moment you run npm run build to a user seeing your site.'
)

doc.add_heading('Build Time (npm run build)', level=2)
steps = [
    'Next.js reads all files in src/app/ and discovers your routes: /, /projects, /projects/[slug], /blog, /blog/[slug]',
    'For dynamic routes like /projects/[slug], it calls generateStaticParams() to get all possible slugs (e.g., "choice-empowers", "proyectos-productivos", "tarahumara-ultra-tracker")',
    'It renders each page to static HTML, importing data from src/data/ files',
    'Tailwind CSS scans all your files for class names and generates only the CSS you actually use',
    'TypeScript compiles to JavaScript, catching any type errors',
    'The result: a folder of .html, .css, and .js files ready to serve',
]
for i, step in enumerate(steps, 1):
    p = doc.add_paragraph()
    run = p.add_run(f'Step {i}: ')
    run.bold = True
    p.add_run(step)

doc.add_heading('Runtime (User Visits)', level=2)
steps = [
    'User types your URL → browser requests the page from Railway',
    'Railway serves the pre-built HTML file (e.g., index.html for "/")',
    'Browser renders the HTML immediately (fast first paint)',
    'Browser downloads and runs the JavaScript bundle → React "hydrates" the page (attaches event handlers for interactivity)',
    'next-themes reads localStorage for saved theme preference and applies it',
    'Page is now fully interactive: search works, theme toggle works, links navigate',
]
for i, step in enumerate(steps, 1):
    p = doc.add_paragraph()
    run = p.add_run(f'{i}. ')
    run.bold = True
    p.add_run(step)

doc.add_heading('Hydration — The Key Concept', level=2)
doc.add_paragraph(
    'When Next.js serves a pre-built HTML page, the browser can display it immediately. But the page '
    'isn\'t interactive yet — buttons don\'t work, search doesn\'t filter. React then "hydrates" the page: '
    'it attaches JavaScript event handlers to the existing HTML, making it interactive without re-rendering '
    'from scratch. This gives you the best of both worlds: fast initial load + full interactivity.'
)

doc.add_page_break()


# ════════════════════════════════════════════════════════════════════
# CHAPTER 5 — ROUTING
# ════════════════════════════════════════════════════════════════════
doc.add_heading('5. Routing — How URLs Map to Pages', level=1)

doc.add_paragraph(
    'In Next.js App Router, the file system IS the router. Every folder inside src/app/ that contains '
    'a page.tsx file becomes a URL route.'
)

doc.add_heading('Your Routes', level=2)
table = doc.add_table(rows=6, cols=3)
table.style = 'Light Shading Accent 1'
for i, h in enumerate(['URL', 'File', 'What It Shows']):
    table.rows[0].cells[i].text = h
    for paragraph in table.rows[0].cells[i].paragraphs:
        for run in paragraph.runs:
            run.bold = True

routes = [
    ('/', 'src/app/page.tsx', 'Experience (landing page)'),
    ('/projects', 'src/app/projects/page.tsx', 'Projects grid with search'),
    ('/projects/choice-empowers', 'src/app/projects/[slug]/page.tsx', 'Project detail page'),
    ('/blog', 'src/app/blog/page.tsx', 'Blog with sidebar filters'),
    ('/blog/building-my-own...', 'src/app/blog/[slug]/page.tsx', 'Blog post detail'),
]
for row_idx, (url, file, desc) in enumerate(routes, 1):
    table.rows[row_idx].cells[0].text = url
    table.rows[row_idx].cells[1].text = file
    table.rows[row_idx].cells[2].text = desc

doc.add_heading('Dynamic Routes — The [slug] Pattern', level=2)
doc.add_paragraph(
    'The folder name [slug] (with square brackets) tells Next.js "this part of the URL is a variable." '
    'When someone visits /projects/choice-empowers, Next.js passes { slug: "choice-empowers" } as a parameter '
    'to the page component.'
)
doc.add_paragraph('The page then looks up the content:')
add_code(
    'const project = getProjectBySlug(slug);\n'
    '// Finds the project with slug "choice-empowers" from the data array\n\n'
    'if (!project) notFound();\n'
    '// If no match, show the 404 page'
)

doc.add_heading('Static Generation of Dynamic Pages', level=2)
doc.add_paragraph(
    'Since your site is statically exported, Next.js needs to know ALL possible slugs at build time. '
    'That\'s what generateStaticParams() does:'
)
add_code(
    'export function generateStaticParams() {\n'
    '  return projects.map((p) => ({ slug: p.slug }));\n'
    '  // Returns: [{slug: "choice-empowers"}, {slug: "proyectos-productivos"}, ...]\n'
    '}'
)
doc.add_paragraph(
    'Next.js calls this function during build, gets all slugs, and pre-renders a separate HTML page for each one.'
)

doc.add_heading('The Root Layout — Shared Structure', level=2)
doc.add_paragraph(
    'layout.tsx wraps every page. It provides the HTML shell, the theme provider, the header, and the '
    'page tabs. Individual pages only render their unique content — the shared structure comes from the layout.'
)
add_code(
    'RootLayout\n'
    '  └── <html>\n'
    '       └── <body>\n'
    '            └── ThemeProvider\n'
    '                 └── Container (max-width, padding)\n'
    '                      ├── Header (name, social icons, theme toggle)\n'
    '                      ├── PageTabs (Experience | Projects | Blog)\n'
    '                      └── <main>{children}</main>  ← each page renders here'
)

doc.add_page_break()


# ════════════════════════════════════════════════════════════════════
# CHAPTER 6 — DESIGN SYSTEM
# ════════════════════════════════════════════════════════════════════
doc.add_heading('6. The Design System — Colors, Fonts, and Themes', level=1)

doc.add_heading('The Monochromatic Philosophy', level=2)
doc.add_paragraph(
    'Your site uses ONLY shades of grey — no accent colors. This is a deliberate design choice: '
    'hierarchy is created through contrast levels, not color. It gives the site a clean, editorial look '
    'that feels professional and timeless.'
)

doc.add_heading('CSS Custom Properties (Variables)', level=2)
doc.add_paragraph(
    'The theme system works through CSS custom properties — variables defined in CSS that can be changed '
    'dynamically. In globals.css, you define two sets of values:'
)
add_code(
    ':root {\n'
    '  /* LIGHT MODE */\n'
    '  --bg: #f5f5f5;            /* Page background: off-white */\n'
    '  --surface: #ebebeb;       /* Card backgrounds: slightly darker */\n'
    '  --text-primary: #0a0a0a;  /* Main text: near-black */\n'
    '  --text-secondary: #555;   /* Descriptions: medium grey */\n'
    '  --text-muted: #888;       /* Labels: light grey */\n'
    '  --text-faint: #bbb;       /* Placeholders: very light */\n'
    '  --border: #d4d4d4;        /* Borders */\n'
    '}\n\n'
    '.dark {\n'
    '  /* DARK MODE — everything inverts */\n'
    '  --bg: #0a0a0a;            /* Page background: near-black */\n'
    '  --surface: #111111;       /* Card backgrounds: slightly lighter */\n'
    '  --text-primary: #ffffff;  /* Main text: white */\n'
    '  --text-secondary: #888;   /* Descriptions: medium grey */\n'
    '  --text-muted: #555;       /* Labels: darker grey */\n'
    '  --text-faint: #333;       /* Placeholders: very dark */\n'
    '  --border: #1a1a1a;        /* Borders */\n'
    '}'
)
doc.add_paragraph(
    'When the .dark class is added to <html>, all these variables switch values instantly. '
    'Every element using var(--bg) or var(--text-primary) updates automatically.'
)

doc.add_heading('How Tailwind Connects to CSS Variables', level=2)
doc.add_paragraph(
    'In tailwind.config.ts, each CSS variable is mapped to a Tailwind color name:'
)
add_code(
    'colors: {\n'
    '  bg: "var(--bg)",              // Use as: bg-bg\n'
    '  surface: "var(--surface)",    // Use as: bg-surface\n'
    '  "text-primary": "var(--text-primary)",  // Use as: text-text-primary\n'
    '  border: "var(--border)",      // Use as: border-border\n'
    '}'
)
doc.add_paragraph(
    'So when you write className="bg-surface text-text-primary", Tailwind generates CSS that references '
    'the custom properties, which change when the theme changes.'
)

doc.add_heading('Typography', level=2)
doc.add_paragraph(
    'Two font families create visual hierarchy:'
)
add_bullet('IBM Plex Mono — ', bold_prefix='')
doc.add_paragraph(
    '    Used for headings, labels, navigation, stats, and code-like text. Gives the site its '
    'distinctive editorial/technical personality. Loaded from Google Fonts with font-display: swap '
    '(shows fallback font first, then swaps when loaded — no invisible text).'
)
add_bullet('System Sans-Serif — ', bold_prefix='')
doc.add_paragraph(
    '    Used for body text (descriptions, paragraphs). Uses the operating system\'s native font '
    '(-apple-system on Mac, Segoe UI on Windows). Fast because no download needed.'
)

doc.add_heading('How Theme Switching Works End-to-End', level=2)
steps = [
    'User clicks the moon/sun icon (ThemeToggle component)',
    'next-themes toggles the .dark class on <html> and saves to localStorage',
    'CSS custom properties update (--bg goes from #f5f5f5 to #0a0a0a, etc.)',
    'Every element with Tailwind theme colors (bg-bg, text-text-primary, etc.) updates',
    'A 0.3s CSS transition animates the color change smoothly',
    'Next visit: next-themes reads localStorage and applies the saved theme before React renders (no flash)',
]
for i, step in enumerate(steps, 1):
    p = doc.add_paragraph()
    run = p.add_run(f'{i}. ')
    run.bold = True
    p.add_run(step)

doc.add_page_break()


# ════════════════════════════════════════════════════════════════════
# CHAPTER 7 — COMPONENTS
# ════════════════════════════════════════════════════════════════════
doc.add_heading('7. Components — Building Blocks of the UI', level=1)

doc.add_paragraph(
    'A React component is a function that takes data (called "props") and returns HTML. '
    'Your site has 12 components organized into three categories.'
)

doc.add_heading('Layout Components (the skeleton)', level=2)

p = doc.add_paragraph()
run = p.add_run('Header — ')
run.bold = True
p.add_run(
    'The masthead at the top of every page. Shows "EMMANUEL DIAZ" on the left and social icons + '
    'theme toggle on the right. It\'s included in layout.tsx so it appears on every page automatically.'
)

p = doc.add_paragraph()
run = p.add_run('PageTabs — ')
run.bold = True
p.add_run(
    'The sticky navigation bar (Experience | Projects | Blog). It\'s a "segmented control" — three '
    'equal-width buttons that highlight the current page. Uses sticky positioning so it stays visible '
    'when you scroll. It reads the current URL (usePathname()) to determine which tab is active.'
)

doc.add_heading('UI Components (the building blocks)', level=2)

components = [
    ('CompanyCard', 'Shows a company with its logo (or monogram initials), period, name, and role. Used 9 times on the Experience page.'),
    ('StatBlock', 'A large number with a small label below it. Used 4 times for the stats row (7+ YEARS, 8+ COUNTRIES, etc.).'),
    ('ProjectCard', 'A clickable card showing a project\'s number, title, description, status badge, and tags. Links to the detail page.'),
    ('BlogPostCard', 'Similar to ProjectCard but for blog posts. Shows date, read time, title, excerpt, and category.'),
    ('StatusBadge', 'A small pill showing "shipped", "in progress", or "archived". Color intensity varies by status.'),
    ('TagPill', 'A tiny rounded label for technologies or topics (e.g., "Python", "React", "Treasury").'),
    ('SearchBar', 'A text input that filters content in real-time. Used on both Projects and Blog pages.'),
    ('CTACard', 'A dashed-border card with a "+" icon and "Want to collaborate?" text. Links to your email.'),
    ('NewsletterForm', 'An email subscription form in the Blog sidebar. Currently logs to console (no backend).'),
    ('ThemeToggle', 'The moon/sun button. Waits until the component is "mounted" (loaded in the browser) before rendering to avoid a hydration mismatch.'),
]
for name, desc in components:
    p = doc.add_paragraph()
    run = p.add_run(f'{name} — ')
    run.bold = True
    p.add_run(desc)

doc.add_heading('The Card Pattern', level=2)
doc.add_paragraph(
    'Most of your components follow the same visual pattern, creating consistency across the site:'
)
add_code(
    'Common card styling:\n'
    '  bg-surface        → slightly elevated background\n'
    '  border border-border → thin grey border\n'
    '  rounded-[10px]    → rounded corners\n'
    '  p-7               → 28px padding\n'
    '  hover:border-border-hover → border brightens on hover\n'
    '  transition-all duration-300 → smooth animation'
)

doc.add_page_break()


# ════════════════════════════════════════════════════════════════════
# CHAPTER 8 — DATA LAYER
# ════════════════════════════════════════════════════════════════════
doc.add_heading('8. The Data Layer — Content Without a Database', level=1)

doc.add_paragraph(
    'Most websites use a database or CMS (Content Management System) to store content. '
    'Your site takes a simpler approach: all content lives in TypeScript files inside src/data/.'
)

doc.add_heading('Why This Approach?', level=2)
add_bullet('Your content changes infrequently (you add a company or project every few months)')
add_bullet('There\'s no user-generated content (no comments, no logins)')
add_bullet('TypeScript files give you type safety — the compiler checks your content structure')
add_bullet('No database setup, no API endpoints, no hosting costs for a backend')
add_bullet('Content is version-controlled in git alongside the code')

doc.add_heading('The Four Data Files', level=2)

p = doc.add_paragraph()
run = p.add_run('constants.ts — ')
run.bold = True
p.add_run('Contact info (email, phone, location), social links (LinkedIn, GitHub, Strava), site metadata (name, title). Used by Header, CTACard, BottomNav.')

p = doc.add_paragraph()
run = p.add_run('experience.ts — ')
run.bold = True
p.add_run('Profile summary text, 4 stat numbers, 9 company entries (with name, role, period, optional logo, monogram fallback), and earlier roles text. Used by the Experience page.')

p = doc.add_paragraph()
run = p.add_run('projects.ts — ')
run.bold = True
p.add_run('3 projects with full details: slug, title, descriptions (short + long), role, status, tags, timeline, team, outcomes, and optional links. Includes helper function getProjectBySlug().')

p = doc.add_paragraph()
run = p.add_run('blogPosts.ts — ')
run.bold = True
p.add_run('4 blog posts with slug, title, date, excerpt, full content, read time, category, and tags. Includes helpers: getBlogPostBySlug(), getCategories(), getAllTags().')

doc.add_heading('How Data Flows to the UI', level=2)
add_code(
    'experience.ts (data)\n'
    '     ↓ import\n'
    'page.tsx (page component)\n'
    '     ↓ passes props to\n'
    'CompanyCard (UI component)\n'
    '     ↓ renders\n'
    'HTML in the browser'
)
doc.add_paragraph(
    'Each page imports what it needs from the data files and passes data to UI components as "props" '
    '(function arguments). Components never fetch their own data — they just render what they\'re given.'
)

doc.add_heading('How to Update Content', level=2)
doc.add_paragraph('To add a new company to your Experience page:')
add_code(
    '// Open src/data/experience.ts\n'
    '// Add to the companies array:\n'
    '{ name: "New Company", role: "Your Role", period: "2026 – Present", monogram: "NC" }'
)
doc.add_paragraph(
    'That\'s it. No database migration, no API update, no CMS login. Edit the file, rebuild, deploy.'
)

doc.add_page_break()


# ════════════════════════════════════════════════════════════════════
# CHAPTER 9 — INTERACTIVITY
# ════════════════════════════════════════════════════════════════════
doc.add_heading('9. Interactivity — Search, Filters, and Theme Toggle', level=1)

doc.add_paragraph(
    'Your site has three types of interactivity, all running entirely in the browser (no server calls).'
)

doc.add_heading('Client Components vs. Server Components', level=2)
doc.add_paragraph(
    'In Next.js App Router, components are "Server Components" by default — they run at build time and '
    'produce static HTML. But when you need interactivity (useState, onClick, etc.), you mark them '
    'with \'use client\' at the top of the file.'
)
doc.add_paragraph('Your client components (pages/components with interactivity):')
add_bullet('Projects page — search filtering')
add_bullet('Blog page — search + category filtering')
add_bullet('ThemeToggle — theme switching')
add_bullet('PageTabs — reading the current URL')
add_bullet('SearchBar — controlled input')
add_bullet('NewsletterForm — form state')

doc.add_heading('How Search Works', level=2)
doc.add_paragraph(
    'The Projects page search is a good example of React state management:'
)
add_code(
    '// 1. Create a state variable for the search text\n'
    'const [search, setSearch] = useState("");\n\n'
    '// 2. Filter the projects array based on the search text\n'
    'const filtered = projects.filter((p) =>\n'
    '  [p.title, p.description, ...p.tags].some((field) =>\n'
    '    field.toLowerCase().includes(search.toLowerCase())\n'
    '  )\n'
    ');\n\n'
    '// 3. Render the filtered results\n'
    '{filtered.map((project) => <ProjectCard project={project} />)}'
)
doc.add_paragraph(
    'Every keystroke updates the search state → React re-runs the filter → only matching cards render. '
    'This happens instantly because the data is already in memory (no API call needed).'
)

doc.add_heading('How Category Filtering Works (Blog)', level=2)
doc.add_paragraph(
    'The Blog page combines search with category filtering using two state variables:'
)
add_code(
    'const [search, setSearch] = useState("");\n'
    'const [activeCategory, setActiveCategory] = useState("All");\n\n'
    'const filtered = blogPosts.filter((post) => {\n'
    '  const matchesSearch = [post.title, post.excerpt, post.category]\n'
    '    .some((f) => f.toLowerCase().includes(search.toLowerCase()));\n'
    '  const matchesCategory = activeCategory === "All" || post.category === activeCategory;\n'
    '  return matchesSearch && matchesCategory;\n'
    '});'
)
doc.add_paragraph('Both filters must pass for a post to appear. Click a category → only posts in that category show.')

doc.add_heading('The cn() Utility — Conditional Styling', level=2)
doc.add_paragraph(
    'Your utility function cn() is used throughout to conditionally apply CSS classes:'
)
add_code(
    '// Definition in src/lib/utils.ts:\n'
    'function cn(...classes) {\n'
    '  return classes.filter(Boolean).join(" ");\n'
    '}\n\n'
    '// Usage — active tab gets bright text, inactive gets muted:\n'
    'className={cn(\n'
    '  "text-[15px] py-1.5 cursor-pointer",\n'
    '  isActive ? "text-text-primary" : "text-text-secondary"\n'
    ')}'
)

doc.add_page_break()


# ════════════════════════════════════════════════════════════════════
# CHAPTER 10 — RESPONSIVE DESIGN
# ════════════════════════════════════════════════════════════════════
doc.add_heading('10. Responsive Design — Adapting to Every Screen', level=1)

doc.add_paragraph(
    'Your site looks different on phones, tablets, and desktops. This is done with Tailwind\'s '
    'responsive prefixes.'
)

doc.add_heading('How Responsive Classes Work', level=2)
doc.add_paragraph(
    'Tailwind uses a mobile-first approach. The base class applies to all screen sizes, and '
    'prefixed classes override it at larger breakpoints:'
)
add_code(
    'className="grid grid-cols-1 max-sm:grid-cols-1 max-lg:grid-cols-2 grid-cols-3"\n\n'
    '→ Mobile (< 640px):  1 column\n'
    '→ Tablet (< 1024px): 2 columns\n'
    '→ Desktop (≥ 1024px): 3 columns'
)
doc.add_paragraph(
    'Note: Your site uses max-* prefixes (max-lg, max-md, max-sm) which apply BELOW a breakpoint. '
    'This is a "desktop-first" approach — the default styles are for desktop, and overrides shrink things for smaller screens.'
)

doc.add_heading('Key Responsive Behaviors', level=2)

table = doc.add_table(rows=6, cols=3)
table.style = 'Light Shading Accent 1'
for i, h in enumerate(['Element', 'Desktop', 'Mobile']):
    table.rows[0].cells[i].text = h
    for paragraph in table.rows[0].cells[i].paragraphs:
        for run in paragraph.runs:
            run.bold = True

behaviors = [
    ('Page padding', '64px (px-16)', '20px (px-5)'),
    ('Company cards', '3-column grid', '1-column stack'),
    ('Project cards', '2-column grid', '1-column stack'),
    ('Blog layout', 'Sidebar + content', 'Stacked (sidebar on top)'),
    ('Search bar', '260px fixed width', 'Full width'),
]
for row_idx, (el, desk, mob) in enumerate(behaviors, 1):
    table.rows[row_idx].cells[0].text = el
    table.rows[row_idx].cells[1].text = desk
    table.rows[row_idx].cells[2].text = mob

doc.add_page_break()


# ════════════════════════════════════════════════════════════════════
# CHAPTER 11 — BUILDING AND DEPLOYING
# ════════════════════════════════════════════════════════════════════
doc.add_heading('11. Building and Deploying', level=1)

doc.add_heading('Development', level=2)
add_code('npm run dev    # Starts dev server at localhost:3000 with hot reload')
doc.add_paragraph(
    'Hot reload means changes you make to files appear in the browser instantly without refreshing. '
    'This makes development fast.'
)

doc.add_heading('Building for Production', level=2)
add_code('npm run build  # Compiles everything into optimized static files')
doc.add_paragraph('This command:')
add_bullet('Compiles TypeScript → JavaScript')
add_bullet('Runs Tailwind to generate only the CSS classes you use')
add_bullet('Pre-renders all pages to HTML (including dynamic [slug] pages)')
add_bullet('Optimizes and bundles JavaScript for smaller file sizes')
add_bullet('Outputs everything to the out/ folder')

doc.add_heading('Deployment on Railway', level=2)
doc.add_paragraph(
    'Railway is a cloud platform that hosts your site. When you push code to GitHub, Railway '
    'automatically runs npm run build and serves the result. Your site is live at:'
)
add_code('https://personal-web-production-140b.up.railway.app')

doc.add_heading('The Build Pipeline', level=2)
add_code(
    'You push code to GitHub\n'
    '       ↓\n'
    'Railway detects the push\n'
    '       ↓\n'
    'Railway runs: npm install → npm run build\n'
    '       ↓\n'
    'Railway serves the built files\n'
    '       ↓\n'
    'Users see the updated site'
)

doc.add_page_break()


# ════════════════════════════════════════════════════════════════════
# CHAPTER 12 — THE COMPLETE PICTURE
# ════════════════════════════════════════════════════════════════════
doc.add_heading('12. The Complete Picture', level=1)

doc.add_paragraph('Here\'s how everything connects, from top to bottom:')

add_code(
    '┌─────────────────────────────────────────────────────────┐\n'
    '│                    USER\'S BROWSER                       │\n'
    '│  Requests page → Renders HTML → Hydrates React → Done  │\n'
    '└────────────────────────┬────────────────────────────────┘\n'
    '                         │\n'
    '┌────────────────────────▼────────────────────────────────┐\n'
    '│                    RAILWAY SERVER                       │\n'
    '│  Serves pre-built static files (HTML, CSS, JS)         │\n'
    '└────────────────────────┬────────────────────────────────┘\n'
    '                         │\n'
    '┌────────────────────────▼────────────────────────────────┐\n'
    '│                    BUILD TIME                           │\n'
    '│  Next.js + TypeScript + Tailwind → Static HTML/CSS/JS  │\n'
    '└────────────────────────┬────────────────────────────────┘\n'
    '                         │\n'
    '┌────────────────────────▼────────────────────────────────┐\n'
    '│                    SOURCE CODE                          │\n'
    '│  Pages (app/) ← Components (components/) ← Data (data/)│\n'
    '│  Styled with: Tailwind → CSS Variables → Theme Toggle   │\n'
    '└─────────────────────────────────────────────────────────┘'
)

doc.add_heading('First Principles Summary', level=2)

principles = [
    ('A website is files', 'HTML for structure, CSS for style, JavaScript for interactivity. Everything else (React, Next.js, Tailwind) is a tool that makes writing those files easier.'),
    ('Next.js provides structure', 'File-based routing, static generation, a layout system. It turns a folder of files into a working website.'),
    ('React enables composition', 'Build small components, compose them into pages. CompanyCard is used 9 times on one page — write once, use many.'),
    ('TypeScript prevents mistakes', 'Type annotations catch bugs before runtime. If you pass wrong data, the compiler tells you.'),
    ('Tailwind speeds up styling', 'Utility classes in the HTML instead of separate CSS files. The output is the same CSS — the input is faster to write.'),
    ('CSS variables enable theming', '11 variables define the entire color system. Toggle .dark class → all colors change instantly.'),
    ('Static data is enough', 'When content changes infrequently, TypeScript files beat databases. Simpler, type-safe, version-controlled.'),
    ('Static export means speed', 'Pre-built HTML loads instantly. No server-side rendering, no database queries, no API latency.'),
]

for title, desc in principles:
    p = doc.add_paragraph()
    run = p.add_run(f'{title}: ')
    run.bold = True
    p.add_run(desc)

doc.add_page_break()


# ════════════════════════════════════════════════════════════════════
# GLOSSARY
# ════════════════════════════════════════════════════════════════════
doc.add_heading('Glossary', level=1)

terms = [
    ('App Router', 'Next.js 14\'s routing system where folders in src/app/ correspond to URL routes.'),
    ('Build time', 'When you run npm run build — the moment code is compiled into deployable files.'),
    ('Client component', 'A React component that runs in the browser (marked with \'use client\'). Can use state, events, and browser APIs.'),
    ('Component', 'A reusable function that returns HTML (JSX). The building block of React applications.'),
    ('CSS custom properties', 'Variables defined in CSS (--name: value) that can be dynamically changed. The backbone of your theme system.'),
    ('Hydration', 'The process where React attaches event handlers to server-rendered HTML, making it interactive.'),
    ('JSX', 'A syntax extension that lets you write HTML-like code inside JavaScript. React components return JSX.'),
    ('Layout', 'A component in layout.tsx that wraps child pages. Provides shared UI (header, navigation).'),
    ('Props', 'Data passed to a component (like function arguments). CompanyCard receives a "company" prop.'),
    ('Route', 'A URL path that maps to a page component (/ → Experience, /projects → Projects grid).'),
    ('Server component', 'A React component that runs at build time only. Produces static HTML. Cannot use state or browser APIs.'),
    ('Slug', 'A URL-friendly identifier (e.g., "choice-empowers" instead of "Choice Empowers").'),
    ('State', 'Data that changes over time in a component (e.g., the current search text). Managed with useState().'),
    ('Static export', 'Pre-rendering all pages to HTML at build time, producing files that can be served from any web server.'),
    ('Tailwind', 'A CSS framework where you apply small utility classes directly in HTML instead of writing separate CSS rules.'),
    ('TypeScript', 'A superset of JavaScript that adds type annotations. Catches errors at compile time.'),
    ('Utility class', 'A single-purpose CSS class like bg-surface or text-sm. Tailwind is built around this concept.'),
]

for term, definition in terms:
    p = doc.add_paragraph()
    run = p.add_run(f'{term}: ')
    run.bold = True
    p.add_run(definition)


# ── Save ────────────────────────────────────────────────────────────
output_path = '/Users/emmanueldiaz/Documents/Main_Brain/projects/personal_portafolio/personal-web/docs/How_My_Website_Works.docx'
doc.save(output_path)
print(f'Document saved to: {output_path}')
