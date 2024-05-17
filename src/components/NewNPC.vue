<template>
  <div class="panel new-npc">
    <div class="flex">
      <h2>Create New NPC</h2>
      <button @click="displayList = !displayList">Toggle List</button>
      <button @click="emit('close')" v-if="props.closable">X</button>
    </div>
    <div v-if="displayList" class="dialog">
      <p v-for="npc in npcStore.npcList">{{ npc }}</p>
    </div>
    <button @click="rollUne()">Roll UNE</button>
    <textarea @input="update" :value="description" />
    <button @click="create()">Create</button>
  </div>
</template>

<script setup>
import { useNPCStore } from '@/stores/npcs'
import { ref } from 'vue'
import elementsNames from '@/oracles/elementsNames.json'
import uneModifier from '@/oracles/uneModifier.json'
import uneNoun from '@/oracles/uneNoun.json'
import unePower from '@/oracles/unePower.json'
import uneMotivationVerb from '@/oracles/uneMotivationVerb.json'
import uneMotivationNoun from '@/oracles/uneMotivationNoun.json'
import { useChaosStore } from '@/stores/chaos'
import { rollDice } from '@/utils/diceRolls'

let npcStore = useNPCStore()
let chaosStore = useChaosStore()
let description = ref('')
let displayList = ref(false)

const emit = defineEmits(['created', 'close'])
const props = defineProps({
  closable: Boolean
})

function rollUne() {
  let modifier = uneModifier[Math.floor(Math.random() * uneModifier.length)]
  let noun = uneNoun[Math.floor(Math.random() * uneNoun.length)]

  let motivationVerb = uneMotivationVerb[Math.floor(Math.random() * uneMotivationVerb.length)]
  let motivationNoun = uneMotivationNoun[Math.floor(Math.random() * uneMotivationNoun.length)]

  let power = ''
  let diceRoll = rollDice(100)
  if (chaosStore.chaos <= 2) {
    power = unePower.veryLow.find((e) => e.min <= diceRoll && e.max >= diceRoll).label
  } else if (chaosStore.chaos < 5) {
    power = unePower.low.find((e) => e.min <= diceRoll && e.max >= diceRoll).label
  } else if (chaosStore.chaos >= 8) {
    power = unePower.veryHigh.find((e) => e.min <= diceRoll && e.max >= diceRoll).label
  } else if (chaosStore.chaos > 5) {
    power = unePower.high.find((e) => e.min <= diceRoll && e.max >= diceRoll).label
  } else {
    power = unePower.mid.find((e) => e.min <= diceRoll && e.max >= diceRoll).label
  }

  let name1 = elementsNames[Math.floor(Math.random() * elementsNames.length)]
  let name2 = elementsNames[Math.floor(Math.random() * elementsNames.length)]

  description.value = `${name1} ${name2} : ${modifier} ${noun} - ${power} - ${motivationNoun} ${motivationVerb}`
}

function update(e) {
  description.value = e.target.value
}

function create() {
  npcStore.create(description.value)
  description.value = ''
  emit('created')
}
</script>

<style scoped>
.new-npc {
  width: 400px;
  textarea {
    width: 250px;
  }
}
.dialog {
  position: absolute;
  border: 1px black solid;
  border-radius: 5px;
  background-color: aliceblue;
}
</style>
