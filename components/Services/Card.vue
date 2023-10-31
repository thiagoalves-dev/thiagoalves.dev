<template>
    <div class="bg-white rounded-lg p-6 pt-2 w-full md:flex shadow-lg">
        <div class="text-center">
            <span class="w-3 h-3 inline-block align-middle rounded-full mx-auto" :class="`bg-${color}-300`"></span>
            <h2 class="text-lg text-xl mt-0 mb-1">
                {{ title }}
            </h2>
            <hr class="mt-3 mb-3">
            <div class="text-gray-600">
                {{ description }}
                <ul class="list-none mb-0">
                    <li v-for="feature in features" class="border-t py-2">{{ feature }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    color: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    features: {
        type: Array,
        required: true
    }
});
</script>