<template>
  <div>
    <button @click="chaosStore.decrement()">-</button>
    Chaos: {{ chaosStore.chaos }} <button @click="chaosStore.increment()">+</button>
  </div>
</template>

<script setup>
import { useChaosStore } from '@/stores/chaos'

let chaosStore = useChaosStore()
</script>

<style scoped></style>
