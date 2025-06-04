<template>
  <div class="flex flex-col items-center justify-center min-h-screen py-16 px-4">
    <h1 class="text-6xl font-bold text-red-500 mb-4">{{ error.statusCode }}</h1>
    <h2 class="text-2xl mb-8">{{ error.message }}</h2>
    <button 
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="handleError"
    >
      Back to Home
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>
