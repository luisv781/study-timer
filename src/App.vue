<script setup lang="ts">
import { ref } from 'vue';
import TitleBar from './components/TitleBar.vue';
import Timer from './components/Timer.vue';
import Button from './components/Button.vue';

const timerRef = ref<any>();

let minutes = 25;

const startTimer = () => {
    if (!timerRef.value || timerRef.value.started) return;
    timerRef.value.start(minutes);
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
    updateTimer();
}

const getLabel = () => {
    if (!timerRef.value) return 'Start';
    if (!timerRef.value.started)
        return 'Start'
    else return (timerRef.value.paused) ? 'Resume' : 'Pause';
}

const updateTimer = (minutesToAdd?: number) => {
    if (!timerRef.value) return;
    if (!timerRef.value.started) {
        if (minutesToAdd && minutes + minutesToAdd > 0 && minutes + minutesToAdd <= 60)
            minutes += minutesToAdd;
        timerRef.value.label = `${minutes.toString().padStart(2, "0")}:00`;
    }
}
</script>

<template>
    <TitleBar />
    <Timer ref="timerRef" />
    <div id="buttonsContainer">
        <div id="timeModifiers">
            <Button label="+10" @click="updateTimer(10)" />
            <Button label="+5" @click="updateTimer(5)" />
            <Button label="-5" @click="updateTimer(-5)" />
        </div>
        <div id="timerActions">
            <Button :label="getLabel()" @click="() => triggerTimer()" />
            <Button label="Reset" @click="() => resetTimer()" />
        </div>
    </div>
</template>

<style scoped>
@reference 'tailwindcss';

#buttonsContainer {
    @apply flex flex-col gap-4
}

#buttonsContainer div {
    @apply flex justify-center;
}
#timeModifiers {
    @apply gap-4;
}
#timeModifiers button {
    @apply text-xl py-1 px-2;
}

#timerActions {
    @apply gap-12;
}
</style>
