<script setup>
import { useTerminalStore } from '../stores/terminal'
import CommandOutput from './CommandOutput.vue'

const terminalStore = useTerminalStore()
</script>

<template>
  <div class="command-history">
    <div v-for="(entry, index) in terminalStore.history" :key="index" class="history-entry">
      <div class="history-command">
        <span class="prompt-text">visitor@portfolio:~$ </span>
        <span class="command-text">{{ entry.command }}</span>
      </div>
      <CommandOutput :output="entry.output" />
    </div>
  </div>
</template>

<style>
.command-history {
  margin-bottom: 15px;
}

.history-entry {
  margin-bottom: 15px;
}

.history-command {
  display: flex;
  margin-bottom: 5px;
}

.command-text {
  color: #f8f8f2;
}
</style>
