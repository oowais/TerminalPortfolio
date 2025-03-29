<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useTerminalStore } from '../stores/terminal'

const terminalStore = useTerminalStore()
const searchInputRef = ref(null)

// Handle key presses during search
const handleKeyDown = (e) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    terminalStore.exitSearchMode()
  } else if (e.key === 'Enter') {
    e.preventDefault()
    terminalStore.useSearchResult()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    navigateResults(-1) // Move up in results
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    navigateResults(1) // Move down in results
  }
}

// Navigate through search results
const navigateResults = (direction) => {
  const resultsLength = terminalStore.searchResults.length
  if (resultsLength === 0) return
  
  let newIndex = terminalStore.selectedSearchResult + direction
  
  // Wrap around for better UX
  if (newIndex < 0) newIndex = resultsLength - 1
  if (newIndex >= resultsLength) newIndex = 0
  
  terminalStore.selectedSearchResult = newIndex
}

// Update search when query changes
watch(() => terminalStore.searchQuery, () => {
  terminalStore.performHistorySearch()
})

// Focus input when component is mounted
onMounted(() => {
  if (searchInputRef.value) {
    searchInputRef.value.focus()
  }
})

// Cleanup event listeners when unmounted
onBeforeUnmount(() => {
  terminalStore.exitSearchMode()
})
</script>

<template>
  <div class="history-search-overlay" v-if="terminalStore.searchMode">
    <div class="history-search-container">
      <div class="search-header">
        <span class="search-label">Search History:</span>
        <input
          ref="searchInputRef"
          v-model="terminalStore.searchQuery"
          @keydown="handleKeyDown"
          class="search-input"
          type="text"
          placeholder="Type to search..."
          autocomplete="off"
          spellcheck="false"
        />
      </div>
      <div class="search-results">
        <div
          v-for="(result, index) in terminalStore.searchResults"
          :key="index"
          :class="['search-result', { selected: index === terminalStore.selectedSearchResult }]"
          @click="terminalStore.selectedSearchResult = index; terminalStore.useSearchResult()"
        >
          <span class="result-command">{{ result.command }}</span>
        </div>
        <div v-if="terminalStore.searchResults.length === 0" class="no-results">
          No matching commands found
        </div>
      </div>
      <div class="search-footer">
        <span>Press <kbd>Enter</kbd> to use selected command, <kbd>Esc</kbd> to cancel</span>
      </div>
    </div>
  </div>
</template>

<style>
.history-search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.history-search-container {
  width: 80%;
  max-width: 600px;
  background-color: #282a36;
  border: 1px solid #44475a;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.search-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.search-label {
  color: #50fa7b;
  margin-right: 10px;
  white-space: nowrap;
}

.search-input {
  flex: 1;
  background: #44475a;
  border: none;
  color: #f8f8f2;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  padding: 8px 10px;
  border-radius: 2px;
  outline: none;
}

.search-results {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #44475a;
  margin-bottom: 15px;
  background-color: #21222c;
}

.search-result {
  padding: 8px 10px;
  cursor: pointer;
  border-bottom: 1px solid #44475a;
}

.search-result:last-child {
  border-bottom: none;
}

.search-result:hover {
  background-color: #44475a;
}

.search-result.selected {
  background-color: #6272a4;
}

.result-command {
  color: #f8f8f2;
  font-family: 'JetBrains Mono', monospace;
}

.no-results {
  padding: 15px;
  text-align: center;
  color: #6272a4;
  font-style: italic;
}

.search-footer {
  color: #6272a4;
  font-size: 12px;
  text-align: center;
}

kbd {
  background-color: #44475a;
  border-radius: 3px;
  border: 1px solid #6272a4;
  display: inline-block;
  font-size: 0.85em;
  font-family: 'JetBrains Mono', monospace;
  padding: 2px 4px;
  margin: 0 2px;
}
</style>