# Context

How the site is put together. Setup, folder layout and deployment are in the [README](../README.md).

## Origin

The site is the Tailwind Plus **Spotlight** template (Next.js + MDX) rewritten in Nuxt. Components,
markup and Tailwind classes follow the template as closely as Vue allows, and comments in the code
mark every place where the port has to differ (Shiki instead of Prism, `@nuxtjs/color-mode` instead
of `next-themes`, Nuxt Content instead of MDX).

The template source is purchased and is not in this repo. On Thiago's machine it lives next to this
repo at `../tailwind-plus-spotlight/spotlight-js`.

## Comparing against the template

Run both and compare the same page in two tabs:

| What     | Command                                                             | URL                   |
| -------- | ------------------------------------------------------------------- | --------------------- |
| Site     | `npm run dev`                                                       | http://localhost:1001 |
| Template | `npm run build && npx next start --port 1002` (in the template dir) | http://localhost:1002 |

- Serve the template as a production build. Its `next dev` server 404s every route on Next 16.2.6.
- The 1000 block is used so these never collide with the Contracts Connected worktree ports
  (2000s, 3000s, 7000s, 8000s, 9000s).
- macOS lets an unprivileged process bind a port below 1024 only on all interfaces, which is why the
  dev server listens on `0.0.0.0` (set in `nuxt.config.mjs`). On `localhost` alone Nuxt silently
  falls back to port 3000.

## Pages and data

| Route             | File                           | Data                                    |
| ----------------- | ------------------------------ | --------------------------------------- |
| `/`               | `app/pages/index.vue`          | three latest articles; work history     |
| `/about`          | `app/pages/about.vue`          | static                                  |
| `/setup`          | `app/pages/setup.vue`          | static (was `/uses`)                    |
| `/journal`        | `app/pages/journal/index.vue`  | all articles, newest first              |
| `/journal/[slug]` | `app/pages/journal/[slug].vue` | one article; 404 if the slug is unknown |

Articles are the `journal` collection, defined in `content.config.js` and read with
`queryCollection('journal')`. Nuxt Content stores them in SQLite at build time, using Node's
built-in driver (`sqliteConnector: 'native'`).

`server/routes/` builds `/sitemap.xml` (static routes plus every article) and `/feed.xml` (RSS) from
the same collection.

## Head, SEO and structured data

- `app/app.vue` sets the site-wide defaults: the title template (`<page title> - Thiago Alves`), the
  default description, Open Graph and Twitter tags, the 1200×630 sharing image
  (`public/images/og-image.png`), the canonical link and the RSS link.
- Each page overrides `title` and `description` with `useSeoMeta`.
- Article pages drop the " - Thiago Alves" suffix when the full title would pass 60 characters.
- `app/utils/structured-data.js` builds the JSON-LD: `Person` on `/about`, `BlogPosting` plus
  `Person` on each article.
- `runtimeConfig.public.siteUrl` is the canonical origin. Every absolute URL comes from it.

## Client behaviour

- `app/plugins/theme-watcher.client.js` — collapses an explicit light/dark choice back to "system"
  when it matches the OS, and mirrors the mode onto `color-scheme`.
- `app/plugins/previous-route.client.js` — remembers the previous in-app route; the article back
  button only shows after an in-app navigation, as in the template.
- `app/composables/use-header-scroll.js` — the sticky header and shrinking home avatar, ported from
  the template's `Header.jsx`.

## Analytics

`nuxt-gtag` loads Google Analytics only when the `GOOGLE_ANALYTICS_ID` environment variable is set
(Netlify sets it). Local builds send nothing.

## Known constraints

- **`nuxt` is pinned to `4.5.2`.** 4.6.1 returns a 500 on `/` in production builds.
- **`sqliteConnector: 'native'` must stay.** Without it Nuxt Content falls back to `better-sqlite3`,
  which is not installed. It was removed because npm 11 skips install scripts, so its native binary
  was never rebuilt for the build's Node version and a cached copy failed with "Module did not
  self-register".
- **`postcss-selector-parser` is overridden to `^7.1.6`** in `package.json`. `@tailwindcss/typography`
  pins 6.0.10, which has a security advisory; the built CSS is identical with 7.x.
- **Local Markdown plugins are passed as instances.** Nuxt Content imports rehype plugins by name, so
  `rehype-unwrap-images.js` is registered with `instance:` in `nuxt.config.mjs`, not by path.
