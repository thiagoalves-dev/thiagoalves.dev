import typography from './typography.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/components/**/*.{vue,js}',
    './app/layouts/**/*.{vue,js}',
    './app/pages/**/*.{vue,js}',
    './app/app.vue',
    './app/plugins/**/*.{js}',
  ],
  theme: {
    extend: {
      typography: typography.theme?.typography,
    },
  },
  plugins: [],
}
