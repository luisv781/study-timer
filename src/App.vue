<script setup lang="ts">
import { ref } from 'vue';
import TitleBar from './components/TitleBar.vue';
import Timer from './components/Timer.vue';
import Button from './components/Button.vue';

const timerRef = ref<any>();

const startTimer = () => {
    if (!timerRef.value) return;
    timerRef.value.minutes = 25;
    timerRef.value.start();
}

const pauseTimer = () => {
    if (!timerRef.value) return;
    timerRef.value.pause();
}

const triggerTimer = () => {
    if (!timerRef.value) return;
    if (!timerRef.value.started)
        startTimer()
    else pauseTimer();
}

const resetTimer = () => {
    if (!timerRef.value) return;
    timerRef.value.reset();
}

function getLabel(): string  {
    if (!timerRef.value) return 'Start';
    if (!timerRef.value.started)
        return 'Start'
    else return (timerRef.value.paused) ? 'Start' : 'Pause';
}
</script>

<template>
    <TitleBar />
    <Timer ref="timerRef" />
    <div id="timerActions">
        <Button :label="getLabel()" @click="() => triggerTimer()" />
        <Button label="Reset" @click="() => resetTimer()" />
    </div>
</template>

<style scoped>
@reference 'tailwindcss';

#timerActions {
    @apply flex fixed justify-center bottom-8 gap-12;
}
</style>
