<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const siteTitle = 'Spencer Sharp - Software designer, founder, and amateur astronaut';
const siteDescription =
  'I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms.';

useHead({
  titleTemplate: (title) => (title ? `${title} - Spencer Sharp` : siteTitle),
  htmlAttrs: {
    lang: 'en',
    class: 'h-full antialiased',
  },
  bodyAttrs: {
    class: 'flex h-full bg-zinc-50 dark:bg-black',
  },
  link: [
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
