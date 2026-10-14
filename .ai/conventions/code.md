# Code conventions

## Style

- Prettier is the formatter (`.prettierrc`): single quotes, semicolons, trailing commas, 2-space
  indent, 120-character lines. ESLint runs Prettier as a rule.
- Format only the files you touched: `npx prettier --write <file>`.
- Plain JavaScript, no TypeScript. Vue single-file components use `<script setup>`.

## Components

- File names are kebab-case (`card-title.vue`) and are auto-imported, used as PascalCase
  (`<CardTitle>`).
- A component ported from the template keeps the template's name, markup and Tailwind classes.
  Departures get a comment saying why.
- Icons are single-file components named `icon-*.vue`.

## Comments

Comments explain why, not what. They are expected wherever the code differs from the template or
works around a library. See `nuxt.config.mjs` and the two plugins for the tone and depth.

## Page metadata

Every page sets its own metadata with `useSeoMeta`:

- `title` — a short noun ("About", "Setup"). `app.vue` appends " - Thiago Alves", and the whole title
  should stay under about 60 characters.
- `description` — 120–160 characters, written as a search-result snippet, unique per page.
- `ogTitle` / `ogDescription` — same values as `title` and `description`.
- Exactly one `<h1>` per page, and headings nest without skipping a level.

A new static route also goes into `STATIC_PATHS` in `server/routes/sitemap.xml.get.js`.

## Dependencies

- Don't upgrade `nuxt` past the pinned version without a production build that loads every page.
- After any dependency change, run `npm run build` and load each route from `npm run preview`.
