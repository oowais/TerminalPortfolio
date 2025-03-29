<script setup>
import { ref, watch, nextTick } from 'vue';
import CommandPrompt from './CommandPrompt.vue';

const props = defineProps({
  command: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  suggestions: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:command', 'submit']);

const inputRef = ref(null);
const localCommand = ref(props.command);

// Watch for changes in the prop and update the local value
watch(() => props.command, (newValue) => {
  localCommand.value = newValue;
});

// Emit changes back to parent
watch(localCommand, (newValue) => {
  emit('update:command', newValue);
});

const handleInput = (e) => {
  localCommand.value = e.target.value;
};

const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (localCommand.value.trim()) {
      emit('submit', localCommand.value);
      localCommand.value = '';
    }
  }
};

const focusInput = async () => {
  if (props.isActive) {
    await nextTick();
    inputRef.value?.focus();
  }
};

// Re-focus the input when active state changes
watch(() => props.isActive, (newValue) => {
  if (newValue) {
    focusInput();
  }
});

// Focus the input on mount
watch(() => inputRef.value, (newValue) => {
  if (newValue) {
    focusInput();
  }
});
</script>

<template>
  <div class="command-line">
    <CommandPrompt />
    <div class="command-input-wrapper">
      <input
        ref="inputRef"
        type="text"
        class="command-input"
        v-model="localCommand"
        @input="handleInput"
        @keydown="handleKeyDown"
        spellcheck="false"
        autocomplete="off"
        :disabled="!isActive"
      />
      <div class="cursor-blink" v-if="isActive"></div>
    </div>
  </div>
  
  <div class="suggestions" v-if="suggestions.length > 0">
    <span v-for="(suggestion, index) in suggestions" :key="index" class="suggestion">
      {{ suggestion }}
    </span>
  </div>
</template>

<style>
.command-line {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.command-input-wrapper {
  flex-grow: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.command-input {
  background: transparent;
  border: none;
  color: #f0f0f0;
  font-family: 'Roboto Mono', monospace;
  font-size: 16px;
  width: 100%;
  padding: 0;
  margin-left: 8px;
  caret-color: transparent; /* Hide default cursor */
  outline: none;
}

.cursor-blink {
  width: 10px;
  height: 18px;
  background-color: #f0f0f0;
  margin-left: -10px;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 5px;
  color: #888;
  font-size: 14px;
  padding-left: 20px;
}

.suggestion {
  padding: 2px 6px;
  background-color: #333;
  border-radius: 4px;
  cursor: pointer;
}

.suggestion:hover {
  background-color: #444;
}
</style>
