export default defineNuxtConfig({
    ssr: true,
    devtools: {enabled: true},
    css: ["~/assets/sass/main.scss"],
    app: {
        head: {
            script: [
                {
                    src: 'https://assets.calendly.com/assets/external/widget.js',
                    async: true
                }
            ]
        }
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        '@nuxt/content',
        '@zadigetvoltaire/nuxt-gtm'
    ],
    content: {
        watch: {
            ws: {
                hostname: 'localhost',
                port: 3000
            }
        },
        highlight: {
            theme: 'github-light',
            preload: ['java', 'xml', 'sql', 'php', 'bash'],
        }
    },
    gtm: {
        id: 'GTM-7NFYK33VWQ'
    }
});
