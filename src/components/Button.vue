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
    @apply bg-button text-indigo-900 font-bold text-3xl py-2 px-4 rounded-xl;
    @apply hover:bg-button-hover;
    @apply transition ease-in-out;
    @apply relative;
}

button:active {
    @apply translate-y-2;
}

button::before {
    @apply absolute h-full w-full top-0 left-0 -z-10 content-[''];
    @apply bg-button-dark rounded-xl translate-y-2 transition ease-in-out;
}
button:active::before {
    @apply translate-y-0;
}
</style>