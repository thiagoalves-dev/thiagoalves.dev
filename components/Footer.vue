<template>
    <footer class="text-center text-sm mt-12 py-2" role="contentinfo">
        <ul class="justify-center list-none">
            <li>
                <a class="text-gray-600" :href="`mailto:${website.author.contactEmail}`">
                    {{ website.author.contactEmail }}
                </a>
            </li>
            <li class="mt-3 flex items-center justify-center">
                <a :href="website.author.githubUrl" title="Github" class="inline-block mr-4 opacity-50 hover:opacity-75"
                   target="_blank">
                    <img src="~/assets/images/social/github.min.svg" alt="" class="h-4 mt-1"/>
                </a>
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
        <ul class="flex flex-col md:flex-row text-xs justify-center list-none mt-8">
            <li class="md:mr-2">
                &copy; {{ website.companyName }} {{ currentYear }}.
            </li>

            <li>
                {{ $t('Developed with') }}
                <a href="https://nuxt.com" class="simple cube-palette-1 hover:underline" target="_blank"
                   title="Jigsaw by Tighten">Nuxt</a>
                {{ $t('and') }}
                <a href="https://tailwindcss.com" class="simple cube-palette-1 hover:underline" target="_blank"
                   title="Tailwind CSS, a utility-first CSS framework">Tailwind CSS</a>.
            </li>
        </ul>
    </footer>
</template>

<script setup>
import website from "~/data/website.js";

const currentYear = (new Date).getFullYear();
</script>