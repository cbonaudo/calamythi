<script setup>
import ChaosFactor from '../components/ChaosFactor.vue'
import RandomEvent from '../components/RandomEvent.vue'
import FateRoll from '../components/FateRoll.vue'
import NewScene from '../components/NewScene.vue'
import NewNPC from '../components/NewNPC.vue'
import NewThread from '../components/NewThread.vue'
import OracleTables from '../components/OracleTables.vue'
</script>

<template>
  <main>
    <div class="column">
      <ChaosFactor />
      <div class="flex"><RandomEvent /><FateRoll /></div>
      <NewScene />
      <div class="flex">
        <NewNPC />
        <NewThread />
      </div>
      <OracleTables />
    </div>
  </main>
</template>
