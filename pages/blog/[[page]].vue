<template>
    <div class="content-container">
        <MetaTags :title="$t('Blog')" :keywords="$t('Blog')" :description="$t('blogPageDescription')"/>

        <h1>{{ $t('Blog') }}</h1>

        <hr class="border-b my-6">

        <div v-for="(post, index) in posts">
            <PostListPreview :post="post"/>
            <hr v-if="(postsPerPage - index) > 1" class="border-b my-6">
        </div>

        <nav v-if="amountOfPages > 1" class="flex text-base my-8">
            <NuxtLink v-if="(currentPage > 1)" :to="localePath(`/blog/${previousPage}`)" :title="$t('Previous Page')"
                      class="bg-cube-palette-1-200 hover:bg-white cube-palette-3 rounded mr-3 px-5 py-3">
                &LeftArrow;
            </NuxtLink>

            <NuxtLink v-for="page in amountOfPages" :key="page" :to="localePath(`/blog/${page}`)"
                      :title="`${$t('Go to the page')} ${page}`"
                      class="bg-cube-palette-1-200 hover:bg-white cube-palette-3 rounded mr-3 px-5 py-3"
                      :class="{'bg-white': page === currentPage}">
                {{ page }}
            </NuxtLink>

            <NuxtLink v-if="(currentPage < amountOfPages)" :to="localePath(`/blog/${nextPage}`)"
                      :title="$t('Next Page')"
                      class="bg-cube-palette-1-200 hover:bg-white cube-palette-3 rounded mr-3 px-5 py-3">
                &RightArrow;
            </NuxtLink>
        </nav>
    </div>
</template>

<script setup>
import {useRoute} from "#app";

const route = useRoute();
const {locale} = useI18n();
const localePath = useLocalePath();

const postsPerPage = 5;
const currentPage = parseInt(route.params?.page) || 1;
const previousPage = currentPage - 1;
const nextPage = currentPage + 1;

const totalAmountOfPosts = (
    await useAsyncData('totalAmountOfPosts', () =>
        queryContent('posts', locale.value).count()
    )
).data.value;

const amountOfPages = Math.ceil(totalAmountOfPosts / postsPerPage);

const posts = (
    await useAsyncData('posts', () =>
        queryContent('posts', locale.value)
            .sort({date: -1})
            .skip((currentPage - 1) * 5)
            .limit(5)
            .find()
    )
).data.value;

</script>