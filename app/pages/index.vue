<template>
  <Container class="mt-9">
    <div class="max-w-2xl">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
        Software engineer, tech lead, and amateur pitmaster.
      </h1>
      <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        I’m Thiago, a Brazilian software engineer based in Austin, Texas. I’ve been building software since 2008, and
        for many years I’ve split my time between leading teams and keeping my hands on the code.
      </p>
      <div class="mt-6 flex gap-6">
        <NuxtLink
          v-for="link in socialLinks"
          :key="link.label"
          :to="link.href"
          target="_blank"
          rel="noreferrer noopener"
          class="group -m-1 p-1"
          :aria-label="`Follow on ${link.label}`"
        >
          <component
            :is="link.icon"
            class="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
          />
        </NuxtLink>
      </div>
    </div>
  </Container>

  <!--
    Departure from the template: its strip is a fixed, centred row clipped at both edges, so on a
    phone only one photo is fully visible and nothing can be scrolled. This one swipes, opens on the
    middle photo, and stops once the first or last photo is fully in view. The auto margins on the
    end photos centre the row when it fits the screen without scrolling.
  -->
  <div class="mt-16 sm:mt-20">
    <div
      data-photo-strip
      tabindex="0"
      aria-label="Photos"
      class="relative -my-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 py-4 [scrollbar-width:none] focus:outline-none sm:gap-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
    >
      <div
        v-for="(image, imageIndex) in photos"
        :key="image.src"
        :class="[
          'group relative w-64 flex-none snap-center overflow-hidden rounded-xl bg-zinc-100 first:ml-auto last:mr-auto sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
          rotations[imageIndex % rotations.length],
        ]"
      >
        <div class="aspect-9/10">
          <NuxtImg
            :src="image.src"
            :width="image.width"
            :height="image.height"
            alt=""
            sizes="256px sm:288px"
            class="absolute inset-0 h-full w-full object-cover saturate-[0.7] sepia-[0.25] contrast-[1.05]"
          />
        </div>

        <!--
          Caption. It lives INSIDE the photo because the strip clips its overflow — a tooltip
          positioned outside the image would be cut off. Shown on hover with a mouse; always shown on
          touch screens, which have no hover.
        -->
        <div
          class="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-zinc-900/80 to-transparent px-3 pt-8 pb-3 opacity-0 transition duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 pointer-coarse:translate-y-0 pointer-coarse:opacity-100 sm:px-4 sm:pb-4"
        >
          <p class="text-xs font-medium text-white sm:text-sm">{{ image.caption }}</p>
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
                <NuxtImg :src="role.logo" alt="" width="28" height="28" class="h-7 w-7" />
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
                  class="ml-auto text-xs text-zinc-500 dark:text-zinc-400"
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
          <AppButton
            :href="cvUrl"
            variant="secondary"
            class="group mt-6 w-full"
            target="_blank"
            rel="noreferrer noopener"
          >
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
import { resolveComponent } from 'vue';

// LinkedIn, Instagram, X — in that order. Thiago dropped the template's GitHub link.
const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thiagoalvesdev', icon: resolveComponent('IconLinkedIn') },
  { label: 'Instagram', href: 'https://www.instagram.com/thiagoalves.dev', icon: resolveComponent('IconInstagram') },
  { label: 'X', href: 'https://x.com/thiagoalves_dev', icon: resolveComponent('IconX') },
];

const { data: articles } = await useAsyncData('home-journal', () =>
  queryCollection('journal').order('date', 'DESC').all(),
);

const homeArticles = computed(() => (articles.value ?? []).slice(0, 3));

// Intrinsic dimensions are declared so the rendered size never depends on which srcset candidate
// the browser happens to pick — the template sets width/height on every image for the same reason.
const photos = [
  { src: '/images/photos/desk.jpg', caption: 'Where the magic happens', width: 1024, height: 768 }, // the setup
  { src: '/images/photos/image-2.jpg', caption: 'Olivia', width: 768, height: 1024 }, // cat
  { src: '/images/photos/image-1.jpg', caption: 'My accomplice', width: 1024, height: 768 }, // with Carol — centre
  { src: '/images/photos/image-4.jpg', caption: 'Jack', width: 768, height: 1024 }, // cat
  { src: '/images/photos/skull.jpg', caption: 'Salamanca', width: 1200, height: 1600 }, // desk detail
];

// Drive's /view URL opens the preview page; /uc?export=download starts the download directly.
const cvUrl = 'https://drive.google.com/uc?export=download&id=1rSQC8PJKNQvLmxBGmzOSrqVDv0fW6ged';

const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2'];

// Scrolls the photo strip so its middle photo is centred. Plain text, not a function's source,
// because it also ships as an inline script and the server build rewrites `document` in compiled
// code (to `void 0`), which would leave the inline copy inert.
const centrePhotoStrip = `(function () {
  var strip = document.querySelector('[data-photo-strip]');
  var photo = strip && strip.children[Math.floor(strip.children.length / 2)];
  if (photo) strip.scrollLeft = photo.offsetLeft - (strip.clientWidth - photo.clientWidth) / 2;
})();`;

// On a full page load the server-rendered strip is painted long before Vue hydrates, so centring it
// from onMounted alone makes it visibly jump. The inline script at the end of <body> runs before the
// first paint instead. On in-app navigation onMounted covers it, also before the browser paints.
useHead({ script: [{ key: 'centre-photo-strip', innerHTML: centrePhotoStrip, tagPosition: 'bodyClose' }] });

onMounted(() => new Function(centrePhotoStrip)());

const resume = [
  {
    company: 'Contracts Connected',
    title: 'Lead Software Engineer',
    logo: '/images/logos/contracts-connected.png',
    start: '2024',
    end: { label: 'Present', dateTime: new Date().getFullYear().toString() },
  },
  {
    company: 'Fresh Consulting',
    title: 'Senior Full-Stack Engineer',
    logo: '/images/logos/fresh-consulting.png',
    start: '2022',
    end: '2024',
  },
  {
    company: 'EyeCarePro',
    title: 'Senior Full-Stack Engineer',
    logo: '/images/logos/eyecarepro.png',
    start: '2021',
    end: '2022',
  },
  {
    company: 'Suno',
    title: 'Tech Lead',
    logo: '/images/logos/suno.png',
    start: '2020',
    end: '2021',
  },
  {
    company: 'Meu Câmbio',
    title: 'Tech Lead and Partner',
    logo: '/images/logos/meu-cambio.png',
    start: '2017',
    end: '2020',
  },
];

const labelOf = (value) => (typeof value === 'string' ? value : value.label);
const dateTimeOf = (value) => (typeof value === 'string' ? value : value.dateTime);
</script>
