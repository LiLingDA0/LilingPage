<template>
  <div style="text-align: center;margin-top: 2%;margin-bottom: 5%;">
    <p style="font-size:3rem;color: hsla(160, 100%, 37%, 1);font-weight: bold;" class="observe-animation fade-up">个人项目</p>
    <p style="font-size: 1.5rem;" class="observe-animation fade-up">分享想法和乐趣</p>
  </div>
  <div class="projects-container">
    <!-- 动态列数容器 -->
    <div 
      v-for="(column, index) in columnCount" 
      :key="index"
      class="project-column"
    >
      <!-- 动态分配卡片 -->
      <PCard
        v-for="(project, pIndex) in getColumnProjects(index)"
        :key="pIndex"
        v-bind="project"
        :width="cardWidth"
        theme="dark"
        class="dynamic-card"
      />
    </div>
  </div>
  <div style="text-align: center;margin-top: 5%;margin-bottom: 5%;">
    <p style="font-size: 1.5rem;" class="observe-animation fade-up">未来尽量努力✊更新</p>   
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onBeforeUnmount } from 'vue';

import PCard from '@/components/PCard.vue';
import projects from '@/../public/ProjectCard.json';

export default defineComponent({
  components: { PCard },
  setup() {
    const windowWidth = ref(window.innerWidth)
    // 响应式列数计算
    const columnCount = computed(() => {
      const width = windowWidth.value;
      if (width < 768) return 1;
      if (width < 1000) return 2;
      return 3;
    });

    // 动态卡片宽度计算
    const cardWidth = computed(() => {
      const baseWidth = Math.min(windowWidth.value * 0.9, 400);
      return Math.max(baseWidth, 300);
    });

    // 添加窗口resize监听
    const handleResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => window.addEventListener('resize', handleResize));
    onBeforeUnmount(() => window.removeEventListener('resize', handleResize));

    // 按索引分配项目到列
    const getColumnProjects = (columnIndex: number) => {
      return projects.filter((_, index) => index % columnCount.value === columnIndex);
    };

    return { columnCount, cardWidth, getColumnProjects };
  }
});
</script>

<style scoped>
.projects-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.project-column {
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dynamic-card {
  width: 100% !important;
  margin: 0 auto;
}

@media (max-width: 1000px) {
  .projects-container {
    max-width: 900px;
  }
}

@media (max-width: 768px) {
  .projects-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>