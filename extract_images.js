import fs from 'fs';

const html = fs.readFileSync('safepack_dump.html', 'utf8');

// Match all images
const regex = /https:\/\/safepack\.com\/wp-content\/uploads\/[^\s"'()]+\.(?:jpg|jpeg|png|webp)/gi;
let match;
const set = new Set();
while ((match = regex.exec(html)) !== null) {
  set.add(match[0]);
}

const list = Array.from(set);
console.log('Total images found:', list.length);
fs.writeFileSync('safepack_images.json', JSON.stringify(list, null, 2));
console.log(JSON.stringify(list, null, 2));
