<template>
    <Head>
        <Meta charset="utf-8"/>
        <Meta http-equiv="x-ua-compatible" content="ie=edge"/>
        <Meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <Meta name="apple-mobile-web-app-title" :content="pageTitle"/>

        <Meta name="description" :content="description || website.description"/>
        <Meta name="keywords" :content="pageKeywords"/>

        <Meta property="og:type" :content="type"/>
        <Meta property="og:url" :content="url.href"/>
        <Meta property="og:site_name" :content="website.name"/>
        <Meta property="og:description" :content="description || website.description"/>
        <Meta property="og:title" :content="pageTitle"/>
        <Meta property="og:image" :content="coverImage || defaultImage"/>
        <Meta name="twitter:card" content="summary_large_image"/>
        <Meta name="twitter:image:alt" :content="description || website.description"/>

        <Link rel="home" :href="url.origin"/>
        <Link rel="canonical" :href="url.origin"/>
        <Link rel="icon" href="/images/programming-logo-100.png" type="image/x-icon"/>
        <Link rel="shortcut icon" href="/images/programming-logo-100.png"/>

        <Title>{{ pageTitle }}</Title>
    </Head>
</template>

<script setup>

import website from "~/data/website.js";

const props = defineProps({
    type: {
        type: String,
        default: 'website'
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    keywords: {
        type: String
    },
    coverImage: {
        type: String
    }
});

const url = useRequestURL();

const defaultImage = url.origin + website.defaultBanner;

const pageTitle = (props.title ? `${props.title} | ` : '') + website.name;

const pageKeywords = (props.keywords ? `${props.keywords}, ` : '') + website.keywords;

</script>