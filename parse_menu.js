import fs from 'fs';

const html = fs.readFileSync('safepack_dump.html', 'utf8');

// Find all <a> tags that point to safepack.com
const regex = /<a\s+[^>]*href=["'](https:\/\/safepack\.com\/[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
let match;
const pages = new Map();

while ((match = regex.exec(html)) !== null) {
  const href = match[1];
  const label = match[2].replace(/<[^>]+>/g, '').trim();
  if (label && !href.includes('/wp-content/') && !href.includes('/feed/') && !href.includes('/xmlrpc')) {
    if (!pages.has(href)) {
      pages.set(href, label);
    }
  }
}

const list = Array.from(pages.entries()).map(([url, text]) => ({ text, url }));
console.log('Total unique safepack links:', list.length);
fs.writeFileSync('all_live_pages.json', JSON.stringify(list, null, 2));
console.log(JSON.stringify(list, null, 2));
