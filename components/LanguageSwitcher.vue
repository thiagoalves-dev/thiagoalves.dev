<template>
    <div v-if="showSwitcher" class="fixed right-3 bottom-3 leading-4">
        <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)"
                  class="inline-block bg-white p-2 shadow-xl rounded-full z-1">
            <img :src="`/images/flags/${locale.flag}`" class="max-h-5"/>
        </NuxtLink>
    </div>
</template>

<script setup>
const {locale, locales} = useI18n();
const switchLocalePath = useSwitchLocalePath();
const route = useRoute();

const excludedRoutes = ['american-visa___pt-br'];

const showSwitcher = computed(() => {
    return !excludedRoutes.includes(route.name);
});

const availableLocales = computed(() => {
    return locales.value.filter(i => i.code !== locale.value)
});
</script>