<template>
    <nav id="js-nav-menu" class="nav-menu hidden lg:hidden">
        <ul class="my-0">
            <li class="pl-4">
                <NuxtLink :title="`${website.name} | Sobre`" to="/sobre"
                          class="nav-menu__item cube-palette-2 hover:cube-palette-3">
                    Sobre
                </NuxtLink>
            </li>
            <li class="pl-4">
                <NuxtLink :title="`${website.name} | Como posso ajudar`" to="/como-posso-ajudar"
                          class="nav-menu__item cube-palette-2 hover:cube-palette-3">
                    Como posso ajudar
                </NuxtLink>
            </li>
            <li class="pl-4">
                <NuxtLink :title="`${website.name} | Blog`" to="/blog"
                          class="nav-menu__item cube-palette-2 hover:cube-palette-3">
                    Blog
                </NuxtLink>
            </li>
            <li class="pl-4 flex items-center justify-center">
                <a title="Instagram" :href="website.author.instagramUrl"
                   class="inline-block mr-4 opacity-50 hover:opacity-75" target="_blank">
                    <img class="h-4 mt-1" src="~/assets/images/social/instagram.png" alt="">
                </a>
                <a title="LinkedIn" :href="website.author.linkedinUrl"
                   class="inline-block mr-4 opacity-50 hover:opacity-75"
                   target="_blank">
                    <img class="h-4" src="~/assets/images/social/linkedin.png" alt="">
                </a>
                <a title="Twitter" :href="website.author.twitterUrl" class="inline-block opacity-50 hover:opacity-75"
                   target="_blank">
                    <img class="h-3 mt-1" src="~/assets/images/social/twitter.png" alt="">
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import {setRouteActiveClasses} from "~/helpers/navigation.js";
import website from "~/data/website.js";

onMounted(() => setRouteActiveClasses());
</script>