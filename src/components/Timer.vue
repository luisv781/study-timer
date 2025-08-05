<script setup lang="ts">
import { ref } from 'vue';

const timer = ref("15:00");
const minutes = ref(15);

let started = false;

defineExpose({
    start: () => start(),
    minutes: minutes
});

async function start() {
    if (started) {
        return;
    }
    started = true;
    let now = new Date();
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + minutes.value, now.getSeconds());
    let interval = setInterval(() => {
        now = new Date();
        const diff = (targetTime.getTime() - now.getTime()) / 1000;

        if (diff <= 0) {
            clearInterval(interval);
            started = false;
            return;
        }

        const minutes = Math.floor(diff / 60);
        const seconds = Math.floor(diff % 60);

        timer.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
    -webkit-text-stroke: 3px rgb(243, 231, 153);
}
</style>