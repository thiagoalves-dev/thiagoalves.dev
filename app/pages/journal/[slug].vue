<template>
  <ArticleLayout v-if="article" :article="article">
    <!--
      ContentRenderer's own root element is the .prose container — see the note in
      article-layout.vue for why it can't be nested inside a separate wrapper element.
      The prose/dark:prose-invert pair is the template's Prose styling, plus its `mt-8`.
    -->
    <ContentRenderer :value="article" class="prose dark:prose-invert mt-8" data-mdx-content />
  </ArticleLayout>
</template>

<script setup>
const route = useRoute();

const { data: article } = await useAsyncData(route.path, () => queryCollection('journal').path(route.path).first());

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Entry not found', fatal: true });
}

useSeoMeta({
  title: () => article.value?.title,
  description: () => article.value?.description,
  ogTitle: () => article.value?.title,
  ogDescription: () => article.value?.description,
  ogType: 'article',
});

const siteUrl = String(useRuntimeConfig().public?.siteUrl ?? '').replace(/\/+$/, '');

useHead({
  // Long titles drop the " - Thiago Alves" suffix so search results don't truncate them (~60 chars).
  titleTemplate: (title) => (title && title.length + ' - Thiago Alves'.length > 60 ? title : `${title} - Thiago Alves`),
  script: [jsonLdScript([blogPostingSchema(siteUrl, article.value), personSchema(siteUrl)])],
});
</script>
