const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const DEFAULT_SITE_URL = 'https://gaming-ecru-phi.vercel.app';

const normalizeSiteUrl = (value) => {
  const trimmed = String(value || '').trim();
  if (!trimmed) return DEFAULT_SITE_URL;
  return trimmed.replace(/\/+$/, '');
};

const siteUrl = normalizeSiteUrl(process.env.SITE_URL);
const lastmod = (process.env.SITEMAP_LASTMOD || new Date().toISOString().slice(0, 10)).trim();

const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/deploy', changefreq: 'weekly', priority: '0.9' },
  { path: '/fiction', changefreq: 'monthly', priority: '0.8' },
  { path: '/protocol', changefreq: 'monthly', priority: '0.8' },
  { path: '/operatives', changefreq: 'monthly', priority: '0.8' },
  { path: '/sectors', changefreq: 'monthly', priority: '0.8' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/cookies', changefreq: 'yearly', priority: '0.3' },
  { path: '/eula', changefreq: 'yearly', priority: '0.3' },
];

const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(({ path: routePath, changefreq, priority }) => {
    return [
      '  <url>',
      `    <loc>${siteUrl}${routePath}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n');
  }),
  '</urlset>',
  '',
].join('\n');

const robotsTxt = ['User-agent: *', 'Allow: /', '', `Sitemap: ${siteUrl}/sitemap.xml`, ''].join(
  '\n',
);

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapXml, 'utf8');
fs.writeFileSync(path.join(rootDir, 'robots.txt'), robotsTxt, 'utf8');

if (siteUrl === DEFAULT_SITE_URL) {
  console.log(`SEO files generated for default SITE_URL=${DEFAULT_SITE_URL}`);
} else {
  console.log(`SEO files generated for ${siteUrl}`);
}
