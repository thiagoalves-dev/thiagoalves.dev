# Thiago Alves' Website

This is a Nuxt 3 project with Tailwind CSS 4, created from scratch while preserving the Docker setup. It uses the latest versions of all dependencies as of October 2023.

**Note:** Tailwind CSS v4 requires the separate @tailwindcss/postcss package for PostCSS integration. This project has been configured to use this package instead of using tailwindcss directly as a PostCSS plugin. The postcss package is not directly included as it's likely bundled with or included as a dependency of @tailwindcss/postcss.

## Dependencies

- Node.js: 22.14.0
- Nuxt: 3.17.5
- Tailwind CSS: 4.1.8
- @tailwindcss/postcss: 4.1.8
- Autoprefixer: 10.4.21
- Sass: 1.89.1

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:1000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
