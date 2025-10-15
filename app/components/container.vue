<template>
  <div class="flex h-full sm:px-8">
    <div class="fixed inset-0 flex justify-center sm:px-8">
      <div class="flex w-full max-w-7xl lg:px-8">
        <div class="w-full bg-white ring-1 px-4 sm:px-8 lg:px-12 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
</script>
