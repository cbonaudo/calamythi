import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThreadStore = defineStore('threads', () => {
  const threadList = ref([])

  function getRandomThread() {
    if (threadList.value.length > 0) {
      return threadList.value[Math.floor(Math.random() * threadList.value.length)]
    }
  }

  function create(label) {
    threadList.value.push(label)
  }

  return { threadList, getRandomThread, create }
})
