<template>
  <ArticleLayout v-if="article" :article="article">
    <!--
      ContentRenderer's own root element is the .prose container — see the note in
      article-layout.vue for why it can't be nested inside a separate <Prose> wrapper.
      Classes mirror prose.vue plus the template's `mt-8`.
    -->
    <ContentRenderer :value="article" class="prose dark:prose-invert mt-8" data-mdx-content />
  </ArticleLayout>
</template>

<script setup>
const route = useRoute();

const { data: article } = await useAsyncData(route.path, () => queryCollection('articles').path(route.path).first());

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true });
}

useSeoMeta({
  title: () => article.value?.title,
  description: () => article.value?.description,
});
</script>
