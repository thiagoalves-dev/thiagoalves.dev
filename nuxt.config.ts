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
        '@nuxtjs/i18n',
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

    i18n: {
        vueI18n: './i18n.config.ts',
        locales: [
            {
                iso: 'en-US',
                code: 'en-us',
                name: 'English (US)',
                flag: 'rounded-united-states.png'
            },
            {
                iso: 'pt-BR',
                code: 'pt-br',
                name: 'Português (BR)',
                flag: 'rounded-brazil.png'
            }
        ],
        defaultLocale: 'en-us',
        strategy: 'prefix_except_default',
        customRoutes: 'config',
        dynamicRouteParams: true,
        pages: {
            'about': {
                'pt-br': '/sobre'
            },
            'how-i-can-help': {
                'pt-br': '/como-posso-ajudar'
            }
        }
    },

    gtag: {
        id: process.env.GOOGLE_ANALYTICS_ID
    }
});
