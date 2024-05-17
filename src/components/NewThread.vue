<template>
  <div class="panel new-thread">
    <div class="flex">
      <h2>Create New Thread</h2>
      <button @click="displayList = !displayList">Toggle List</button>
    </div>
    <div v-if="displayList" class="dialog">
      <p v-for="thread in threadStore.threadList">{{ thread }}</p>
    </div>
    <input @input="update" :value="description" />
    <button @click="create()">Create</button>
  </div>
</template>

<script setup>
import { useThreadStore } from '@/stores/threads'
import { ref } from 'vue'

let threadStore = useThreadStore()
let description = ref('')
let displayList = ref(false)

const emit = defineEmits(['created'])

function update(e) {
  description.value = e.target.value
}

function create() {
  threadStore.create(description.value)
  description.value = ''
  emit('created')
}
</script>

<style scoped>
.new-thread {
  width: 350px;

  input {
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
