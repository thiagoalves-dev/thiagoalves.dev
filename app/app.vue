<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const siteUrl = String(config.public?.siteUrl ?? '').replace(/\/+$/, '');

const siteTitle = 'Thiago Alves - Software engineer, tech lead, and amateur pitmaster';
const siteDescription =
  'I\u2019m Thiago, a Brazilian software engineer based in Austin, Texas. I\u2019ve been building software since 2008, and for many years I\u2019ve split my time between leading teams and keeping my hands on the code.';

const canonicalUrl = computed(() => `${siteUrl}${route.path}`);
// Placeholder until a 1200x630 sharing image exists — see projects/thiagoalves.dev/launch-checklist.md.
const ogImage = `${siteUrl}/images/portrait.jpg`;

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
  twitterCard: 'summary_large_image',
  twitterImage: ogImage,
});
</script>
