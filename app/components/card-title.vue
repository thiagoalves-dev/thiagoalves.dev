<template>
  <component :is="as" class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
    <CardLink v-if="to" :to="to"><slot /></CardLink>
    <slot v-else />
  </component>
</template>

<script setup>
defineProps({
  as: {
    type: [String, Object],
    default: 'h2',
  },
  to: {
    type: [String, Object],
    default: null,
  },
});
</script>
