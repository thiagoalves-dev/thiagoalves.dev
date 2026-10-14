# thiagoalves.dev — AI guide

Personal site and journal of Thiago Alves: a Nuxt 4 port of the Tailwind Plus Spotlight template.
Start with the [README](README.md) for setup, layout and deployment.

Before editing, read:

- [`.ai/context.md`](.ai/context.md) — how the site is put together and how to check work against
  the template
- [`.ai/conventions/code.md`](.ai/conventions/code.md) — code style, components, page metadata
- [`.ai/conventions/content.md`](.ai/conventions/content.md) — articles: frontmatter, slugs, images,
  code blocks

## Hard rules

1. **Keep `nuxt` pinned to exactly `4.5.2`.** 4.6.1 returns a 500 on `/` in production builds. Don't
   loosen the version or let an update bump it without building and loading every page first.
2. **Keep `content.experimental.sqliteConnector: 'native'`.** Without it Nuxt Content falls back
   to `better-sqlite3`, which is not installed (its native binary went stale in Netlify's build cache
   and failed the build).
3. **The template is the reference for layout and styling.** A visual change matches what Spotlight
   does unless the change is deliberately a departure from it. Compare the two side by side (see
   context.md).
4. **Never change a published article's slug** without a redirect from the old URL.
5. **No task tracking in this repo.** Docs describe how the code works and the standards to follow.
   To-dos live outside the repo.
