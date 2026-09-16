# SEO checklist — thiagoalves.dev

Run through this before shipping a new page or article, and before any production deploy.
Items marked **MISSING** are gaps in the site today, not things that were checked and passed.

## Site-wide (one-time setup)

- [ ] **MISSING — `site.url` in `nuxt.config.mjs`.** Nothing can generate absolute URLs without it.
      Canonicals, Open Graph images and the sitemap all depend on it.
- [ ] **MISSING — sitemap.** No `sitemap.xml` is produced. `@nuxtjs/sitemap` reads the route list
      and the Nuxt Content collection automatically.
- [ ] **MISSING — sitemap reference in `robots.txt`.** Current file allows everything and points
      nowhere. Needs a `Sitemap:` line.
- [ ] **MISSING — canonical link tags.** No page emits one. Matters most once articles exist,
      because the old site's posts are indexed under different URLs.
- [ ] **MISSING — structured data.** A `Person` schema on the About page and `BlogPosting` on each
      article. This is what produces author attribution in search results.
- [ ] Favicon and apple-touch-icon present. **Done** — `favicon.png`, `apple-touch-icon.png`.
- [ ] `lang="en"` on `<html>`. **Done** — set in `app.vue`.

## Every page

- [ ] Unique `<title>` under ~60 characters. `app.vue` appends " - Thiago Alves", so page titles
      should be short nouns ("About", "Uses"), not sentences.
- [ ] Unique `description`, 120–160 characters, written for a human reading a search result.
      Not a copy of the first paragraph.
- [ ] **MISSING — Open Graph tags** (`ogTitle`, `ogDescription`, `ogImage`, `ogType`, `ogUrl`).
      Without `ogImage` every link shared to Slack, LinkedIn or iMessage renders as plain text.
- [ ] **MISSING — Twitter card tags** (`twitterCard: 'summary_large_image'`, `twitterTitle`,
      `twitterDescription`, `twitterImage`).
- [ ] Exactly one `<h1>`, and it says what the page is about.
- [ ] Headings nest properly — no `h3` without an `h2` above it.

## Every article

- [ ] Frontmatter complete: `title`, `description`, `date`, `author`. The schema in
      `content.config.js` rejects the build if any is missing.
- [ ] `description` is written as a search-result snippet, not lifted from the body.
- [ ] Slug is short, hyphenated, and keyword-bearing. **Changing a published slug needs a redirect** —
      posts imported from the old site keep their original slugs for exactly this reason.
- [ ] Every image has meaningful `alt` text. Decorative images get `alt=""`.
- [ ] Every image has explicit `width` and `height` so the layout doesn't shift while loading.
- [ ] Code blocks declare their language, and that language is in the `highlight.langs` array in
      `nuxt.config.mjs`. An unlisted language renders as unhighlighted plain text.
- [ ] At least one internal link to another page on the site.
- [ ] Dates are real. A post that was substantially rewritten can carry a new date; one that was
      only re-published should keep its original.

## Migrating posts from the old site

- [ ] Old URL structure recorded before anything is deleted. Anything already indexed needs a
      301 to its new location.
- [ ] Images moved out of `public/images/posts/` and their paths rewritten in the body.
- [ ] Language list in `nuxt.config.mjs` extended for any new code fence language. The old posts
      use `php`, `shell` and `blade`, none of which are currently configured.

## Before deploying to production

- [ ] `npm run build` clean — the content schema fails loudly on bad frontmatter.
- [ ] Every page's rendered `<title>` and `<meta name="description">` checked in the browser, not
      assumed from the source.
- [ ] No placeholder content left. The Spotlight template ships with Planetaria and Spencer Sharp
      text on several pages.
- [ ] `robots.txt` still permits crawling — a staging-era `Disallow: /` shipped to production is
      the classic way to disappear from search.
