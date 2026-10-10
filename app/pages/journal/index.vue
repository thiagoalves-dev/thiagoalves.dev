<template>
  <SimpleLayout
    title="A journal on software engineering, leading teams, and whatever else is on my mind."
    intro="Thoughts, lessons, and observations across work and life, in chronological order."
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
const { data: articles } = await useAsyncData('journal', () =>
  queryCollection('journal').order('date', 'DESC').all(),
);

const journalDescription =
  'Thoughts, lessons, and observations across work and life, in chronological order.';

useSeoMeta({
  title: 'Journal',
  description: journalDescription,
  ogTitle: 'Journal',
  ogDescription: journalDescription,
});
</script>
