<template>
  <div class="container mx-auto px-4 py-16">
    <ArticleLayout :article="article" />
  </div>
</template>

<script setup>
const route = useRoute()

// Get the slug from the route params
const slug = Array.isArray(route.params.slug) 
  ? route.params.slug.join('/') 
  : route.params.slug

// Fetch the article by slug
const { data: article } = await useAsyncData(`article-${slug}`, () => 
  queryContent('articles', slug).findOne()
)

// Handle article not found
if (!article.value) {
  throw createError({
    statusCode: 404,
    message: 'Article not found'
  })
}

// Set page metadata
useHead({
  title: article.value.title,
  meta: [
    { name: 'description', content: article.value.description }
  ]
})
</script>
