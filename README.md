# thiagoalves.dev

Source for [thiagoalves.dev](https://thiagoalves.dev), the personal site and journal of Thiago Alves.

Built with Nuxt 4, Vue 3, Tailwind CSS 4 and Nuxt Content 3. The design is the
[Tailwind Plus](https://tailwindcss.com/plus) **Spotlight** template, ported from Next.js to Nuxt.

## Running it locally

Requires Node 24, what production builds with. `.nvmrc` pins it for [nvm](https://github.com/nvm-sh/nvm).

```bash
nvm use
npm install
npm run dev        # http://localhost:1001
```

Other scripts:

| Command           | What it does                        |
| ----------------- | ----------------------------------- |
| `npm run build`   | Production build                    |
| `npm run preview` | Serves the production build locally |

## Project layout

```
app/
  app.vue            site-wide <head>: title template, default description, Open Graph, canonical
  pages/             one file per route: /, /about, /setup, /journal, /journal/[slug]
  components/        UI pieces ported from the template (cards, containers, header, footer, icons)
  layouts/           the single default layout
  plugins/           client-only behaviour: theme sync, previous-route tracking
  utils/             date formatting, JSON-LD structured data
content/journal/     the articles, one Markdown file each
server/routes/       /feed.xml (RSS) and /sitemap.xml
public/              static files: favicon, robots.txt, images
typography.js        prose styles, copied from the template
shiki-theme.js       code-highlighting theme that matches the template's Prism colours
```

## Writing an article

Add a Markdown file to `content/journal/`. The file name is the URL slug:
`content/journal/my-post.md` → `/journal/my-post`.

Every article needs this frontmatter, and the build fails if any field is missing:

```yaml
---
title: 'My post'
description: 'A 120–160 character summary written for a search result.'
date: '2026-10-14'
author: 'Thiago Alves'
---
```

Images live in `public/images/articles/` and take explicit dimensions:

```md
![What the image shows](/images/articles/my-image.png){width="800" height="450"}
```

Code blocks are highlighted only for languages listed in `content.build.markdown.highlight.langs` in
`nuxt.config.mjs`. Anything else renders as plain text.

The sitemap and the RSS feed pick new articles up automatically.

## Deployment

Netlify deploys `master` on every push, and builds a preview for each pull request.

| Setting               | Value                                                 |
| --------------------- | ----------------------------------------------------- |
| Build command         | `npm run build`                                       |
| Publish directory     | `dist`                                                |
| `NODE_VERSION`        | `24`                                                  |
| `GOOGLE_ANALYTICS_ID` | GA4 measurement ID; analytics are off when it's unset |

After changing `NODE_VERSION`, trigger **Clear cache and deploy**. A cached build can carry native
modules compiled for the old Node version.

## License

The articles and personal content are © Thiago Alves. The design and components derive from Tailwind
Plus, which is licensed per purchaser. This repository is a finished site, not a template, and its
code may not be reused as a starter or theme.
