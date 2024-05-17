<template>
  <div class="panel">
    <div class="flex">
      <h2>Fate</h2>
      <div v-if="result">{{ result }} ({{ diceResult1 }} {{ diceResult2 }})</div>
      <div v-if="diceResult1 && diceResult1 == diceResult2">
        <h3>Match!</h3>
        <RandomEvent auto closable @close="match = false" v-if="match" />
      </div>
    </div>
    <div class="grid">
      <button @click="rollFate(-5)">Impossible</button>
      <button @click="rollFate(-4)">Nearly Impossible</button>
      <button @click="rollFate(-2)">Very Unlikely</button>
      <button @click="rollFate(-1)">Unlikely</button>
      <button @click="rollFate(0)">50/50</button>
      <button @click="rollFate(1)">Likely</button>
      <button @click="rollFate(2)">Very Likely</button>
      <button @click="rollFate(4)">Nearly Certain</button>
      <button @click="rollFate(5)">Certain</button>
    </div>
  </div>
</template>

<script setup>
import { useChaosStore } from '@/stores/chaos'
import { rollDice } from '@/utils/diceRolls'
import { ref } from 'vue'
import RandomEvent from './RandomEvent.vue'

let diceResult1 = ref(null)
let diceResult2 = ref(null)
let result = ref(null)
let match = ref(false)

function rollFate(probabilityModifier) {
  match.value = false
  result.value = null
  let chaosModifier = useChaosStore().chaosModifier

  diceResult1.value = rollDice(10)
  diceResult2.value = rollDice(10)

  let total = diceResult1.value + diceResult2.value + probabilityModifier + chaosModifier
  if (total >= 2 && total <= 4) {
    result.value = 'Exceptional No'
  } else if (total >= 18 && total <= 20) {
    result.value = 'Exceptional Yes'
  } else if (total >= 11) {
    result.value = 'Yes'
  } else if (total <= 10) {
    result.value = 'No'
  }

  if (diceResult1.value == diceResult2.value) {
    match.value = true
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  gap: 10px;
  grid-template-columns: 33fr 33fr 33fr;
}
.random-event {
  position: absolute;
  background-color: aliceblue;
  right: 250px;
}
</style>
