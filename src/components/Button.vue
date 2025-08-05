<script setup lang="ts">
defineProps<{
    label: string;
}>();
</script>

<template>
<button>{{ label }}</button>
</template>

<style scoped>
@reference 'tailwindcss';

button {
    @apply bg-amber-300 text-white font-bold text-3xl py-4 px-6 rounded-xl;
    @apply hover:bg-amber-500;
    @apply transition duration-300 ease-in-out;
}
</style>