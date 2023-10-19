<template>
  <div class="content-container">
    <MetaTags/>
    <div class="w-full mb-6" v-for="(post, index) in featuredPosts">
      <img v-if="index === 0" :src="post.coverImage || website.defaultBanner"
           alt="Home page cover image" class="mb-6">

      <p class="text-gray-700 font-medium my-2">
        {{ dateDbToPtBr(post.date) }}
      </p>

      <h2 class="text-3xl mt-0">
        <NuxtLink :to="`/blog${post._path}`" :title="`Leia ${post.title}`"
                  class="text-gray-900 font-extrabold">
          {{ post.title }}
        </NuxtLink>
      </h2>

      <p class="mt-0 mb-4">{{ post.description }}</p>

      <NuxtLink :to="`/blog${post._path}`" :title="`Leia ${post.title}`"
                class="simple cube-palette-1 tracking-wide mb-4 hover:underline">
        Ler +
      </NuxtLink>
    </div>

    <hr class="border-b my-6">
  </div>
</template>

<script setup>
import website from "~/data/website.js";
import {dateDbToPtBr} from "~/helpers/dates.js";

const featuredPosts = (
    await useAsyncData('featuredPosts', () =>
        queryContent('posts')
            .where({featured: true})
            .sort({date: -1})
            .find()
    )
).data.value;
</script>