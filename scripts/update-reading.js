/**
 * Fetches the most recently added book from Goodreads "currently-reading"
 * shelf via RSS and updates the currentlyReading export in src/data/about.ts.
 *
 * Run before build: node scripts/update-reading.js
 */

const GOODREADS_RSS =
  'https://www.goodreads.com/review/list_rss/148211154?shelf=currently-reading';
const ABOUT_PATH = 'src/data/about.ts';

const fs = require('fs');

async function fetchCurrentBook() {
  const res = await fetch(GOODREADS_RSS);
  const xml = await res.text();

  // Grab first <title> inside an <item> (most recently added book)
  const items = xml.split('<item>');
  if (items.length < 2) return null;

  const firstItem = items[1];
  const match = firstItem.match(/<title><!\[CDATA\[(.+?)\]\]><\/title>/);
  return match ? match[1].trim() : null;
}

async function main() {
  const book = await fetchCurrentBook();
  if (!book) {
    console.log('No book found on currently-reading shelf, skipping.');
    return;
  }

  let content = fs.readFileSync(ABOUT_PATH, 'utf8');

  const exportLine = `export const currentlyReading = '${book.replace(/'/g, "\\'")}';`;

  if (content.includes('export const currentlyReading')) {
    content = content.replace(/export const currentlyReading = '.*';/, exportLine);
  } else {
    content = content.trimEnd() + '\n\nex' + 'port const currentlyReading = \'' + book.replace(/'/g, "\\'") + '\';\n';
  }

  fs.writeFileSync(ABOUT_PATH, content);
  console.log(`Updated currentlyReading: "${book}"`);
}

main().catch((err) => {
  console.error('Failed to fetch Goodreads:', err.message);
  process.exit(0); // don't break build if Goodreads is down
});
