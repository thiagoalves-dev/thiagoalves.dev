// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {
        config: {
          path: './tailwind.config.js'
        }
      },
      autoprefixer: {},
    },
  },
})
