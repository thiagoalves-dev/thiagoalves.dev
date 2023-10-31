<template>
    <div class="text-center">
        <MetaTags :title="$t('How I can help')" :description="$t('howICanHelpDescription')"
                  :keywords="$t('howICanHelpKeywords')"/>

        <h1>{{ $t('How I can help') }}</h1>

        <div class="content-container">
            <p>{{ $t('howICanHelpDescription') }}</p>
            <p>{{ $t('howICanHelpDescriptionTwo') }}</p>
        </div>

        <p class="my-10">
            <a href="#schedule-a-call"
               class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent hover:no-underline rounded">
                {{ $t('I want to scheddule a conversation!') }}
            </a>
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 w-2/3 mx-auto">
            <ServicesForCompanies/>
            <ServicesForDevelopers/>
        </div>

        <CalendlyInlineWidget id="schedule-a-call" v-bind="calendlyOptions"/>

        <p>
            {{ $t('In case you have any questions, please reach out to me on') }}
            <a :href="website.author.instagramUrl" target="_blank">Instagram</a>
            {{ $t('or') }}
            <a :href="website.author.linkedinUrl" target="_blank">LinkedIn</a>.
        </p>
    </div>
</template>

<script setup>
import website from "~/data/website.js";

const calendlyOptions = {
    url: website.calendly.url
};
</script>