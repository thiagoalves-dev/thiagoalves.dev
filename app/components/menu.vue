<template>
  <header
    class="mx-auto max-w-2xl lg:max-w-5xl py-6 sticky top-0 z-50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-zinc-900/60 border-b border-transparent"
  >
    <div class="relative flex gap-4">
      <div class="flex-1">
        <NuxtLink class="flex items-center gap-3" to="/">
          <img
            alt="Avatar"
            class="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10"
            src="/images/profile-pic.jpg"
          />
          <span class="sr-only">Home</span>
        </NuxtLink>
      </div>

      <div class="flex flex-1 justify-end md:justify-center">
        <nav class="pointer-events-auto hidden md:block">
          <ul
            class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-700 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
          >
            <li v-for="item in items" :key="item.to">
              <NuxtLink
                :class="{
                  'text-teal-500 dark:text-teal-400': route.path === item.to,
                }"
                :to="item.to"
                class="relative block px-3 py-2 transition"
              >
                {{ item.label }}
                <span
                  v-if="route.path === item.to"
                  class="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"
                >
                </span>
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <mobile-menu :items="items" />
      </div>

      <div class="flex justify-end md:flex-1">
        <button
          :aria-label="colorMode.preference === 'dark' ? 'Switch to light' : 'Switch to dark'"
          class="group rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
          type="button"
          @click="toggleTheme"
        >
          <Moon
            v-if="colorMode.value === 'dark'"
            class="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600"
          />
          <SunMedium
            v-else
            class="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600"
          />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Moon, SunMedium } from 'lucide-vue-next';

const items = [
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/journal' },
  { label: 'Projects', to: '/journal' },
  { label: 'Speaking', to: '/journal' },
  { label: 'Uses', to: '/journal' },
];

const route = useRoute();

const open = ref(false);
const menu = ref(null);

function onClickOutside(e) {
  if (!open.value) return;
  const target = e.target;
  if (menu.value && !menu.value.contains(target)) open.value = false;
}

onMounted(() => document.addEventListener('click', onClickOutside));
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside));

const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};
</script>

<style scoped>
@supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
  header {
    background-color: rgba(255, 255, 255, 0.9);
  }
  .dark header {
    background-color: rgba(24, 24, 27, 0.9);
  }
}
</style>
