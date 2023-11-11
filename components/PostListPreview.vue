<template>
    <div class="flex flex-col mb-4">
        <p class="text-gray-700 font-medium my-2">
            {{ formatDbDate(post.date, locale) }}
        </p>

        <h2 class="text-3xl mt-0">
            <NuxtLink :to="localePath(`/blog/posts/${slugFromPath(post._path)}`)" :title="`${$t('Read')} ${post.title}`"
                      class="text-gray-900 font-extrabold">
                {{ post.title }}
            </NuxtLink>
        </h2>

        <p class="mb-4 mt-0">{{ post.description }}</p>

        <NuxtLink :to="localePath(`/blog/posts/${slugFromPath(post._path)}`)" :title="`${$t('Read')} ${post.title}`"
                  class="simple cube-palette-1 tracking-wide mb-2 hover:underline">
            {{ $t('Read') }} +
        </NuxtLink>
    </div>
</template>

<script setup>
import {formatDbDate} from "~/helpers/dates.js";
import {slugFromPath} from "~/helpers/posts.js";

const {locale} = useI18n();
const localePath = useLocalePath();

defineProps({
    post: {
        type: Object,
        required: true
    }
})
</script>