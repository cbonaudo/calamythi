<template>
  <div class="panel">
    <div class="flex">
      <h2>Oracles</h2>
      <button @click="rollOracles()">Roll</button>
    </div>

    <div>
      <div>Action Theme: {{ action }} {{ theme }}</div>
      <div>Adverb Descriptor: {{ adverb }} {{ descriptor }}</div>
      <div>Random Event: {{ randomEvent }}</div>
      <div>Combat Action: {{ combatAction }}</div>
      <div>Plot Twist: {{ plotTwist }}</div>
      <div>
        NPC: {{ npcName }} : {{ npcModifier }} {{ npcNoun }} - {{ npcPower }} -
        {{ npcMotivationVerb }}
        {{ npcMotivationNoun }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import elementsNames from '@/oracles/elementsNames.json'
import elementsPlotTwists from '@/oracles/elementsPlotTwists.json'
import elementsCombatActions from '@/oracles/elementsCombatActions.json'
import meaningAction from '@/oracles/meaningAction.json'
import meaningAdverb from '@/oracles/meaningAdverb.json'
import meaningDescriptor from '@/oracles/meaningDescriptor.json'
import meaningTheme from '@/oracles/meaningTheme.json'
import randomEvents from '@/oracles/randomEventFocus.json'
import uneModifier from '@/oracles/uneModifier.json'
import uneNoun from '@/oracles/uneNoun.json'
import uneMotivationNoun from '@/oracles/uneMotivationNoun.json'
import uneMotivationVerb from '@/oracles/uneMotivationVerb.json'
import unePower from '@/oracles/unePower.json'
import { rollDice } from '@/utils/diceRolls.js'
import { useChaosStore } from '@/stores/chaos'

let chaosStore = useChaosStore()

let action = ref('')
let theme = ref('')
let adverb = ref('')
let descriptor = ref('')
let plotTwist = ref('')
let combatAction = ref('')
let randomEvent = ref('')
let npcModifier = ref('')
let npcNoun = ref('')
let npcMotivationVerb = ref('')
let npcMotivationNoun = ref('')
let npcPower = ref('')
let npcName = ref('')

rollOracles()

function rollOracles() {
  action.value = meaningAction[Math.floor(Math.random() * meaningAction.length)]
  theme.value = meaningTheme[Math.floor(Math.random() * meaningTheme.length)]
  adverb.value = meaningAdverb[Math.floor(Math.random() * meaningAdverb.length)]
  descriptor.value = meaningDescriptor[Math.floor(Math.random() * meaningDescriptor.length)]
  let diceRoll = rollDice(100)
  randomEvent.value = randomEvents.find((e) => e.min <= diceRoll && e.max >= diceRoll).label
  plotTwist.value = elementsPlotTwists[Math.floor(Math.random() * elementsPlotTwists.length)]
  plotTwist.value += ' ' + elementsPlotTwists[Math.floor(Math.random() * elementsPlotTwists.length)]
  combatAction.value =
    elementsCombatActions[Math.floor(Math.random() * elementsCombatActions.length)]
  combatAction.value +=
    ' ' + elementsCombatActions[Math.floor(Math.random() * elementsCombatActions.length)]
  npcModifier.value = uneModifier[Math.floor(Math.random() * uneModifier.length)]
  npcNoun.value = uneNoun[Math.floor(Math.random() * uneNoun.length)]
  npcMotivationVerb.value = uneMotivationVerb[Math.floor(Math.random() * uneMotivationVerb.length)]
  npcMotivationNoun.value = uneMotivationNoun[Math.floor(Math.random() * uneMotivationNoun.length)]
  diceRoll = rollDice(100)
  if (chaosStore.chaos <= 2) {
    npcPower.value = unePower.veryLow.find((e) => e.min <= diceRoll && e.max >= diceRoll).label
  } else if (chaosStore.chaos < 5) {
    npcPower.value = unePower.low.find((e) => e.min <= diceRoll && e.max >= diceRoll).label
  } else if (chaosStore.chaos >= 8) {
    npcPower.value = unePower.veryHigh.find((e) => e.min <= diceRoll && e.max >= diceRoll).label
  } else if (chaosStore.chaos > 5) {
    npcPower.value = unePower.high.find((e) => e.min <= diceRoll && e.max >= diceRoll).label
  } else {
    npcPower.value = unePower.mid.find((e) => e.min <= diceRoll && e.max >= diceRoll).label
  }
  npcName.value = elementsNames[Math.floor(Math.random() * elementsNames.length)]
  npcName.value += ' ' + elementsNames[Math.floor(Math.random() * elementsNames.length)]
}
</script>

<style scoped></style>
