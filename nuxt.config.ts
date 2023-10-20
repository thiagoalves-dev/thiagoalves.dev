export default defineNuxtConfig({
    ssr: true,
    devtools: {enabled: true},
    css: ["~/assets/sass/main.scss"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        '@nuxt/content',
        'nuxt-calendly',
        'nuxt-gtag'
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
    calendly: {
        isEnabled: true,
        loadWidgetCSS: true,
        loadWidgetCloseIconSvg: true
    },
    gtag: {
        id: process.env.GOOGLE_ANALYTICS_ID
    }
});
