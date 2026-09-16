<template>
  <Container class="mt-16 sm:mt-32">
    <div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
      <div class="lg:pl-20">
        <div class="max-w-xs px-2.5 lg:max-w-none">
          <NuxtImg
            src="/images/portrait.jpg"
            alt=""
            :width="1189"
            :height="1189"
            sizes="320px lg:512px"
            class="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover saturate-[0.7] sepia-[0.25] contrast-[1.05] dark:bg-zinc-800"
          />
        </div>
      </div>
      <div class="lg:order-first lg:row-span-2">
        <h1 class="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          I’m Thiago Alves. Software engineer and engineering lead.
        </h1>
        <div class="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
          <p>
            I come from a small town in the south of Brazil. Being a software engineer never crossed my mind —
            programming wasn’t on the list of things I knew existed. A technical IT course introduced us, and I’ve
            been at it ever since.
          </p>
          <p>
            I joined the software industry in 2011. Websites, small apps, a lot of different technologies, and people
            around me with far more experience than I had. It was the stretch where I learned the most, and all of it
            came from building real things.
          </p>
          <p>
            As the projects got bigger and more complicated, I got more interested in how software gets built well.
            Better practices, testing, code review, cloud infrastructure, the methodologies modern teams run on. That
            interest is what moved me into leadership, and I’ve been a tech lead in one form or another.
          </p>
          <p>
            In 2023 I came to the US to work on my English. My wife and our two cats came with me. What started as
            temporary turned into a green card application, and it helped me get to another level in my career.
          </p>
          <p>
            Currently I’m based in Austin, Texas. Besides work, my time goes to my wife, our cats, friends, a lot of
            Brazilian barbecue, and the sports I follow more closely than I should.
          </p>
        </div>
      </div>
      <div class="lg:pl-20">
        <ul role="list">
          <li v-for="(link, i) in socialLinks" :key="link.label" :class="[i > 0 ? 'mt-4' : '', 'flex']">
            <NuxtLink
              :to="link.href"
              target="_blank"
              rel="noreferrer noopener"
              class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
            >
              <component :is="link.icon" class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
              <span class="ml-4">Follow on {{ link.label }}</span>
            </NuxtLink>
          </li>
          <li class="mt-8 flex border-t border-zinc-100 pt-8 dark:border-zinc-700/40">
            <NuxtLink
              :to="`mailto:${email}`"
              class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
            >
              <IconMailSolid class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
              <span class="ml-4">{{ email }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </Container>
</template>

<script setup>
import { resolveComponent } from 'vue';

// Same three, same order as the home page.
const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thiagoalvesdev', icon: resolveComponent('IconLinkedIn') },
  { label: 'Instagram', href: 'https://www.instagram.com/thiagoalves.dev', icon: resolveComponent('IconInstagram') },
  { label: 'X', href: 'https://x.com/thiagoalves_dev', icon: resolveComponent('IconX') },
];

const email = 'me@thiagoalves.dev';

useSeoMeta({
  title: 'About',
  description:
    'I’m Thiago Alves, a software engineer and engineering lead in Austin, Texas. I started out in a small town in southern Brazil and have been building software ever since.',
});
</script>
