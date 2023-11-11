<template>
    <nav id="js-nav-menu" class="nav-menu hidden lg:hidden">
        <ul class="my-0">
            <li class="pl-4">
                <NuxtLink :to="localePath('/about')" :title="`${$t('About')} | ${website.name}`"
                          class="nav-menu__item cube-palette-2 hover:cube-palette-3"
                          active-class="active cube-palette-3">
                    {{ $t('About') }}
                </NuxtLink>
            </li>
            <li class="pl-4">
                <NuxtLink :to="localePath('/how-i-can-help')" :title="`${$t('How I can help')} | ${website.name}`"
                          class="nav-menu__item cube-palette-2 hover:cube-palette-3"
                          active-class="active cube-palette-3">
                    {{ $t('How I can help') }}
                </NuxtLink>
            </li>
            <li class="pl-4">
                <NuxtLink :to="localePath('/blog')" :title="`${$t('Blog')} | ${website.name}`"
                          class="nav-menu__item cube-palette-2 hover:cube-palette-3"
                          active-class="active cube-palette-3">
                    {{ $t('Blog') }}
                </NuxtLink>
            </li>
            <li class="pl-4 flex items-center justify-center">
                <a :href="website.author.instagramUrl" title="Instagram"
                   class="inline-block mr-4 opacity-50 hover:opacity-75" target="_blank">
                    <img class="h-4 mt-1" src="~/assets/images/social/instagram.png" alt="">
                </a>
                <a :href="website.author.linkedinUrl" title="LinkedIn"
                   class="inline-block mr-4 opacity-50 hover:opacity-75" target="_blank">
                    <img class="h-4" src="~/assets/images/social/linkedin.png" alt="">
                </a>
                <a :href="website.author.twitterUrl" title="Twitter" class="inline-block opacity-50 hover:opacity-75"
                   target="_blank">
                    <img class="h-3 mt-1" src="~/assets/images/social/twitter.png" alt="">
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import website from "~/data/website.js";

const localePath = useLocalePath();
</script>