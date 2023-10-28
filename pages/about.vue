<template>
    <div class="content-container text-center">
        <MetaTags :title="$t('About')" :description="$t('aboutPageDescription')"/>

        <h1>{{ $t('About') }}</h1>

        <ContentDoc :path="`about/${locale}`" :head="false"/>

        <div class="flex items-center mt-8">
            <div class="w-full md:w-1/2 mx-auto">
                <AuthorCard/>
            </div>
        </div>
    </div>
</template>

<script setup>
const {locale} = useI18n();
</script>