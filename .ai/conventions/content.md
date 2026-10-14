# Content conventions

Rules for articles in `content/journal/`. The README shows the file format.

## Frontmatter

- `title`, `description`, `date` and `author` are required; the schema in `content.config.js` fails
  the build without them.
- `description` is 120–160 characters, says something the title doesn't, and is written for a
  search result, not lifted from the body. When adding one, read it next to the others: that is
  how they appear in search.
- `date` is ISO (`YYYY-MM-DD`). A post that was substantially rewritten may take a new date; one
  that was only republished keeps its original.

## Slugs

- The file name is the slug: short, hyphenated, with the words someone would search for.
- A published slug never changes without a 301 from the old URL.

## Images

- Stored in `public/images/articles/`.
- Always written with explicit dimensions so the layout doesn't shift while loading:
  `![Alt text](/images/articles/name.png){width="800" height="450"}`.
- Alt text describes the image. Decorative images get an empty alt.
- An image on its own line renders as a bare `<img>`, matching the template's spacing
  (`rehype-unwrap-images.js`).

## Code blocks

- Always declare the language.
- The language must be in `content.build.markdown.highlight.langs` in `nuxt.config.mjs`; add it
  there if not. An unlisted language renders as unhighlighted text.

## Linking

- Link to at least one other page on the site where it fits naturally.
- Internal links are root-relative (`/journal/coffee-is-over`), not absolute URLs.
