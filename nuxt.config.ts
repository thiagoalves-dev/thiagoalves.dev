// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // CSS and styling
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {
        config: './tailwind.config.js'
      },
      autoprefixer: {},
    },
  },
  
  // App configuration
  app: {
    head: {
      title: 'Thiago Alves',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Personal website of Thiago Alves' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
      ]
    }
  },
  
  // Content handling
  content: {
    markdown: {
      remarkPlugins: ['remark-gfm'],
      rehypePlugins: ['@mapbox/rehype-prism']
    }
  },
  
  // Build configuration
  build: {
    transpile: ['clsx']
  },
  
  // Module options
  modules: [
    '@nuxt/content'
  ]
})
