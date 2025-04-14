<template>
  <div 
    class="p-card"
    :style="{ 
      width: width + 'px',
      backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f5f5f5',
      color: theme === 'dark' ? 'white' : '#333'
    }"
  >
    <!-- Logo -->
    <img 
      v-if="logo"
      :src="'/logo/${logo}'" 
      class="card-logo"
      :style="{ height: width * 0.3 + 'px' }"
    />

    <!-- Title -->
    <h2 class="card-title">{{ title }}</h2>

    <!-- Main Image -->
    <img
      v-if="img"
      :src="`/ProjectImg/${img}`"
      class="card-main-img"
    />

    <!-- Description -->
    <p class="card-describe">{{ describe }}</p>

    <!-- Links -->
    <div class="card-links">
      <a
        v-for="(item, index) in link"
        :key="index"
        :href="isExternalLink(item.href) ? item.href : `/video/${item.href}`"
        target="_blank"
      >
        <img
          :src="`/logo/${item.logo}`"
          class="link-logo"
          :style="{ height: width * 0.15 + 'px' }"
        />
      </a>
    </div>

    <!-- Tech Stack -->
    <div class="tech-stack">
      <div class="divider"></div>
      <h3 class="stack-title">技术栈</h3>
      <div class="stack-items">
        <div 
          v-for="(tech, index) in TechStack"
          :key="index"
          class="tech-item"
        >
          <img 
            :src="`/logo/${tech}.svg`"
            class="tech-icon"
          />
          <span class="tech-tooltip">{{ tech }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
interface LinkItem {
  href: string;
  logo: string;
}

export default defineComponent({
  props: {
    width: { type: Number, default: 300 },
    theme: { type: String, default: 'light' },
    logo: String,
    title: String,
    img: String,
    describe: String,
    link: {
        type: Array as PropType<LinkItem[]>,
        default: () => [] as LinkItem[],
        required: true
    },
    TechStack: {
        type: Array as PropType<string[]>, // 显式类型声明
        default: () => []
  }
  },
  methods: {
    isExternalLink(href: string): boolean {
      return href.startsWith('http');
    }
  }
});
</script>

<style scoped>
.p-card {
  border-radius: 12px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.card-logo {
  display: block;
  margin: 0 auto 15px;
  object-fit: contain;
}

.card-title {
  font-size: 1.5rem;
  text-align: center;
  margin: 10px 0;
}

.card-main-img {
  width: 100%;
  height: auto;
  margin: 15px 0;
  border-radius: 8px;
}

.card-describe {
  font-size: 0.9rem;
  margin: 15px 0;
  line-height: 1.4;
}

.card-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.divider {
  border-top: 1px solid rgba(0,0,0,0.1);
  margin: 15px 0;
}

.stack-title {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.stack-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-item {
  position: relative;
  cursor: pointer;
}

.tech-icon {
  width: 30px;
  height: 30px;
}

.tech-tooltip {
  visibility: hidden;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
}

.tech-item:hover .tech-tooltip {
  visibility: visible;
}
</style>