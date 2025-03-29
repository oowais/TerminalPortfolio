<script setup>
import { ref, watch, nextTick } from 'vue';
import TypingEffect from './TypingEffect.vue';
import CommandPrompt from './CommandPrompt.vue';

const props = defineProps({
  outputHistory: {
    type: Array,
    default: () => []
  }
});

const outputContainer = ref(null);

// Auto-scroll to the bottom when output changes
watch(() => props.outputHistory, async () => {
  await nextTick();
  if (outputContainer.value) {
    outputContainer.value.scrollTop = outputContainer.value.scrollHeight;
  }
}, { deep: true });
</script>

<template>
  <div ref="outputContainer" class="terminal-output">
    <div v-for="(output, index) in outputHistory" :key="index" class="output-entry">
      <template v-if="output.type === 'command'">
        <div class="output-command">
          <CommandPrompt />
          <span class="command-text">{{ output.content }}</span>
        </div>
      </template>
      
      <template v-else-if="output.type === 'response'">
        <div class="output-response" :class="{ 'error': output.isError }">
          <template v-if="output.useTyping">
            <TypingEffect :text="output.content" :speed="30" />
          </template>
          <template v-else>
            <div v-html="output.content"></div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
.terminal-output {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 10px;
  max-height: calc(100% - 50px);
}

.output-entry {
  margin-bottom: 10px;
  line-height: 1.5;
}

.output-command {
  display: flex;
  color: #f0f0f0;
  margin-bottom: 5px;
}

.command-text {
  margin-left: 8px;
}

.output-response {
  padding-left: 20px;
  color: #bbb;
  white-space: pre-wrap;
  word-break: break-word;
}

.output-response.error {
  color: #ff6b6b;
}

.output-response pre {
  background-color: #2a2a2a;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}

.output-response a {
  color: #56b6c2;
  text-decoration: none;
}

.output-response a:hover {
  text-decoration: underline;
}

.output-response table {
  border-collapse: collapse;
  width: 100%;
  margin: 10px 0;
}

.output-response table, .output-response th, .output-response td {
  border: 1px solid #444;
}

.output-response th, .output-response td {
  padding: 8px;
  text-align: left;
}

.output-response th {
  background-color: #333;
}

.output-response code {
  background-color: #333;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: 'Roboto Mono', monospace;
}
</style>
