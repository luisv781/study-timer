<script setup lang="ts">
import { ref } from 'vue';
import Timer from './components/Timer.vue';
import Button from './components/Button.vue';

const timerRef = ref<any>();

const startTimer = () => {
    if (timerRef.value) {
        timerRef.value.minutes = 15;
        timerRef.value.start();
    }
}
</script>

<template>
    <Timer ref="timerRef" />
    <div id="buttonBar">
        <Button label="Start" @click="() => startTimer()" />
        <Button label="Pause" @click="() => console.log('Pause clicked')" />
        <Button label="Reset" @click="() => console.log('Reset clicked')" />
    </div>
</template>

<style scoped>
@reference 'tailwindcss';

#buttonBar {
    @apply flex fixed justify-center bottom-8 gap-12;
}
</style>
