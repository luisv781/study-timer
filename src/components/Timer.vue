<script setup lang="ts">
import { ref } from 'vue';

const label = ref("25:00");
const minutes = ref(25);

let timer: NodeJS.Timeout | undefined;
let targetTime: Date;

let lastPause: Date;
const started = ref(false);
const paused = ref(false);

defineExpose({
    start: () => start(),
    pause: () => pause(),
    reset: () => reset(),
    label: label,
    minutes: minutes,
    started: started,
    paused: paused
});

function updateTimer(diff: number) {
    const minutes = Math.floor(diff / 60).toString().padStart(2, '0');
    const seconds = Math.floor(diff % 60).toString().padStart(2, '0');
    label.value = `${minutes}:${seconds}`;
}

function getDiff(targetTime: Date): number {
    // Get the difference in seconds between the target time and current time
    const now = new Date();
    return Math.floor((targetTime.getTime() - now.getTime()) / 1000);
}

async function start() {
    if (started.value) return;
    started.value = true;

    // Calculate the target time before starting the timer
    let now = new Date();
    targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + minutes.value, now.getSeconds());
    let diff = getDiff(targetTime);
    updateTimer(diff);

    timer = setInterval(() => {
        // If not paused, calculate the time remaining until
        // reaching the target time and update the timer
        if (paused.value) return;
            diff = getDiff(targetTime);
            updateTimer(diff);
    
            if (diff <= 0) {
                // Reset the timer when the time runs out
                reset();
                return;
            }
        
    }, 1000);
}

async function pause() {
    if (!paused.value) {
        // If not paused, pause and store the time of pausing
        lastPause = new Date();
        paused.value = true;
    } else if (lastPause) {
        // If paused, unpause, calculate the time paused,
        // and add it to the target time
        let now = new Date();
        let timePaused = now.getTime() - lastPause.getTime();
        targetTime.setTime(targetTime.getTime() + timePaused);
        paused.value = false;
    }
}

async function reset() {
    if (!started.value || !timer) return;

    // Stop the timer from running
    clearInterval(timer);
    started.value = false;
    paused.value = false;
}
</script>

<template>
<h1>{{ label }}</h1>
</template>

<style scoped>
h1 {
    margin: 0 auto;
    font-size: 10em;
    font-weight: 700;
    line-height: 0.7;
    -webkit-text-stroke: 3px rgb(245, 213, 237);
}
</style>