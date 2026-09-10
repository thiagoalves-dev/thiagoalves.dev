<template>
  <footer class="mt-32 flex-none">
    <ContainerOuter>
      <div class="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
        <ContainerInner>
          <div class="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div
              class="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200"
            >
              <NuxtLink
                v-for="link in navLinks"
                :key="link.href"
                :to="link.href"
                class="transition hover:text-teal-500 dark:hover:text-teal-400"
              >
                {{ link.label }}
              </NuxtLink>
            </div>
            <p class="text-sm text-zinc-400 dark:text-zinc-500">
              &copy; {{ year }} Spencer Sharp. All rights reserved.
            </p>
          </div>
        </ContainerInner>
      </div>
    </ContainerOuter>
  </footer>
</template>

<script setup>
const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/uses', label: 'Uses' },
];

const year = new Date().getFullYear();
</script>
