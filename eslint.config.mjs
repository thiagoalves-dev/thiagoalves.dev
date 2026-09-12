import prettierRecommended from 'eslint-plugin-prettier/recommended';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(prettierRecommended, {
  name: 'spotlight/port-overrides',
  files: ['app/**/*.vue'],
  rules: {
    // The component names are fixed by the port's naming contract (Card -> card.vue,
    // Container -> container.vue, Prose -> prose.vue). Nuxt auto-imports resolve them
    // without collisions, so the multi-word requirement buys nothing here.
    'vue/multi-word-component-names': 'off',

    // The Spotlight template renders several React fragments with sibling roots
    // (components/Layout.jsx, app/page.jsx). Vue 3 supports fragments natively and the
    // markup has to stay faithful, so a single-root requirement cannot be honoured.
    'vue/no-multiple-template-root': 'off',
  },
});
