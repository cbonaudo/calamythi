<template>
  <div class="panel new-scene">
    <div class="flex">
      <h2>New Scene</h2>
      <button @click="createNewScene(-1)">Down Chaos</button>
      <button @click="createNewScene(0)">Keep Chaos</button>
      <button @click="createNewScene(1)">Up Chaos</button>
    </div>
    <div v-if="chaosRoll">Rolled {{ chaosRoll }} / {{ chaosStore.chaos }} Chaos Factor</div>
    <div v-if="randomEventTriggered">
      {{ chaosRoll % 2 === 0 ? 'Interrupt Scene' : 'Altered Scene' }}
      <RandomEvent auto closable v-if="displayDialog" @close="displayDialog = false" />
    </div>
    <div v-else>No Scene Alteration</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useChaosStore } from '@/stores/chaos'
import { rollDice } from '@/utils/diceRolls'
import RandomEvent from './RandomEvent.vue'

let chaosStore = useChaosStore()

let chaosRoll = ref(null)
let randomEventTriggered = ref(null)
let displayDialog = ref(null)

function createNewScene(chaosModifier) {
  randomEventTriggered.value = false
  if (chaosModifier == -1) {
    chaosStore.decrement()
  } else if (chaosModifier == 1) {
    chaosStore.increment()
  }

  chaosRoll.value = rollDice(10)
  randomEventTriggered.value = chaosRoll.value <= chaosStore.chaos
  displayDialog.value = chaosRoll.value <= chaosStore.chaos
}
</script>

<style scoped>
.random-event {
  position: absolute;
  background-color: aliceblue;
}
.new-scene {
  height: 110px;
}
</style>
