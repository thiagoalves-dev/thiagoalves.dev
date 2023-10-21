<template>
    <NuxtLayout>
        <div class="content-container text-center">
            <h1>Página não encontrada!</h1>

            <NuxtLink to="/" class="back">
                Voltar para a página inicial!
            </NuxtLink>
        </div>
    </NuxtLayout>
</template>

<style lang="scss" scoped>
a.back {
    @apply bg-transparent text-gray-600 font-semibold py-2 px-4 border rounded hover:border-gray-600;
}
</style>