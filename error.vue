<template>
    <NuxtLayout>
        <MetaTags/>
        <div class="content-container text-center">
            <h1>{{ $t('Page not found') }}!</h1>

            <NuxtLink :to="localePath('/')" class="back">
                {{ $t('Go back to the home page') }}
            </NuxtLink>
        </div>
    </NuxtLayout>
</template>

<script setup>
const localePath = useLocalePath();
</script>

<style lang="scss" scoped>
a.back {
    @apply bg-transparent text-gray-600 font-semibold py-2 px-4 border rounded hover:border-gray-600;
}
</style>