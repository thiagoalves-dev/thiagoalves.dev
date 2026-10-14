// schema.org JSON-LD for search engines (not rendered). Person on About, BlogPosting on journal entries.

const SAME_AS = [
  'https://www.linkedin.com/in/thiagoalvesdev',
  'https://www.instagram.com/thiagoalves.dev',
  'https://x.com/thiagoalves_dev',
];

export function personSchema(siteUrl) {
  return {
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Thiago Alves',
    url: siteUrl,
    image: `${siteUrl}/images/avatar.jpg`,
    jobTitle: 'Software Engineer and Tech Lead',
    email: 'mailto:me@thiagoalves.dev',
    address: { '@type': 'PostalAddress', addressLocality: 'Austin', addressRegion: 'TX', addressCountry: 'US' },
    sameAs: SAME_AS,
  };
}

export function blogPostingSchema(siteUrl, article) {
  const url = `${siteUrl}${article.path}`;
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    url,
    mainEntityOfPage: url,
    image: `${siteUrl}/images/og-image.png`,
    inLanguage: 'en',
    author: { '@type': 'Person', '@id': `${siteUrl}/#person`, name: 'Thiago Alves', url: siteUrl },
    publisher: { '@id': `${siteUrl}/#person` },
  };
}

// useHead entry for a JSON-LD <script>. `nodes` share one @graph so @id references resolve.
export function jsonLdScript(nodes) {
  return {
    type: 'application/ld+json',
    innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }),
  };
}
