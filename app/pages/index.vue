<template>
  <Container class="mt-9">
    <div class="max-w-2xl">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
        Software designer, founder, and amateur astronaut.
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria,
        where we develop technologies that empower regular people to explore space on their own terms.
      </p>
      <div class="mt-6 flex gap-6">
        <NuxtLink to="#" class="group -m-1 p-1" aria-label="Follow on X">
          <IconX
            class="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
          />
        </NuxtLink>
        <NuxtLink to="#" class="group -m-1 p-1" aria-label="Follow on Instagram">
          <IconInstagram
            class="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
          />
        </NuxtLink>
        <NuxtLink to="#" class="group -m-1 p-1" aria-label="Follow on GitHub">
          <IconGitHub
            class="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
          />
        </NuxtLink>
        <NuxtLink to="#" class="group -m-1 p-1" aria-label="Follow on LinkedIn">
          <IconLinkedIn
            class="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
          />
        </NuxtLink>
      </div>
    </div>
  </Container>

  <div class="mt-16 sm:mt-20">
    <div class="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
      <div
        v-for="(image, imageIndex) in photos"
        :key="image"
        :class="[
          'relative w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
          rotations[imageIndex % rotations.length],
        ]"
      >
        <div class="aspect-9/10">
          <NuxtImg :src="image" alt="" sizes="176px sm:288px" class="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </div>
  </div>

  <Container class="mt-24 md:mt-28">
    <div class="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
      <div class="flex flex-col gap-16">
        <Card v-for="article in homeArticles" :key="article.path" as="article">
          <CardTitle :to="article.path">{{ article.title }}</CardTitle>
          <CardEyebrow as="time" :datetime="article.date" decorate>{{ formatDate(article.date) }}</CardEyebrow>
          <CardDescription>{{ article.description }}</CardDescription>
          <CardCta>Read article</CardCta>
        </Card>
      </div>
      <div class="space-y-10 lg:pl-16 xl:pl-24">
        <form action="/thank-you" class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
          <h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            <IconMail class="h-6 w-6 flex-none" />
            <span class="ml-3">Stay up to date</span>
          </h2>
          <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Get notified when I publish something new, and unsubscribe at any time.
          </p>
          <div class="mt-6 flex items-center">
            <span class="flex min-w-0 flex-auto p-px">
              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                required
                class="w-full appearance-none rounded-[calc(var(--radius-md)-1px)] bg-white px-3 py-[calc(--spacing(2)-1px)] shadow-md shadow-zinc-800/5 outline outline-zinc-900/10 placeholder:text-zinc-400 focus:ring-4 focus:ring-teal-500/10 focus:outline-teal-500 sm:text-sm dark:bg-zinc-700/15 dark:text-zinc-200 dark:outline-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-teal-400/10 dark:focus:outline-teal-400"
              />
            </span>
            <AppButton type="submit" class="ml-4 flex-none">Join</AppButton>
          </div>
        </form>

        <div class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
          <h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            <IconBriefcase class="h-6 w-6 flex-none" />
            <span class="ml-3">Work</span>
          </h2>
          <ol class="mt-6 space-y-4">
            <li v-for="(role, roleIndex) in resume" :key="roleIndex" class="flex gap-4">
              <div
                class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
              >
                <NuxtImg :src="role.logo" alt="" class="h-7 w-7" />
              </div>
              <dl class="flex flex-auto flex-wrap gap-x-2">
                <dt class="sr-only">Company</dt>
                <dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {{ role.company }}
                </dd>
                <dt class="sr-only">Role</dt>
                <dd class="text-xs text-zinc-500 dark:text-zinc-400">
                  {{ role.title }}
                </dd>
                <dt class="sr-only">Date</dt>
                <dd
                  class="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                  :aria-label="`${labelOf(role.start)} until ${labelOf(role.end)}`"
                >
                  <time :datetime="dateTimeOf(role.start)">{{ labelOf(role.start) }}</time>
                  {{ ' ' }}
                  <span aria-hidden="true">—</span>
                  {{ ' ' }}
                  <time :datetime="dateTimeOf(role.end)">{{ labelOf(role.end) }}</time>
                </dd>
              </dl>
            </li>
          </ol>
          <AppButton href="#" variant="secondary" class="group mt-6 w-full">
            Download CV
            <IconArrowDown
              class="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"
            />
          </AppButton>
        </div>
      </div>
    </div>
  </Container>
</template>

<script setup>
const { data: articles } = await useAsyncData('home-articles', () =>
  queryCollection('articles').order('date', 'DESC').all(),
);

const homeArticles = computed(() => (articles.value ?? []).slice(0, 4));

const photos = [
  '/images/photos/image-1.jpg',
  '/images/photos/image-2.jpg',
  '/images/photos/image-3.jpg',
  '/images/photos/image-4.jpg',
  '/images/photos/image-5.jpg',
];

const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2'];

const resume = [
  {
    company: 'Planetaria',
    title: 'CEO',
    logo: '/images/logos/planetaria.svg',
    start: '2019',
    end: {
      label: 'Present',
      dateTime: new Date().getFullYear().toString(),
    },
  },
  {
    company: 'Airbnb',
    title: 'Product Designer',
    logo: '/images/logos/airbnb.svg',
    start: '2014',
    end: '2019',
  },
  {
    company: 'Facebook',
    title: 'iOS Software Engineer',
    logo: '/images/logos/facebook.svg',
    start: '2011',
    end: '2014',
  },
  {
    company: 'Starbucks',
    title: 'Shift Supervisor',
    logo: '/images/logos/starbucks.svg',
    start: '2008',
    end: '2011',
  },
];

const labelOf = (value) => (typeof value === 'string' ? value : value.label);
const dateTimeOf = (value) => (typeof value === 'string' ? value : value.dateTime);
</script>
