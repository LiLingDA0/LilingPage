<template>
  <div 
    class="p-card"
    :style="{ 
      width: width + 'px',
    }"
    style="text-align: center;"
  >
    <!-- Logo -->
    <img 
      v-if="logo"
      :src="`/logo/${logo}`"
      class="card-logo"
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
    <!-- 替换原来的 <p class="card-describe">{{ describe }}</p> -->
    <p 
      class="card-describe"
      style="text-align: left;"
      v-html="highlightTags(describe)"
    ></p>

    <!-- Links -->
    <div class="card-links">
      <a
        v-for="(item, index) in link"
        :key="index"
        :href="isExternalLink(item.href) ? item.href : `/video/${item.href}`"
        target="_blank"
      >
        <SvgIcon 
          :name="item.logo.replace('.svg', '')" 
          class="link-logo"
          :size="40"
        />
      </a>
    </div>

    <!-- Tech Stack -->
    <div class="tech-stack" style="text-align: center;">
      <div class="divider" ></div>
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
import SvgIcon from './SvgIcon.vue';

interface LinkItem {
  href: string;
  logo: string;
}

export default defineComponent({
  components: {
    SvgIcon
  },
  props: {
    width: { type: Number, default: 300 },
    theme: { type: String, default: 'dark' },
    logo: String,
    title: String,
    img: String,
    describe: {
      type: String,
      default: '' // 添加默认空字符串
    },
    tag: {
      type: Array as PropType<string[]>,
      default: () => []
    },
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
  },
  setup(props) {
    const highlightTags = (text: string) => { // 此时text已确保为string
      if (!props.tag?.length) return text;
      
      const sortedTags = [...props.tag].sort((a, b) => b.length - a.length);
      const regex = new RegExp(`(${sortedTags.map(escapeRegExp).join('|')})`, 'g');
      
      return text.replace(regex, '<span class="highlight">$1</span>');
    };

    // 转义正则特殊字符的工具函数
    const escapeRegExp = (str: string) => {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    return { highlightTags };
  }
});
</script>

<style scoped>


.p-card{
  background-color: var(--color-background-mute);;
  border-radius: 12px;
  color: var(--color-card-text-color);
}

:deep(.highlight) {
  background-color: var(--color-card-highlight-color);
  padding: 2px 4px;
  border-radius: 4px;
  font-weight: 500;
  color: #333;
}
.stack-items {
  display: flex;
  justify-content: center; /* 新增：水平居中 */
  gap: 15px;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center; /* 垂直居中 */
}

/* 在style部分添加 */
.card-logo,
.link-logo,
.tech-icon {
  display: block;
  margin: 0 auto; /* 水平居中 */
  object-fit: contain; /* 保持原始比例 */
  height: var(--icon-height); /* 统一高度 */
}

/* 替换原有img相关样式 */
.link-logo,
.tech-icon {
  --icon-color: var(--color-text);
  color: var(--icon-color);
  transition: color 0.3s ease;
}

.link-logo:hover,
.tech-icon:hover {
  --icon-color: var(--color-text-hover);
}

.card-logo {
  --icon-height: 60px; /* Logo图标高度 */
}
.link-logo {
  --icon-height: 40px; /* 链接图标高度 */
}
.tech-icon {
  --icon-height: 35px; /* 技术栈图标高度 */
}
.p-card {
  border-radius: 12px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.card-logo {
  display: block;
  margin: 0 auto 25px;
  object-fit: contain;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
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
  border-top: 2px solid;
  color: var(--color-card-divider-color);
  margin: 15px 10px;
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
  margin: 0 8px;
}

.link-logo:hover,
.tech-icon:hover {
  --icon-color: var(--color-text-hover);
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