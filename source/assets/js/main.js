window.axios = require('axios');
window.fuse = require('fuse.js');
window.Vue = require('vue');

import Search from './components/Search.vue';
import highlights from 'highlight.js/lib/highlight';

// Syntax highlighting
highlights.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
highlights.registerLanguage('css', require('highlight.js/lib/languages/css'));
highlights.registerLanguage('html', require('highlight.js/lib/languages/xml'));
highlights.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
highlights.registerLanguage('json', require('highlight.js/lib/languages/json'));
highlights.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'));
highlights.registerLanguage('php', require('highlight.js/lib/languages/php'));
highlights.registerLanguage('scss', require('highlight.js/lib/languages/scss'));
highlights.registerLanguage('yaml', require('highlight.js/lib/languages/yaml'));

document.querySelectorAll('pre code').forEach((block) => {
    highlights.highlightBlock(block);
});

Vue.config.productionTip = false;

new Vue({
    components: {
        Search,
    },
}).$mount('#vue-search');

