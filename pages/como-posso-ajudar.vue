<template>
    <div class="text-center">
        <MetaTags title="Como posso te ajudar" keywords="Mentoria, Consultoria"
                  description="Com mais de 15 anos de experiência com Desenvolvimento de Sistemas, pude acumular uma quanlidade considerável de conhecimento que adoraria compartilhar com pessoas e empresas."/>

        <h1>Como posso te ajudar</h1>

        <div class="content-container">
            <p>
                Com mais de 15 anos de experiência com Desenvolvimento de Sistemas, pude acumular uma quanlidade
                considerável de conhecimento que adoraria compartilhar com pessoas e empresas.
            </p>

            <p>
                Abaixo você pode ver os diferentes serviços que eu ofereço. Agende uma conversa comigo para que eu possa
                saber mais sobre seus projetos, dúvidas e etc.
            </p>
        </div>

        <p class="my-10">
            <a href="#schedule-a-call"
               class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent hover:no-underline rounded">
                Quero agendar uma conversa!
            </a>
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 w-2/3 mx-auto">
            <ServicesForCompanies/>
            <ServicesForDevelopers/>
        </div>

        <CalendlyInlineWidget id="schedule-a-call" v-bind="calendlyOptions"/>

        <p>
            Para esclarecer qualquer dúvida, basta entrar em contato através de meu
            <a :href="website.author.instagramUrl" target="_blank">Instagram</a> ou
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