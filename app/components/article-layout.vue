<template>
  <Container class="mt-16 lg:mt-32">
    <div class="xl:relative">
      <div class="mx-auto max-w-2xl">
        <button
          v-if="previousPathname"
          type="button"
          aria-label="Go back to articles"
          class="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
          @click="router.back()"
        >
          <IconArrowLeft
            class="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
          />
        </button>
        <article>
          <header class="flex flex-col">
            <h1 class="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              {{ article.title }}
            </h1>
            <time
              :datetime="article.date"
              class="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
            >
              <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
              <span class="ml-3">{{ formatDate(article.date) }}</span>
            </time>
          </header>
          <!--
            The template wraps the body in <Prose class="mt-8" data-mdx-content>. Here the caller
            supplies that element instead: Nuxt Content's <ContentRenderer> always emits a root
            element, so it has to BE the .prose container. Nesting it inside a separate <Prose>
            added an extra div, which stole the typography `> :first-child` / `> :last-child`
            margin resets and made every article 76px taller than the template.
          -->
          <slot />
        </article>
      </div>
    </div>
  </Container>
</template>

<script setup>
defineProps({
  article: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const previousPathname = ref(null);

onMounted(() => {
  previousPathname.value = window.history.state?.back ?? null;
});
</script>
