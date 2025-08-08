<script setup lang="ts">
import { IconX, IconArrowsDiagonalMinimize } from '@tabler/icons-vue';

const closeWindow = () => {
  window.ipcRenderer.closeWindow();
};

const minimizeWindow = () => {
  window.ipcRenderer.minimizeWindow();
};
</script>

<template>
<nav>
  <div @click="closeWindow"><IconX /></div>
  <div @click="minimizeWindow"><IconArrowsDiagonalMinimize /></div>
</nav>
</template>

<style scoped>
@reference 'tailwindcss';

nav {
    @apply flex fixed flex-row-reverse justify-start items-center top-0 z-1;
    @apply w-full h-10 gap-1;
    @apply bg-gradient-to-r from-purple-500/10 to-pink-500/30;
    border: 6px solid rgb(13, 27, 42);
    app-region: drag;
}

nav div {
    @apply cursor-pointer;
    app-region: no-drag;
}
</style>