import https from 'https';
import fs from 'fs';

const pages = [
  { key: "VCI Paper", url: "https://safepack.com/products/vci-packaging/metal-wrap/vci-paper-scrim-reinforced/" },
  { key: "VCI Film", url: "https://safepack.com/products/vci-packaging/vci-packaging-vci-plastics/vci-films/" },
  { key: "VCI Bag", url: "https://safepack.com/products/vci-packaging/vci-aluminium-bags/" },
  { key: "VCI Foam", url: "https://safepack.com/products/vci-packaging/vci-emitting-systems/vci-foam-2" },
  { key: "RP Oil", url: "https://safepack.com/rp-oil/" },
  { key: "PE Poly Coated", url: "https://safepack.com/products/poly-laminates/poly-coated-papers" },
  { key: "Aluminium Foil", url: "https://safepack.com/products/speciality-products/aluminium-foil-based-laminates/" },
  { key: "FSK Laminates", url: "https://safepack.com/products/multilayer-packaging-solutions/poly-laminates/psa-laminates/fsk-laminates/" },
  { key: "Bio-Safe", url: "https://safepack.com/products/bio-safe-laminates/" },
  { key: "VCI Biopolymer", url: "https://safepack.com/products/speciality-products/vci-biopolymer/" },
  { key: "SliverSafe", url: "https://safepack.com/products/speciality-products/silversafe/" },
  { key: "Oil & Gas", url: "https://safepack.com/vci-for-oil-and-gas-industry/" },
  { key: "Metal Mills", url: "https://safepack.com/vci-products-application/metal-mills" },
  { key: "Automotive", url: "https://safepack.com/vci-products-application/automotive" },
  { key: "Engineering", url: "https://safepack.com/vci-products-application/engineering" },
  { key: "Electrical", url: "https://safepack.com/vci-products-application/electrical-electronics" },
  { key: "Defense", url: "https://safepack.com/vci-products-application/defense" },
  { key: "Paper Mills", url: "https://safepack.com/vci-products-application/paper-mills" },
  { key: "Pharmaceuticals", url: "https://safepack.com/vci-products-application/pharmaceuticals" },
  { key: "Food", url: "https://safepack.com/vci-products-application/food" }
];

const results = {};

function fetchPage(p) {
  return new Promise(resolve => {
    https.get(p.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        // Find uploaded images in this page
        const imgRegex = /https:\/\/safepack\.com\/wp-content\/uploads\/[^\s"'()]+\.(?:jpg|jpeg|png|webp)/gi;
        let m;
        const imgs = new Set();
        while ((m = imgRegex.exec(body)) !== null) {
          if (!m[0].includes('logo') && !m[0].includes('Buy-Button') && !m[0].includes('footer')) {
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
  fs.writeFileSync('page_real_images.json', JSON.stringify(results, null, 2));
  console.log('Finished scraping real images for pages:');
  console.log(JSON.stringify(results, null, 2));
}

run();
