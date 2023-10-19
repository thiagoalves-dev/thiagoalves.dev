<template>
    <div class="content-container">
        <MetaTags title="Blog" keywords="Blog"
                  description="Artigos onde compartilho um pouco do meu conhecimento através de dicas e exemplos práticos."/>

        <h1>Blog</h1>

        <hr class="border-b my-6">

        <div v-for="(post, index) in posts">
            <PostListPreview :post="post"/>
            <hr v-if="(postsPerPage - index) > 1" class="border-b my-6">
        </div>

        <nav v-if="amountOfPages > 1" class="flex text-base my-8">
            <NuxtLink v-if="(currentPage > 1)" :to="`/blog/${previousPage}`" title="Página Anterior"
                      class="bg-cube-palette-1-200 hover:bg-white cube-palette-3 rounded mr-3 px-5 py-3">
                &LeftArrow;
            </NuxtLink>

            <NuxtLink v-for="page in amountOfPages" :key="page" :to="`/blog/${page}`"
                      :title="`Ir para página ${page}`"
                      class="bg-cube-palette-1-200 hover:bg-white cube-palette-3 rounded mr-3 px-5 py-3"
                      :class="{'bg-white': page === currentPage}">
                {{ page }}
            </NuxtLink>

            <NuxtLink v-if="(currentPage < amountOfPages)" :to="`/blog/${nextPage}`" title="Próxima Página"
                      class="bg-cube-palette-1-200 hover:bg-white cube-palette-3 rounded mr-3 px-5 py-3">
                &RightArrow;
            </NuxtLink>
        </nav>
    </div>
</template>

<script setup>
import {useRoute} from "#app";

const route = useRoute();

const postsPerPage = 5;
const currentPage = parseInt(route.params?.page) || 1;
const previousPage = currentPage - 1;
const nextPage = currentPage + 1;

const totalAmountOfPosts = (
    await useAsyncData('totalAmountOfPosts', () =>
        queryContent('posts').count()
    )
).data.value;

const amountOfPages = Math.ceil(totalAmountOfPosts / postsPerPage);

const posts = (
    await useAsyncData('posts', () =>
        queryContent('posts')
            .sort({date: -1})
            .skip((currentPage - 1) * 5)
            .limit(5)
            .find()
    )
).data.value;

</script>