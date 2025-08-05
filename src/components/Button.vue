<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
<button>{{ label }}</button>
</template>

<style scoped>
@reference 'tailwindcss';
@reference '../style.css';

button {
    @apply bg-cream text-indigo-900 font-bold text-3xl py-2 px-4 rounded-xl;
    @apply hover:bg-cream-dark;
    @apply transition duration-300 ease-in-out;
}
</style>