<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const siteTitle = 'Thiago Alves - Software engineer, tech lead, and amateur pitmaster';
const siteDescription =
  'I\u2019m Thiago, a Brazilian software engineer based in Austin, Texas. I\u2019ve been building software since 2008, and for many years I\u2019ve split my time between leading teams and keeping my hands on the code.';

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
  ],
});

useSeoMeta({
  description: siteDescription,
});
</script>
