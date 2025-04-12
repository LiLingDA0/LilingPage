

<template>
  <div id="SectionRoot" class="timeline-container">
    <div>
      <p style="font-size:4rem;color: hsla(160, 100%, 37%, 1);font-weight: bold;">关于</p>
      <p style="font-size: 2.5rem;">哈喽&nbsp;,&nbsp;我是&nbsp;<span class="LilingSpan"> LiLing </span>&nbsp;👻</p>
      <p style="font-size: 2.5rem;">聊聊我自己</p>
    </div>
    <div class="timeline-container">
      <!-- 时间线轴线 -->
      <div class="timeline-axis"></div>
      
      <!-- 时间线内容 -->
      <div v-for="(yearItem, yearIndex) in timelineData" :key="yearIndex" class="timeline-year">
        <!-- 年份节点 -->
        <div class="year-bubble">
          {{ yearItem.year }}
        </div>

        <!-- 时间戳节点 -->
        <div v-for="(stamp, stampIndex) in yearItem.timeStamp" 
            :key="stampIndex"
            class="timestamp-node"
            :class="{ 
              'left-side': (yearStartIndices[yearIndex] + stampIndex) % 2 === 0,
              'right-side': (yearStartIndices[yearIndex] + stampIndex) % 2 !== 0 
            }">
          
          <!-- 时间戳标记 -->
          <div class="timestamp-marker">
            <img v-if="stamp.icon" :src="stamp.icon" class="icon-image">
            <div v-else class="default-dot"></div>
          </div>

          <!-- 时间戳内容 -->
          <div class="timestamp-content">
            <div v-if="stamp.time" class="time-text">{{ stamp.time }}</div>
            <div v-if="stamp.title" class="title-text">{{ stamp.title }}</div>
            <div v-if="stamp.address" class="address-text">{{ stamp.address }}</div>
            <div v-if="stamp.description" 
                class="description-text"
                v-html="formatDescription(stamp.description, stamp.tag)">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import timelineData from '../../public/TimeLine.json';

// 完善类型定义
interface TimeStampItem {
  time?: string;
  title?: string;
  address?: string;
  description?: string;
  tag?: string;
  icon?: string;
}

interface YearItem {
  year: string;
  timeStamp: TimeStampItem[]; // 从 any[] 改为具体类型
}

export default defineComponent({
  setup() {
    // 修改计算属性逻辑（添加空值保护）
    const yearStartIndices = computed<number[]>(() => {
      let count = 0;
      return (timelineData as YearItem[]).map(year => {
        const start = count;
        // 添加空值保护
        count += year.timeStamp?.length || 0;
        return start;
      });
    });


    const formatDescription = (desc: string, tag: string) => {
      if (!tag) return desc.replace(/\n/g, '<br>');
      const parts = desc.split(tag);
      return `${parts[0]}<span class="highlight-tag">${tag}</span>${parts.slice(1).join('')}`;
    };

    return {
      timelineData,
      formatDescription,
      yearStartIndices
    };
  }
});
</script>

<style scoped>
p {
  text-align: center;
}

.timeline-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
}

.timeline-axis {
  position: absolute;
  left: 50%;
  width: 4px;
  background:var(--color-timeline-axis);
  top: 0;
  bottom: 0;
  transform: translateX(-50%);
}

.timeline-year {
  position: relative;
  padding: 20px 0;
}

.year-bubble {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-year-bubble);
  padding: 8px 16px;
  border-radius: 4px;
  display: inline-block;
  margin: 20px 0;
  font-weight: bold;
}

/* 修改以下样式 */
.timestamp-node {
  position: relative;
  width: 100%;  /* 改为全宽 */
  padding: 20px 0;
}

.left-side {
  left: 0;
  padding-right: 38%; /* 添加右侧留白 */
  text-align: right;
}

.right-side {
  left: 0;
  padding-left: 50%; /* 添加左侧留白 */
  text-align: left;
}

.timestamp-marker {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 双重居中 */
  z-index: 1; /* 确保在轴线上方 */
  width: 24px;
  height: 24px;
}

/* 新增轴线上方遮盖 */
.timeline-axis::after {
  content: '';
  position: absolute;
  left: -8px;
  right: -8px;
  top: -8px;
  bottom: -8px;
  z-index: 0;
}

.default-dot {
  width: 16px;
  height: 16px;
  background: var(--color-default-dot);
  border-radius: 50%;
  margin: 4px;
}

.icon-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: var(--color-default-dot);
  border-radius: 50%;
}

.timestamp-content {
  width: 80%;
  padding: 0 30px;
}

.time-text {
  font-size: 0.8em;
  color: var(--color-slim-text);
}

.title-text {
  font-size: 1.2em;
  font-weight: bold;
  margin: 4px 0;
}

.address-text {
  font-size: 0.9em;
  color: var(--color-slim-text);
}

.description-text {
  font-size: 1em;
  margin-top: 8px;
  line-height: 1.4;
}

::v-deep(.highlight-tag) {
  background: #6BD0A880;
  padding: 2px 4px;
  border-radius: 3px;
  display: inline-block; /* 新增 */
  line-height: 1.2; /* 新增 */
}
</style>