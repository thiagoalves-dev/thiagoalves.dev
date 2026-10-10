import { Feed } from 'feed';
import { queryCollection } from '@nuxt/content/server';

const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

// Nuxt Content hangs its own code-block metadata off `<pre>`/`<code>` nodes. Those are
// props for the Vue prose components, not HTML attributes — emitting them would dump the
// whole snippet a second time into an attribute.
const INTERNAL_PROPS = new Set(['code', 'language', 'filename', 'meta', 'highlights']);

const escapeText = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const escapeAttribute = (value) => escapeText(value).replace(/"/g, '&quot;');

const renderAttributes = (props) =>
  Object.entries(props || {})
    .filter(([name, value]) => !INTERNAL_PROPS.has(name) && value !== undefined && value !== null && value !== false)
    .map(([name, value]) => {
      const attribute = name === 'className' ? 'class' : name;
      if (value === true) {
        return ` ${attribute}`;
      }
      return ` ${attribute}="${escapeAttribute(Array.isArray(value) ? value.join(' ') : value)}"`;
    })
    .join('');

// Nuxt Content stores the parsed body as a minimark tree: text nodes are plain strings and
// elements are `[tag, props, ...children]` tuples.
const renderNode = (node) => {
  if (typeof node === 'string') {
    return escapeText(node);
  }

  if (!Array.isArray(node)) {
    return '';
  }

  const [tag, props, ...children] = node;
  const attributes = renderAttributes(props);

  if (VOID_ELEMENTS.has(tag)) {
    return `<${tag}${attributes}>`;
  }

  return `<${tag}${attributes}>${children.map(renderNode).join('')}</${tag}>`;
};

const renderBody = (body) => (body?.value || []).map(renderNode).join('');

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const siteUrl = (config.public?.siteUrl || process.env.NUXT_PUBLIC_SITE_URL || getRequestURL(event).origin).replace(
    /\/+$/,
    '',
  );

  const author = {
    name: 'Thiago Alves',
    email: 'me@thiagoalves.dev',
  };

  const feed = new Feed({
    title: author.name,
    description:
      'I’m Thiago, a Brazilian software engineer based in Austin, Texas. I’ve been building software since 2008, and for many years I’ve split my time between leading teams and keeping my hands on the code.',
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.png`,
    favicon: `${siteUrl}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      // `feed` v6 reads `feedLinks.rss` when generating the RSS self-link; `rss2` is kept
      // for parity with the template.
      rss: `${siteUrl}/feed.xml`,
      rss2: `${siteUrl}/feed.xml`,
    },
  });

  const articles = await queryCollection(event, 'journal').order('date', 'DESC').all();

  for (const article of articles) {
    const publicUrl = `${siteUrl}${article.path}`;

    feed.addItem({
      title: article.title,
      id: publicUrl,
      link: publicUrl,
      description: article.description,
      content: renderBody(article.body),
      author: [author],
      contributor: [author],
      date: new Date(article.date),
    });
  }

  setResponseHeader(event, 'content-type', 'application/xml');
  setResponseHeader(event, 'cache-control', 's-maxage=31556952');

  return feed.rss2();
});
