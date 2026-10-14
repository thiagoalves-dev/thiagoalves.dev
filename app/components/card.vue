<template>
  <component :is="as" class="group relative flex flex-col items-start">
    <slot />
  </component>
</template>

<script setup>
defineProps({
  as: {
    type: [String, Object],
    default: 'div',
  },
});
</script>
