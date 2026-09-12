<template>
  <Container class="mt-16 sm:mt-32">
    <div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
      <div class="lg:pl-20">
        <div class="max-w-xs px-2.5 lg:max-w-none">
          <NuxtImg
            src="/images/portrait.jpg"
            alt=""
            :width="800"
            :height="800"
            sizes="320px lg:512px"
            class="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
          />
        </div>
      </div>
      <div class="lg:order-first lg:row-span-2">
        <h1 class="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          I’m Spencer Sharp. I live in New York City, where I design the future.
        </h1>
        <div class="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
          <p>
            I’ve loved making things for as long as I can remember, and wrote my first program when I was 6 years old,
            just two weeks after my mom brought home the brand new Macintosh LC 550 that I taught myself to type on.
          </p>
          <p>
            The only thing I loved more than computers as a kid was space. When I was 8, I climbed the 40-foot oak tree
            at the back of our yard while wearing my older sister’s motorcycle helmet, counted down from three, and
            jumped — hoping the tree was tall enough that with just a bit of momentum I’d be able to get to orbit.
          </p>
          <p>
            I spent the next few summers indoors working on a rocket design, while I recovered from the multiple
            surgeries it took to fix my badly broken legs. It took nine iterations, but when I was 15 I sent my dad’s
            Blackberry into orbit and was able to transmit a photo back down to our family computer from space.
          </p>
          <p>
            Today, I’m the founder of Planetaria, where we’re working on civilian space suits and manned shuttle kits
            you can assemble at home so that the next generation of kids really <em>can</em> make it to orbit — from the
            comfort of their own backyards.
          </p>
        </div>
      </div>
      <div class="lg:pl-20">
        <ul role="list">
          <li class="flex">
            <NuxtLink
              to="#"
              class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
            >
              <IconX class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
              <span class="ml-4">Follow on X</span>
            </NuxtLink>
          </li>
          <li class="mt-4 flex">
            <NuxtLink
              to="#"
              class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
            >
              <IconInstagram class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
              <span class="ml-4">Follow on Instagram</span>
            </NuxtLink>
          </li>
          <li class="mt-4 flex">
            <NuxtLink
              to="#"
              class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
            >
              <IconGitHub class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
              <span class="ml-4">Follow on GitHub</span>
            </NuxtLink>
          </li>
          <li class="mt-4 flex">
            <NuxtLink
              to="#"
              class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
            >
              <IconLinkedIn class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
              <span class="ml-4">Follow on LinkedIn</span>
            </NuxtLink>
          </li>
          <li class="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40 flex">
            <NuxtLink
              to="mailto:spencer@planetaria.tech"
              class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
            >
              <IconMailSolid class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
              <span class="ml-4">spencer@planetaria.tech</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </Container>
</template>

<script setup>
useSeoMeta({
  title: 'About',
  description: 'I’m Spencer Sharp. I live in New York City, where I design the future.',
});
</script>
