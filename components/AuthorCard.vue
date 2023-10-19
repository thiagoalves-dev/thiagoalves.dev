<template>
    <div class="bg-white rounded-lg p-6 w-full md:flex shadow-lg">
        <img class="h-16 w-16 rounded-full mx-auto md:h-24 md:w-24 md:mx-0 md:mr-6"
             :src="website.author.picture" :alt="website.author.name">
        <div class="text-center md:text-left">
            <h2 class="text-lg mb-1">{{ website.author.name }}</h2>
            <div class="text-gray-600 text-xs">
                {{ website.author.profession }}, no mercado de desenvolvimento de software desde 2011. Especialista em
                PHP, Laravel e Vue.js.
            </div>
        </div>
    </div>
</template>

<script setup>
import website from "~/data/website.js";
</script>