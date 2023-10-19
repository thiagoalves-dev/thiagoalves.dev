<template>
    <main class="content-container">
        <MetaTags :title="post.title" :keywords="post.keywords" :description="post.description"/>

        <img v-if="post.coverImage" :src="post.coverImage" :alt="`${post.title} imagem de capa`" class="mb-2">

        <h1 class="leading-none mb-2">{{ post.title }}</h1>

        <p class="text-gray-700 text-xl md:mt-0">{{ website.author.name }} • {{ dateDbToPtBr(post.date) }}</p>

        <div class="border-b border-cube-palette-1-200 mb-10 pb-4">
            <ContentDoc :path="`posts/${$route.params.slug}`"/>
        </div>

        <nav class="flex justify-between text-sm md:text-base mb-10">
            <div class="mr-1">
                <NuxtLink v-if="previousPost" :to="`/blog${previousPost._path}`" class="cube-palette-2"
                          :title="`Post anterior: ${previousPost.title}`">
                    &LeftArrow; {{ previousPost.title }}
                </NuxtLink>
            </div>

            <div class="ml-1">
                <NuxtLink v-if="nextPost" :to="`/blog${nextPost._path}`" class="cube-palette-2"
                          :title="`Próximo post: ${nextPost.title}`">
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
            Comente abaixo o que você achou deste post, se ficou com alguma dúvida ou se gostaria de sugerir algum
            assunto.
        </p>

        <PostComments/>
    </main>
</template>
<script setup>
import {useRoute, useRouter} from "#app";
import website from "~/data/website.js";
import {dateDbToPtBr} from "~/helpers/dates.js";

const route = useRoute();
const router = useRouter();

const post = (
    await useAsyncData('posts', () =>
        queryContent('posts', route.params.slug.toString()).findOne()
    )
).data.value;

if (post === null) {
    router.push({path: '/404'});
}

const [previousPost, nextPost] = (
    await useAsyncData('surroundPosts', () =>
        queryContent('posts')
            .only(['_path', 'title'])
            .sort({date: -1})
            .findSurround(post._path)
    )
).data.value;

</script>