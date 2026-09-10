<template>
  <header
    class="pointer-events-none relative z-50 flex flex-none flex-col"
    :style="{ height: 'var(--header-height)', marginBottom: 'var(--header-mb)' }"
  >
    <template v-if="isHomePage">
      <div ref="avatarRef" class="order-last mt-[calc(--spacing(16)-(--spacing(3)))]" />
      <Container class="top-0 order-last -mb-3 pt-3" :style="{ position: 'var(--header-position)' }">
        <div class="top-(--avatar-top,--spacing(3)) w-full" :style="{ position: 'var(--header-inner-position)' }">
          <div class="relative">
            <!-- AvatarContainer -->
            <div
              class="absolute top-3 left-0 origin-left transition-opacity h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10"
              :style="{ opacity: 'var(--avatar-border-opacity, 0)', transform: 'var(--avatar-border-transform)' }"
            />
            <!-- Avatar (large) -->
            <NuxtLink
              to="/"
              aria-label="Home"
              class="block h-16 w-16 origin-left pointer-events-auto"
              :style="{ transform: 'var(--avatar-image-transform)' }"
            >
              <NuxtImg
                src="/images/avatar.jpg"
                alt=""
                sizes="64px"
                class="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-16 w-16"
                preload
              />
            </NuxtLink>
          </div>
        </div>
      </Container>
    </template>
    <div ref="headerRef" class="top-0 z-10 h-16 pt-6" :style="{ position: 'var(--header-position)' }">
      <Container class="top-(--header-top,--spacing(6)) w-full" :style="{ position: 'var(--header-inner-position)' }">
        <div class="relative flex gap-4">
          <div class="flex flex-1">
            <!-- AvatarContainer -->
            <div
              v-if="!isHomePage"
              class="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10"
            >
              <!-- Avatar -->
              <NuxtLink to="/" aria-label="Home" class="pointer-events-auto">
                <NuxtImg
                  src="/images/avatar.jpg"
                  alt=""
                  sizes="36px"
                  class="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-9 w-9"
                  preload
                />
              </NuxtLink>
            </div>
          </div>
          <div class="flex flex-1 justify-end md:justify-center">
            <!-- MobileNavigation -->
            <Popover v-slot="{ open, close }" class="pointer-events-auto md:hidden">
              <PopoverButton
                class="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
              >
                Menu
                <IconChevronDown
                  class="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
                />
              </PopoverButton>
              <TransitionRoot
                as="template"
                :show="open"
                enter="transition duration-150 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="transition duration-150 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <PopoverOverlay static class="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-xs dark:bg-black/80" />
              </TransitionRoot>
              <TransitionRoot
                as="template"
                :show="open"
                enter="transition duration-150 ease-out"
                enter-from="scale-95 opacity-0"
                enter-to="scale-100 opacity-100"
                leave="transition duration-150 ease-in"
                leave-from="scale-100 opacity-100"
                leave-to="scale-95 opacity-0"
              >
                <PopoverPanel
                  focus
                  static
                  class="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
                >
                  <div class="flex flex-row-reverse items-center justify-between">
                    <PopoverButton aria-label="Close menu" class="-m-1 p-1">
                      <IconClose class="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
                    </PopoverButton>
                    <h2 class="text-sm font-medium text-zinc-600 dark:text-zinc-400">Navigation</h2>
                  </div>
                  <nav class="mt-6">
                    <ul
                      class="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300"
                    >
                      <li v-for="item in navigation" :key="item.href">
                        <NuxtLink :to="item.href" class="block py-2" @click="close()">{{ item.label }}</NuxtLink>
                      </li>
                    </ul>
                  </nav>
                </PopoverPanel>
              </TransitionRoot>
            </Popover>
            <!-- DesktopNavigation -->
            <nav class="pointer-events-auto hidden md:block">
              <ul
                class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
              >
                <li v-for="item in navigation" :key="item.href">
                  <NuxtLink
                    :to="item.href"
                    :class="[
                      'relative block px-3 py-2 transition',
                      route.path === item.href
                        ? 'text-teal-500 dark:text-teal-400'
                        : 'hover:text-teal-500 dark:hover:text-teal-400',
                    ]"
                  >
                    {{ item.label }}
                    <span
                      v-if="route.path === item.href"
                      class="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"
                    />
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
          <div class="flex justify-end md:flex-1">
            <div class="pointer-events-auto">
              <!-- ThemeToggle -->
              <button
                type="button"
                :aria-label="mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'"
                class="group rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
                @click="toggleTheme"
              >
                <IconSun
                  class="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600"
                />
                <IconMoon
                  class="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition not-[@media_(prefers-color-scheme:dark)]:fill-teal-400/10 not-[@media_(prefers-color-scheme:dark)]:stroke-teal-500 dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400"
                />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  </header>
  <div v-if="isHomePage" class="flex-none" :style="{ height: 'var(--content-offset)' }" />
</template>

<script setup>
import { Popover, PopoverButton, PopoverOverlay, PopoverPanel, TransitionRoot } from '@headlessui/vue';

const navigation = [
  { href: '/about', label: 'About' },
  { href: '/articles', label: 'Articles' },
  { href: '/projects', label: 'Projects' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/uses', label: 'Uses' },
];

const route = useRoute();
const isHomePage = computed(() => route.path === '/');

const headerRef = ref(null);
const avatarRef = ref(null);

const { start, stop } = useHeaderScroll({ headerRef, avatarRef, isHomePage });

onMounted(() => {
  start();
});

onBeforeUnmount(() => {
  stop();
});

const colorMode = useColorMode();
const otherTheme = computed(() => (colorMode.value === 'dark' ? 'light' : 'dark'));
const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
});

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}
</script>
