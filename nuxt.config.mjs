import tailwindcss from '@tailwindcss/vite';
import { spotlightPrism } from './shiki-theme.js';
import rehypeUnwrapImages from './rehype-unwrap-images.js';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },

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

  modules: ['@nuxt/eslint', '@nuxtjs/color-mode', '@nuxt/content', '@nuxt/image'],

  colorMode: {
    classSuffix: '',
  },

  content: {
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
          langs: ['js', 'jsx', 'ts', 'tsx', 'c', 'css', 'html', 'json', 'bash', 'diff', 'md'],
        },
      },
    },
  },
});
