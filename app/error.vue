<template>
  <NuxtLayout>
    <Container class="flex h-full items-center pt-16 sm:pt-32">
      <div class="flex flex-col items-center">
        <p class="text-base font-semibold text-zinc-400 dark:text-zinc-500">{{ statusCode }}</p>
        <h1 class="mt-4 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Page not found
        </h1>
        <p class="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <AppButton variant="secondary" class="mt-4" @click="handleGoHome">Go back home</AppButton>
      </div>
    </Container>
  </NuxtLayout>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
});

const statusCode = computed(() => props.error?.statusCode ?? 404);

const handleGoHome = () => clearError({ redirect: '/' });

useHead({
  htmlAttrs: {
    lang: 'en',
    class: 'h-full antialiased',
  },
  bodyAttrs: {
    class: 'flex h-full bg-zinc-50 dark:bg-black',
  },
});
</script>
