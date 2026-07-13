/**
 * Fetches the most recently added book from Goodreads "currently-reading"
 * shelf via RSS and updates the currentlyReading / currentlyReadingUrl exports
 * in src/data/about.ts.
 *
 * Run before build: node scripts/update-reading.js
 */

const GOODREADS_RSS =
  'https://www.goodreads.com/review/list_rss/148211154?shelf=currently-reading';
const ABOUT_PATH = 'src/data/about.ts';

const fs = require('fs');

async function fetchCurrentBook() {
  const res = await fetch(GOODREADS_RSS, {
    headers: { 'User-Agent': 'Mozilla/5.0 (personal-web reading updater)' },
  });
  const xml = await res.text();

  // First <item> is the most recently added book on the shelf.
  const items = xml.split('<item>');
  if (items.length < 2) return null;

  const firstItem = items[1];

  // Goodreads item titles are plain text (channel titles use CDATA), so
  // tolerate both forms rather than requiring CDATA.
  const titleMatch = firstItem.match(
    /<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/
  );
  const title = titleMatch ? titleMatch[1].trim() : null;
  if (!title) return null;

  const idMatch = firstItem.match(/<book_id>(\d+)<\/book_id>/);
  const url = idMatch
    ? `https://www.goodreads.com/book/show/${idMatch[1]}`
    : null;

  return { title, url };
}

function setExport(content, name, value) {
  const line = `export const ${name} = '${value.replace(/'/g, "\\'")}';`;
  const re = new RegExp(`export const ${name} = '.*';`);
  if (re.test(content)) {
    return content.replace(re, line);
  }
  return content.trimEnd() + '\n' + line + '\n';
}

async function main() {
  const book = await fetchCurrentBook();
  if (!book) {
    console.log('No book found on currently-reading shelf, skipping.');
    return;
  }

  let content = fs.readFileSync(ABOUT_PATH, 'utf8');
  content = setExport(content, 'currentlyReading', book.title);
  if (book.url) {
    content = setExport(content, 'currentlyReadingUrl', book.url);
  }
  fs.writeFileSync(ABOUT_PATH, content);

  console.log(`Updated currentlyReading: "${book.title}" (${book.url || 'no url'})`);
}

main().catch((err) => {
  console.error('Failed to fetch Goodreads:', err.message);
  process.exit(0); // don't break build if Goodreads is down
});
