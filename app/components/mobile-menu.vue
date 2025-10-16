<template>
  <div class="md:hidden col-start-2 row-start-1 justify-self-center">
    <div class="relative">
      <button
        :aria-expanded="open ? 'true' : 'false'"
        aria-haspopup="true"
        class="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-zinc-800/80 ring-1 ring-zinc-200 dark:ring-zinc-700 shadow-sm px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200"
        @click="open = !open"
      >
        Menu
        <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            clip-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
            fill-rule="evenodd"
          />
        </svg>
      </button>

      <transition
        enter-active-class="transition ease-out duration-150"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="open"
          ref="menu"
          class="absolute left-1/2 z-50 mt-2 w-56 -translate-x-1/2 rounded-2xl bg-white dark:bg-zinc-800 ring-1 ring-zinc-200 dark:ring-zinc-700 shadow-lg p-2"
        >
          <NuxtLink
            v-for="item in items"
            :key="item.to + '-mobile'"
            :class="{
              'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900': route.path === item.to,
            }"
            :to="item.to"
            class="block rounded-xl px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-700/60"
            @click="open = false"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup>
defineProps({
  items: Array,
});
const route = useRoute();
</script>
