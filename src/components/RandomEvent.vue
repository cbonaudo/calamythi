<template>
  <div class="panel random-event">
    <div class="flex">
      <h2>Random Event</h2>
      <button @click="getRandomFocus()">Roll</button>
      <button @click="emit('close')" v-if="props.closable">X</button>
    </div>
    <div v-if="focus">
      <div>{{ focus }}</div>
      <div v-if="focusAction">- {{ focusAction }}</div>
      <div>Action-Theme: {{ actionTheme }}</div>
      <div>Adverb-Descriptor: {{ adverbDescriptor }}</div>
      <NewNPC
        v-if="isCreatingNpc"
        @created="isCreatingNpc = false"
        closable
        @close="isCreatingNpc = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import randomEvents from '@/oracles/randomEventFocus.json'
import meaningAction from '@/oracles/meaningAction.json'
import meaningAdverb from '@/oracles/meaningAdverb.json'
import meaningDescriptor from '@/oracles/meaningDescriptor.json'
import meaningTheme from '@/oracles/meaningTheme.json'
import { useNPCStore } from '@/stores/npcs'
import { useThreadStore } from '@/stores/threads'
import { rollDice } from '@/utils/diceRolls'
import NewNPC from './NewNPC.vue'

const emit = defineEmits(['close'])
const props = defineProps({
  auto: Boolean,
  closable: Boolean
})

let focus = ref(null)
let focusAction = ref(null)
let actionTheme = ref(null)
let adverbDescriptor = ref(null)
let isCreatingNpc = ref(false)

if (props.auto) {
  getRandomFocus()
}

function getRandomFocus() {
  focus.value = null
  focusAction.value = null
  isCreatingNpc.value = false

  const diceRoll = rollDice(100)
  const newFocus = randomEvents.find((e) => e.min <= diceRoll && e.max >= diceRoll)
  focus.value = newFocus.label

  switch (newFocus.action) {
    case 'NEW_NPC':
      isCreatingNpc.value = true
      break
    case 'GET_NPC':
      focusAction.value = useNPCStore().getRandomNpc()
      break
    case 'GET_THREAD':
      focusAction.value = useThreadStore().getRandomThread()
      break
    default:
  }

  actionTheme.value =
    meaningAction[Math.floor(Math.random() * meaningAction.length)] +
    ' ' +
    meaningTheme[Math.floor(Math.random() * meaningTheme.length)]
  adverbDescriptor.value =
    meaningAdverb[Math.floor(Math.random() * meaningAdverb.length)] +
    ' ' +
    meaningDescriptor[Math.floor(Math.random() * meaningDescriptor.length)]
}
</script>

<style scoped>
.random-event {
  height: 160px;
  width: 350px;

  .new-npc {
    position: absolute;
    background-color: aliceblue;
  }
}
</style>
