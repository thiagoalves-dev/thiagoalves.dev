<template>
    <div class="calendly-inline-widget" data-url="https://calendly.com/thiagoalves-dev/lets-talk"></div>
</template>

<style lang="scss">
.calendly-inline-widget {
    width: 100%;
    height: 1200px;

    @media (min-width: 1052px) {
        height: 720px;
    }

    @media (max-width: 698px) {
        margin-top: 30px;
    }
}
</style>