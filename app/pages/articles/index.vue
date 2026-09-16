<template>
  <SimpleLayout
    title="Writing on software design, company building, and the aerospace industry."
    intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
  >
    <div class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
      <div class="flex max-w-3xl flex-col space-y-16">
        <article v-for="article in articles" :key="article.path" class="md:grid md:grid-cols-4 md:items-baseline">
          <Card class="md:col-span-3">
            <CardTitle :to="article.path">
              {{ article.title }}
            </CardTitle>
            <CardEyebrow as="time" :datetime="article.date" class="md:hidden" :decorate="true">
              {{ formatDate(article.date) }}
            </CardEyebrow>
            <CardDescription>{{ article.description }}</CardDescription>
            <CardCta>Read article</CardCta>
          </Card>
          <CardEyebrow as="time" :datetime="article.date" class="mt-1 max-md:hidden">
            {{ formatDate(article.date) }}
          </CardEyebrow>
        </article>
      </div>
    </div>
  </SimpleLayout>
</template>

<script setup>
const { data: articles } = await useAsyncData('articles', () =>
  queryCollection('articles').order('date', 'DESC').all(),
);

useSeoMeta({
  title: 'Articles',
  description:
    'All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.',
});
</script>
