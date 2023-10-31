<template>
    <main class="content-container">
        <MetaTags :title="post.title" :keywords="post.keywords" :description="post.description"/>

        <img v-if="post.coverImage" :src="post.coverImage" :alt="`${post.title}`" class="mb-2">

        <h1 class="leading-none mb-2">{{ post.title }}</h1>

        <p class="text-gray-700 text-xl md:mt-0">{{ website.author.name }} • {{ formatDbDate(post.date, locale) }}</p>

        <div class="border-b border-cube-palette-1-200 mb-10 pb-4">
            <ContentDoc :path="postPath" :head="false"/>
        </div>

        <nav class="flex justify-between text-sm md:text-base mb-10">
            <div class="mr-1">
                <NuxtLink v-if="previousPost" :to="localePath(`/blog/posts/${slugFromPath(previousPost._path)}`)"
                          class="cube-palette-2" :title="`${$t('Previous post')}: ${previousPost.title}`">
                    &LeftArrow; {{ previousPost.title }}
                </NuxtLink>
            </div>

            <div class="ml-1">
                <NuxtLink v-if="nextPost" :to="localePath(`/blog/posts/${slugFromPath(nextPost._path)}`)"
                          class="cube-palette-2" :title="`${$t('Next post')}: ${nextPost.title}`">
                    {{ nextPost.title }} &RightArrow;
                </NuxtLink>
            </div>
        </nav>

        <div class="flex items-center">
            <div class="w-full md:w-1/2 mx-auto">
                <AuthorCard/>
            </div>
        </div>

        <p class="text-gray-700 text-xs text-center">
            {{
                $t('Share your thoughts about this post in the comments below, in case you have any questions or would like to suggest a topic.')
            }}
        </p>

        <PostComments/>
    </main>
</template>
<script setup>
import {useRoute, useRouter} from "#app";
import {formatDbDate} from "~/helpers/dates.js";
import {slugFromPath} from "~/helpers/posts.js";
import website from "~/data/website.js";

const route = useRoute();
const router = useRouter();

const {locale} = useI18n();
const localePath = useLocalePath();

const post = (
    await useAsyncData('posts', () =>
        queryContent('posts', locale.value, route.params.slug.toString()).findOne()
    )
).data.value;

if (post === null) {
    router.push({path: '/404'});
}

const [previousPost, nextPost] = (
    await useAsyncData('surroundPosts', () =>
        queryContent('posts', locale.value)
            .only(['_path', 'title'])
            .sort({date: -1})
            .findSurround(post._path)
    )
).data.value;

route.meta.nuxtI18n = {
    'pt-br': {slug: post.ptBrSlug || slugFromPath(post._path)},
    'en-us': {slug: post.enUsSlug || slugFromPath(post._path)},
};

const postPath = `posts/${locale.value}/${route.params.slug}`;
</script>