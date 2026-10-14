import { queryCollection } from '@nuxt/content/server';

// Static routes that carry no content collection. Post URLs come from the `journal` collection.
const STATIC_PATHS = ['/', '/about', '/setup', '/journal'];

const escapeXml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const siteUrl = (
    config.public?.siteUrl ||
    process.env.NUXT_PUBLIC_SITE_URL ||
    getRequestURL(event).origin
  ).replace(/\/+$/, '');

  const articles = await queryCollection(event, 'journal').order('date', 'DESC').all();

  const urls = [
    ...STATIC_PATHS.map((path) => ({ loc: `${siteUrl}${path}` })),
    ...articles.map((article) => ({ loc: `${siteUrl}${article.path}`, lastmod: article.date })),
  ];

  const body = urls
    .map(
      ({ loc, lastmod }) =>
        `  <url><loc>${escapeXml(loc)}</loc>${lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : ''}</url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

  setResponseHeader(event, 'content-type', 'application/xml');
  setResponseHeader(event, 'cache-control', 's-maxage=31556952');

  return xml;
});
