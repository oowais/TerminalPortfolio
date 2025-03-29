<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  content: string;
}>();
</script>

<template>
  <div class="about-section">
    <div class="content" v-html="content"></div>
  </div>
</template>

<style scoped>
.about-section {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  padding: 1rem;
}

.content {
  flex: 1;
  font-family: "Fira Code", monospace;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .about-section {
    flex-direction: column;
    align-items: center;
  }
}
</style>
