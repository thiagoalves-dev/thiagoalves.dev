import tailwindcss from '@tailwindcss/vite';
import { spotlightPrism } from './shiki-theme.js';
import rehypeUnwrapImages from './rehype-unwrap-images.js';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },

  devServer: {
    // The 1000 block keeps clear of the Contracts Connected worktree ports. macOS only lets an
    // unprivileged process bind below 1024 on all interfaces; on localhost Nuxt falls back to 3000.
    host: '0.0.0.0',
    port: 1001,
  },

  app: {
    // Mirrors the template's <div className="flex w-full"> wrapper that sits
    // between <body class="flex h-full"> and <Layout />.
    rootAttrs: {
      class: 'flex w-full',
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ['@nuxt/eslint', '@nuxtjs/color-mode', '@nuxt/content', '@nuxt/image', 'nuxt-gtag'],

  runtimeConfig: {
    public: {
      // Canonical origin. Drives absolute URLs for canonicals, OG images, the sitemap and the feed.
      siteUrl: 'https://thiagoalves.dev',
    },
  },

  gtag: {
    // Google Analytics. The ID is a Netlify env var, so local builds (no ID) send nothing.
    enabled: Boolean(process.env.GOOGLE_ANALYTICS_ID),
    id: process.env.GOOGLE_ANALYTICS_ID,
  },

  colorMode: {
    classSuffix: '',
  },

  content: {
    experimental: {
      // Node's built-in SQLite instead of the native better-sqlite3 module, which is not installed.
      // npm 11 skips install scripts by default, so better-sqlite3 never got rebuilt for the build's
      // Node version on Netlify (cached binary → "Module did not self-register").
      sqliteConnector: 'native',
    },

    renderer: {
      // The template renders bare <h2>/<h3>. Nuxt Content wraps headings in an <a href="#slug">,
      // which then picks up the teal prose link colour. Turn the anchors off to match.
      anchorLinks: { h2: false, h3: false, h4: false },
    },

    build: {
      markdown: {
        rehypePlugins: {
          // Markdown wraps a lone image in <p>; the template renders a bare <img>. See the plugin.
          // Passed as a pre-resolved `instance` — Nuxt Content's parser imports plugins by their
          // key as a bare module specifier, so a local file path in `src` is not resolvable there.
          'rehype-unwrap-images': { instance: rehypeUnwrapImages },
        },

        highlight: {
          // Must be a colour-mode map; a non-string value is used as a raw Shiki theme object.
          // Code blocks are dark in both schemes, so `default` alone covers it.
          theme: { default: spotlightPrism },
          langs: ['js', 'jsx', 'ts', 'tsx', 'c', 'rust', 'php', 'python', 'css', 'html', 'json', 'bash', 'shell', 'diff', 'md'],
        },
      },
    },
  },
});
