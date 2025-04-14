<template>
  <div id="SectionRoot" class="projects-container">
    <PCard
      v-for="(project, index) in projects"
      :key="index"
      :width="400"
      theme="light"
      :logo="project.logo"
      :title="project.title"
      :img="project.img"
      :describe="project.describe"
      :link="project.link"
      :TechStack="project.TechStack"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PCard from '@/components/PCard.vue';
import projects from '@/../public/ProjectCard.json';

export default defineComponent({
  name: 'ProjectSection',
  components: { PCard },
  setup() {
    return { projects };
  }
});
</script>

<style scoped>
.projects-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .projects-container { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .projects-container { grid-template-columns: 1fr; }
}
</style>