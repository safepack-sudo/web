import https from 'https';

const urls = [
  'https://safepack.com/about-us/',
  'https://safepack.com/leadership/',
  'https://safepack.com/certifications/',
  'https://safepack.com/recognitions/',
  'https://safepack.com/news/',
  'https://safepack.com/locations/',
  'https://safepack.com/vci-for-oil-and-gas-industry/'
];

for (const u of urls) {
  https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
      const ogImg = d.match(/property=["']og:image["'] content=["']([^"']+)["']/i);
      const title = d.match(/<title>([^<]+)<\/title>/i);
      console.log(u);
      console.log('  Title:', title ? title[1] : 'none');
      console.log('  OG Image:', ogImg ? ogImg[1] : 'none');
    });
  });
}
