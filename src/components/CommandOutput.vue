<script setup lang="ts">
import type { CommandOutput } from "../data/commands";
import AboutSection from "./AboutSection.vue";
import ProjectCard from "./ProjectCard.vue";

defineProps<{
  output: CommandOutput;
}>();
</script>

<template>
  <div
    class="command-output"
    :class="{
      error: output.type === 'error',
      success: output.type === 'success',
      projects: output.type === 'projects',
      skills: output.type === 'skills',
      experience: output.type === 'experience',
      about: output.type === 'about',
      contact: output.type === 'contact',
      help: output.type === 'help',
      'easter-egg': output.type === 'easter-egg',
      history: output.type === 'history',
      system: output.type === 'system',
    }"
  >
    <div v-if="output.type === 'error'" class="error-message">
      <span class="prefix">Error: </span>
      <span v-html="output.content"></span>
    </div>

    <div v-else-if="output.type === 'help'" class="help-content">
      <div class="help-header">Available commands:</div>
      <div class="help-commands">
        <div
          v-for="(desc, cmd) in output.content"
          :key="cmd"
          class="help-command"
        >
          <span class="command-name">{{ cmd }}</span>
          <span class="command-description">{{ desc }}</span>
        </div>
      </div>
    </div>

    <div v-else-if="output.type === 'projects'" class="projects-content">
      <div class="section-title">My Projects</div>
      <div class="projects-grid">
        <ProjectCard
          v-for="project in output.content"
          :key="project.name"
          :project="project"
        />
      </div>
    </div>

    <div v-else-if="output.type === 'skills'" class="skills-content">
      <div class="section-title">My Skills</div>
      <div
        v-for="(skills, category) in output.content"
        :key="category"
        class="skills-category"
      >
        <div class="category-name">{{ category }}</div>
        <div class="skills-list">
          <span
            v-for="(skill, index) in skills"
            :key="index"
            class="skill-item"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>

    <div v-else-if="output.type === 'experience'" class="experience-content">
      <div class="section-title">Work Experience</div>
      <div v-for="(job, index) in output.content" :key="index" class="job-item">
        <div class="job-header">
          <div class="job-title">{{ job.title }} at {{ job.company }}</div>
          <div class="job-period">{{ job.period }}</div>
        </div>
        <div class="job-description">{{ job.description }}</div>
        <ul class="job-responsibilities">
          <li
            v-for="(responsibility, rIndex) in job.responsibilities"
            :key="rIndex"
          >
            {{ responsibility }}
          </li>
        </ul>
      </div>
    </div>

    <div v-else-if="output.type === 'about'">
      <AboutSection :content="output.content" />
    </div>

    <div v-else-if="output.type === 'contact'" class="contact-content">
      <div class="section-title">Contact Information</div>
      <div class="contact-items">
        <div
          v-for="(value, key) in output.content"
          :key="key"
          class="contact-item"
        >
          <span class="contact-label">{{ key }}:</span>
          <span v-if="key === 'Email'" class="contact-value">
            <a :href="`mailto:${value}`">{{ value }}</a>
          </span>
          <span
            v-else-if="
              key === 'LinkedIn' || key === 'GitHub' || key === 'Twitter'
            "
            class="contact-value"
          >
            <a :href="value" target="_blank">{{ value }}</a>
          </span>
          <span v-else class="contact-value">{{ value }}</span>
        </div>
      </div>
    </div>

    <div v-else-if="output.type === 'education'" class="education-content">
      <div class="section-title">Education</div>
      <div v-html="output.content"></div>
    </div>

    <div v-else v-html="output.content"></div>
  </div>
</template>

<style>
.command-output {
  margin: 10px 0;
  line-height: 1.5;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.error-message {
  color: #ff5555;
}

.prefix {
  font-weight: bold;
}

.help-header {
  color: #50fa7b;
  margin-bottom: 8px;
  font-weight: bold;
}

.help-commands {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 8px;
}

.help-command {
  display: flex;
  margin-bottom: 4px;
}

.command-name {
  color: #ffb86c;
  width: 120px;
  padding-right: 15px;
}

.command-description {
  color: #f8f8f2;
}

.section-title {
  color: #bd93f9;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  border-bottom: 1px solid #44475a;
  padding-bottom: 5px;
}

/* Projects styling */
.project-item {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #44475a20;
  border-radius: 4px;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.project-title {
  color: #8be9fd;
  font-weight: bold;
  font-size: 16px;
}

.project-links {
  display: flex;
  gap: 10px;
}

.project-link {
  color: #50fa7b;
  text-decoration: none;
}

.project-link:hover {
  text-decoration: underline;
}

.project-description {
  margin-bottom: 8px;
  color: #f8f8f2;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-tag {
  background-color: #6272a4;
  color: #f8f8f2;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

/* Skills styling */
.skills-category {
  margin-bottom: 15px;
}

.category-name {
  color: #ffb86c;
  font-weight: bold;
  margin-bottom: 5px;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-item {
  background-color: #44475a;
  color: #f8f8f2;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 13px;
}

/* Experience styling */
.job-item {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px dashed #44475a;
}

.job-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.job-title {
  color: #8be9fd;
  font-weight: bold;
}

.job-period {
  color: #ffb86c;
}

.job-description {
  margin-bottom: 10px;
}

.job-responsibilities {
  padding-left: 20px;
}

.job-responsibilities li {
  margin-bottom: 5px;
}

/* About styling */
.about-text {
  line-height: 1.6;
}

/* Contact styling */
.contact-items {
  display: grid;
  gap: 8px;
}

.contact-item {
  display: flex;
}

.contact-label {
  color: #ffb86c;
  width: 100px;
}

.contact-value a {
  color: #8be9fd;
  text-decoration: none;
}

.contact-value a:hover {
  text-decoration: underline;
}

/* Easter egg styling */
.easter-egg {
  animation: colorCycle 5s infinite;
}

@keyframes colorCycle {
  0% {
    color: #ff5555;
  }
  25% {
    color: #f1fa8c;
  }
  50% {
    color: #50fa7b;
  }
  75% {
    color: #bd93f9;
  }
  100% {
    color: #ff5555;
  }
}

@media (max-width: 768px) {
  .help-commands,
  .project-header,
  .job-header {
    grid-template-columns: 1fr;
  }

  .project-header,
  .job-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .project-links,
  .job-period {
    margin-top: 5px;
  }
}
</style>

<style scoped>
.command-output {
  margin: 0.5rem 0;
  line-height: 1.5;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}
</style>
