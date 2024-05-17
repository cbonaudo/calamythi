<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Mythical</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
.panel {
  h2 {
    text-decoration: underline;
  }
  border: 1px solid grey;
  border-radius: 5px;
  padding: 10px;
}

.flex {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
