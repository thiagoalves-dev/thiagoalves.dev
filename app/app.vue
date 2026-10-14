<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const siteUrl = String(config.public?.siteUrl ?? '').replace(/\/+$/, '');

const siteTitle = 'Thiago Alves - Software engineer, tech lead, pitmaster';
const siteDescription =
  'Thiago Alves is a Brazilian software engineer and tech lead in Austin, Texas, writing about building software, leading teams, and working with AI.';

const canonicalUrl = computed(() => `${siteUrl}${route.path}`);
// 1200x630 sharing card (avatar + name + tagline), used on every page.
const ogImage = `${siteUrl}/images/og-image.png`;

useHead({
  titleTemplate: (title) => (title ? `${title} - Thiago Alves` : siteTitle),
  htmlAttrs: {
    lang: 'en',
    class: 'h-full antialiased',
  },
  bodyAttrs: {
    class: 'flex h-full bg-zinc-50 dark:bg-black',
  },
  link: [
    // Same strategy as the template: the favicon is the avatar, centre-cropped square.
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      href: '/feed.xml',
    },
    { rel: 'canonical', href: canonicalUrl },
  ],
});

// Site-wide defaults; pages override title/description (and og* to match) via their own useSeoMeta.
useSeoMeta({
  description: siteDescription,
  ogTitle: siteTitle,
  ogDescription: siteDescription,
  ogType: 'website',
  ogSiteName: 'Thiago Alves',
  ogUrl: canonicalUrl,
  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Thiago Alves — Software engineer, tech lead, and amateur pitmaster.',
  twitterCard: 'summary_large_image',
  twitterImage: ogImage,
});
</script>
