<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>
    <footer class="bg-gray-800 text-white p-4 text-center">
      <p>&copy; {{ new Date().getFullYear() }} Thiago Alves. All rights reserved.</p>
    </footer>
  </div>
</template>
