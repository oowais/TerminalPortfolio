<script setup lang="ts">
interface Project {
  name: string;
  teamSize: number;
  duration: string;
  description: string;
  technologies: string[];
  github: string;
  live: string;
}

defineProps<{
  project: Project;
}>();
</script>

<template>
  <div class="project-card">
    <div class="project-header">
      <h3 class="project-title">{{ project.name }}</h3>
      <div class="project-meta">
        <span class="meta-item"
          ><i class="fas fa-users"></i> {{ project.teamSize }} members</span
        >
        <span class="meta-item"
          ><i class="fas fa-clock"></i> {{ project.duration }}</span
        >
      </div>
    </div>
    <div class="project-content">
      <p class="project-description">{{ project.description }}</p>
      <div class="project-tech">
        <div class="tech-label">Technologies:</div>
        <div class="tech-tags">
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="tech-tag"
            >{{ tech }}</span
          >
        </div>
      </div>
      <div class="project-links">
        <a :href="project.github" target="_blank" class="project-link">
          <i class="fab fa-github"></i> GitHub
        </a>
        <a :href="project.live" target="_blank" class="project-link">
          <i class="fas fa-external-link-alt"></i> Live Demo
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
}

.project-header {
  margin-bottom: 1rem;
}

.project-title {
  color: #00ff00;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.project-meta {
  display: flex;
  gap: 1rem;
  color: #888;
  font-size: 0.9rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.project-description {
  color: #ddd;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.project-tech {
  margin-bottom: 1rem;
}

.tech-label {
  color: #888;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: rgba(0, 255, 0, 0.1);
  color: #00ff00;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  color: #00ff00;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
}

.project-link:hover {
  color: #00cc00;
}
</style>
