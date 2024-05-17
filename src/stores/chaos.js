import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const MIN_CHAOS = 1
const MAX_CHAOS = 9

export const useChaosStore = defineStore('chaos', () => {
  let chaos = ref(5)
  let chaosModifier = computed(() => getModifier())

  function increment() {
    if (chaos.value < MAX_CHAOS) chaos.value++
  }

  function decrement() {
    if (chaos.value > MIN_CHAOS) chaos.value--
  }

  function getModifier() {
    switch (chaos.value) {
      case 1:
        return (chaosModifier.value = -5)
      case 2:
        return (chaosModifier.value = -4)
      case 3:
        return (chaosModifier.value = -2)
      case 4:
        return (chaosModifier.value = -1)
      case 5:
        return (chaosModifier.value = 0)
      case 6:
        return (chaosModifier.value = 1)
      case 7:
        return (chaosModifier.value = 2)
      case 8:
        return (chaosModifier.value = 4)
      case 9:
        return (chaosModifier.value = 5)
    }
  }

  return { chaos, chaosModifier, increment, decrement }
})
