import https from 'https';
import fs from 'fs';

const pages = [
  { key: "Crepe Paper", url: "https://safepack.com/products/speciality-products/crepe-paper-packaging/" },
  { key: "Corrugation Liners", url: "https://safepack.com/products/multilayer-packaging-solutions/extrusion-laminated-products/corrugation-liners/" },
  { key: "Multiwall Sack Liner", url: "https://safepack.com/products/multilayer-packaging-solutions/extrusion-laminated-products/multiwall-sack-liner/" },
  { key: "Thermal Blanket", url: "https://safepack.com/products/speciality-products/thermal-blanket-laminate/" },
  { key: "Silicone Release", url: "https://safepack.com/products/speciality-products/silicone-release-liners/" },
  { key: "VCI Emitter", url: "https://safepack.com/products/vci-packaging/vci-emitting-systems/" },
  { key: "VCI Oil Additives", url: "https://safepack.com/products/vci-packaging/vci-liquids-oils/vci-oil-additives/" },
  { key: "Ream Wrapper", url: "https://safepack.com/products/multilayer-packaging-solutions/extrusion-laminated-products/ream-wrapper/" }
];

const results = {};

function fetchPage(p) {
  return new Promise(resolve => {
    https.get(p.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        const imgRegex = /https:\/\/safepack\.com\/wp-content\/uploads\/[^\s"'()]+\.(?:jpg|jpeg|png|webp)/gi;
        let m;
        const imgs = new Set();
        while ((m = imgRegex.exec(body)) !== null) {
          if (!m[0].includes('logo') && !m[0].includes('Buy-Button') && !m[0].includes('footer') && !m[0].includes('Safepack-Solutions.jpg')) {
            imgs.add(m[0]);
          }
        }
        results[p.key] = {
          url: p.url,
          status: res.statusCode,
          images: Array.from(imgs).slice(0, 5)
        };
        resolve();
      });
    }).on('error', () => resolve());
  });
}

async function run() {
  for (const p of pages) {
    await fetchPage(p);
  }
  fs.writeFileSync('page_real_images_part2.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
}

run();
