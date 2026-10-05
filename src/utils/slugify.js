// Helper utility to generate clean SEO URL slugs
export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s*\|\s*/g, '-')
    .replace(/\s*\/\s*/g, '-')
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Generate canonical clean subpage route without hash
export function getSubpageUrl(itemName) {
  return `/products/${slugify(itemName)}`;
}
