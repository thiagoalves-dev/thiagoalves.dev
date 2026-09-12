<template>
  <div
    class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50"
  />
  <NuxtLink :to="to" v-bind="$attrs">
    <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
    <span class="relative z-10"><slot /></span>
  </NuxtLink>
</template>

<script setup>
defineOptions({ inheritAttrs: false });

defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
});
</script>
