<template>
  <div class="xl:relative">
    <div class="mx-auto max-w-2xl">
      <button
        type="button"
        @click="$router.back()"
        aria-label="Go back to articles"
        class="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          class="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
        >
          <path
            d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <article>
        <header class="flex flex-col">
          <h1 class="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {{ article.title }}
          </h1>
          <time
            :datetime="formatDate(article.date)"
            class="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
          >
            <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
            <span class="ml-3">{{ formatDate(article.date) }}</span>
          </time>
        </header>
        <div class="mt-8 prose dark:prose-invert">
          <ContentRenderer :value="article" />
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

function formatDate(date) {
  if (!date) return ''
  
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.prose {
  @apply max-w-none;
}
</style>
