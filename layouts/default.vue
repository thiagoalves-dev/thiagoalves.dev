<template>
    <Body class="bg-cube-palette-1-100 text-gray-800 leading-normal font-sans">
    <div class="flex flex-col justify-between min-h-screen">
        <NavMenu/>
        <main role="main" class="flex-auto w-full max-w-6xl mx-auto py-16 px-6">
            <slot/>
        </main>
        <Footer/>
    </div>
    </Body>
</template>