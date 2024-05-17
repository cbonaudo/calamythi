import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNPCStore = defineStore('npcs', () => {
  const npcList = ref([])

  function getRandomNpc() {
    if (npcList.value.length > 0) {
      return npcList.value[Math.floor(Math.random() * npcList.value.length)]
    }
  }

  function create(label) {
    npcList.value.push(label)
  }

  return { npcList, getRandomNpc, create }
})
