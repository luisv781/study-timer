<script setup lang="ts">
import { ref } from 'vue';

const timer = ref("00:00");
const minutes = ref(15);

let started = false;

defineExpose({
    start: () => start(),
    minutes: minutes
});

function updateTimer(diff: number) {
    const minutes = Math.floor(diff / 60).toString().padStart(2, '0');
    const seconds = Math.floor(diff % 60).toString().padStart(2, '0');
    timer.value = `${minutes}:${seconds}`;
}

function getDiff(targetTime: Date): number {
    const now = new Date();
    return Math.floor((targetTime.getTime() - now.getTime()) / 1000);
}

async function start() {
    if (started) {
        return;
    }
    started = true;
    let now = new Date();
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + minutes.value, now.getSeconds());
    let diff = getDiff(targetTime);
    updateTimer(diff);

    let interval = setInterval(() => {
        diff = getDiff(targetTime);
        updateTimer(diff);

        if (diff <= 0) {
            clearInterval(interval);
            timer.value = "00:00";
            started = false;
            return;
        }
    }, 1000);
}
</script>

<template>
    <h1>{{ timer }}</h1>
</template>

<style scoped>
h1 {
    margin: 0 auto;
    font-size: 12em;
    -webkit-text-stroke: 3px rgb(245, 213, 237);
}
</style>