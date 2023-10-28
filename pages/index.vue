<template>
    <div class="content-container">
        <MetaTags/>
        <div class="w-full mb-6" v-for="(post, index) in featuredPosts">
            <img v-if="index === 0" :src="post.coverImage || website.defaultBanner" :alt="post.title" class="mb-6">

            <p class="text-gray-700 font-medium my-2">
                {{ formatDbDate(post.date, locale) }}
            </p>

            <h2 class="text-3xl mt-0">
                <NuxtLink :to="localePath(`/blog/posts/${slugFromPath(post._path)}`)"
                          :title="`${$t('Read')} ${post.title}`" class="text-gray-900 font-extrabold">
                    {{ post.title }}
                </NuxtLink>
            </h2>

            <p class="mt-0 mb-4">{{ post.description }}</p>

            <NuxtLink :to="localePath(`/blog/posts/${slugFromPath(post._path)}`)" :title="`${$t('Read')} ${post.title}`"
                      class="simple cube-palette-1 tracking-wide mb-4 hover:underline">
                {{ $t('Read') }} +
            </NuxtLink>
        </div>

        <hr class="border-b my-6">
    </div>
</template>

<script setup>
import website from "~/data/website.js";
import {formatDbDate} from "~/helpers/dates.js";
import {slugFromPath} from "~/helpers/posts.js";

const {locale} = useI18n();
const localePath = useLocalePath();

const featuredPosts = (
    await useAsyncData('featuredPosts', () =>
        queryContent('posts', locale.value)
            .where({featured: true})
            .sort({date: -1})
            .find()
    )
).data.value;

</script>