<template>
    <div>
        <header class="flex items-center shadow bg-white border-b h-24 py-4" role="banner">
            <div class="container flex items-center max-w-8xl mx-auto px-4 lg:px-8">
                <div class="flex items-center">
                    <NuxtLink :to="localePath('/')" :title="`${$t('Home page')} | ${website.name}`"
                              class="inline-flex items-center simple cube-palette-1">
                        <img class="h-8 md:h-10 mr-3" :src="website.logo" :alt="`${website.name} logo`"/>
                        THIAGO ALVES .DEV
                    </NuxtLink>
                </div>

                <div id="vue-search" class="flex flex-1 justify-end items-center">
                    <nav class="hidden lg:flex items-center justify-center text-lg w-full">
                        <NuxtLink :to="localePath('/about')" :title="`${$t('About')} | ${website.name}`"
                                  class="nma ml-6 cube-palette-2" active-class="active cube-palette-3">
                            {{ $t('About') }}
                        </NuxtLink>
                        <NuxtLink :to="localePath('/how-i-can-help')"
                                  :title="`${$t('How I can help')} | ${website.name}`" class="nma ml-6 cube-palette-2"
                                  active-class="active cube-palette-3">
                            {{ $t('How I can help') }}
                        </NuxtLink>
                        <NuxtLink :to="localePath('/blog')" :title="`${$t('Blog')} | ${website.name}`"
                                  class="nma ml-6 cube-palette-2" active-class="active cube-palette-3">
                            {{ $t('Blog') }}
                        </NuxtLink>
                        <NuxtLink v-if="locale === 'pt-br'" :to="localePath('/american-visa')"
                                  :title="`${$t('American VISA')} | ${website.name}`" class="nma ml-6 cube-palette-2"
                                  active-class="active cube-palette-3">
                            {{ $t('American VISA') }}
                        </NuxtLink>
                    </nav>
                    <nav class="hidden lg:flex items-center justify-end text-lg w-1/3">
                        <a :href="website.author.instagramUrl" title="Instagram"
                           class="mr-4 opacity-50 hover:opacity-75" target="_blank">
                            <img class="h-4 mt-1" src="~/assets/images/social/instagram.png" alt="">
                        </a>
                        <a :href="website.author.linkedinUrl" title="LinkedIn" class="mr-4 opacity-50 hover:opacity-75"
                           target="_blank">
                            <img class="h-4" src="~/assets/images/social/linkedin.png" alt="">
                        </a>
                        <a :href="website.author.twitterUrl" title="Twitter" class="opacity-50 hover:opacity-75"
                           target="_blank">
                            <img class="h-3 mt-1" src="~/assets/images/social/twitter.png" alt="">
                        </a>
                    </nav>

                    <NavToggleMenu/>
                </div>
            </div>
        </header>
        <NavResponsiveMenu/>
    </div>
</template>

<script setup>
import website from "~/data/website.js";

const localePath = useLocalePath();
const {locale} = useI18n();
</script>