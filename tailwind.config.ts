import type { Config } from 'tailwindcss';
import typography from './typography.js';

export default {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.{vue,js,ts}',
    './app/pages/**/*.{vue,js,ts}',
    './app/app.vue',
    './app/plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      typography: (typography as any).theme?.typography,
    },
  },
  plugins: [],
} satisfies Config;
