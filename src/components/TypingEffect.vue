<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  speed: {
    type: Number,
    default: 30
  },
  delay: {
    type: Number,
    default: 0
  }
});

const displayText = ref('');
const currentIndex = ref(0);
const typingInterval = ref(null);
const isTypingComplete = ref(false);

const htmlContent = computed(() => {
  // This allows the display text to be rendered as HTML
  return displayText.value;
});

const startTyping = () => {
  if (typingInterval.value) return;
  
  typingInterval.value = setInterval(() => {
    if (currentIndex.value < props.text.length) {
      displayText.value += props.text[currentIndex.value];
      currentIndex.value++;
    } else {
      clearInterval(typingInterval.value);
      typingInterval.value = null;
      isTypingComplete.value = true;
    }
  }, props.speed);
};

onMounted(() => {
  setTimeout(startTyping, props.delay);
});

onUnmounted(() => {
  if (typingInterval.value) {
    clearInterval(typingInterval.value);
  }
});
</script>

<template>
  <div class="typing-effect">
    <div v-html="htmlContent"></div>
    <span class="typing-cursor" v-if="!isTypingComplete">|</span>
  </div>
</template>

<style>
.typing-effect {
  display: inline;
  position: relative;
  word-break: break-word;
}

.typing-cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  background-color: #f0f0f0;
  margin-left: 2px;
  animation: blink 1s step-end infinite;
  vertical-align: text-bottom;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
