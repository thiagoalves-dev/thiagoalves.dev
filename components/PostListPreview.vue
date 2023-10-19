<template>
    <div class="flex flex-col mb-4">
        <p class="text-gray-700 font-medium my-2">
            {{ dateDbToPtBr(post.date) }}
        </p>

        <h2 class="text-3xl mt-0">
            <NuxtLink :to="`/blog${post._path}`" :title="`Read mais - ${post.title}`"
                      class="text-gray-900 font-extrabold">
                {{ post.title }}
            </NuxtLink>
        </h2>

        <p class="mb-4 mt-0">{{ post.description }}</p>

        <NuxtLink :to="`/blog${post._path}`" :title="`Read mais - ${post.title}`"
                  class="simple cube-palette-1 tracking-wide mb-2 hover:underline">
            Ler +
        </NuxtLink>
    </div>
</template>

<script setup>
import {dateDbToPtBr} from "~/helpers/dates.js";

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})
</script>