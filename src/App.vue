<script setup>
import Terminal from './components/Terminal.vue'
import HistorySearch from './components/HistorySearch.vue'
</script>

<template>
  <main>
    <Terminal />
    <HistorySearch />
  </main>
</template>

<style>
main {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e1e1e;
  padding: 1rem;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  main {
    padding: 0.5rem;
  }
}
</style>
