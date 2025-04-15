

<template>
  <div id="SectionRoot">
      <div>
        <p style="font-size:3rem;color: hsla(160, 100%, 37%, 1);font-weight: bold;" class="observe-animation fade-up">关于</p>
        <p style="font-size: 2rem;" class="observe-animation fade-up">哈喽&nbsp;,&nbsp;我是&nbsp;<span class="LilingSpan observe-animation fade-up"> LiLing </span>&nbsp;👻</p>
        <p style="font-size: 2rem;" class="observe-animation fade-up">聊聊我自己</p>
        <div style="text-align: center;margin-top: -1rem;">
          <div class="IntroduceContent observe-animation fade-up">
            <p style="margin-bottom: 10px;font-size: 1.3rem;font-weight: bold;">一个<span class="GIESpan">地空（GIS工科版）</span>大学生，<span class="zjwzSpan">温州瑞安gril🙎‍♀️</span>。千里迢迢（1072km）来到湖南益阳上学</p>
            <p>如果要问我为什么要🚶‍♂️🚪背井离乡，只能说，这都是<span class="FateSpan">命运⚖️</span>的安排</p>
            <p>当初报志愿的时候我基本上都瞄准🔍计算机🖥️和地理🌏相关的专业，天南海北都有，省内的占一半吧</p>
            <p>我的下一个志愿就在甚至就在温州（好像是🤖机器人？）</p>
            <p style="margin-bottom: 10px;margin-top: 10px;font-size: 1.3rem;font-weight: bold;">总之，在<span class="FateSpan">命运</span>的岔路口↔️上，我朝着<span class="GIESpan">GIS</span>出发🛣️了</p>
          </div>
          <div class="WaveDiv observe-animation fade-up" > <img src ="/logo/me.jpg"> </div>
          <div class="IntroduceContent observe-animation fade-up">
            <p>日常生活中，我喜欢听音乐🎵、看小说📖，口味很杂，喜好纯凭玄学
              <br>时间多的话也会启动🎮Steam（博德之门真好玩），天气好☀️的话，也会选择出去骑车🚴‍♀、散步🚶‍♀
            </p>
            <p>上了大学🏫后，有了许多新的经历⛵，也做了不少事💪，拿到了一些成绩🥇，也经历了挫折🥀</p>
            <p>感觉自己成长🚀了许多，也越来越认识到自己成长得还远远不够</p>
            <p style="margin-bottom: 10px;margin-top: 10px;font-size: 1.3rem;font-weight: bold;">还有更多的事，在<span class="FutureSpan">未来🔜🕰️</span>，等着我</p>
          </div>
        </div>
        <div>        
        </div>
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
                'left-side observe-animation slide-left': (yearStartIndices[yearIndex] + stampIndex) % 2 === 0,
                'right-side observe-animation slide-right': (yearStartIndices[yearIndex] + stampIndex) % 2 !== 0 
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
      <div  class="IntroduceContent IntroduceContent">
        <p class="observe-animation fade-up">喜欢<span class="CodeSpan">编程</span>，是喜欢这样有一个方便的工具🔧，可以实现各种各样的想法💡</p>
        <p class="observe-animation fade-up">在<span class="CreateSpan">创造</span>✨中，我收获了人生乐趣和意义😄🎉💕</p>
        <div class="WaveDiv observe-animation fade-up" style="margin-top: 4rem;" >
          <a href="https://pcn3drz8fct9.feishu.cn/wiki/TWMkwDadUis9Gnk243pcOdSznsg?from=from_copylink" target="_blank" rel="noopener">简历</a>
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
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.isIntersecting) {
              const parent = entry.target.parentNode as HTMLElement;
              if (parent) {
                const index = Array.from(parent.children).indexOf(entry.target);
                (entry.target as HTMLElement).style.animationDelay = `${index * 0.1}s`;// 根据索引设置交错动画延迟，
              }
              entry.target.classList.add('animate-active');
              observer.unobserve(entry.target);
            }
          }
        });
      }, {
        rootMargin: window.innerWidth < 768 ? '-50px 0px' : '0px',
        threshold: 0.2, // 元素可见30%时触发
      });

      // 观察所有带 observe-animation 类的元素
      document.querySelectorAll('.observe-animation').forEach(el => {
        observer.observe(el);
      });
  },
});
</script>

<style scoped>




.IntroduceContent {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  font: 1.2em sans-serif;
}

.IntroduceContent p{
  margin-bottom: 5px;
}

.WaveDiv {
  display: inline-block; /* 使容器尺寸贴合内容 */
  position: relative;
  margin: 2%;
  /* background-color: var(--color-img-wave); */
  border-radius: 50%;
}

.WaveDiv a{
  position: relative;
  z-index: 1; /* 确保图片在波纹上方 */
  font-size:2.5rem;
  font-weight: bold;
  padding-top: 25px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 90%;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  /* 新增美化属性 */
  transition: all 0.3s ease; /* 添加过渡动画 */
  aspect-ratio: 1/1; /* 强制1:1比例 */
}

.WaveDiv img {
  position: relative;
  z-index: 1; /* 确保图片在波纹上方 */
  width: 15rem;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  /* 新增美化属性 */
  border: 6px solid var(--color-img-wave); 
  transition: all 0.3s ease; /* 添加过渡动画 */
  aspect-ratio: 1/1; /* 强制1:1比例 */

}

.WaveDiv:hover::before,
.WaveDiv:hover::after {
  animation: 
    ripple 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite,
    colorShift 1s ease-in-out infinite;
}

.WaveDiv:hover img {
  transform: scale(1.1); /* 悬停放大 */
  filter: brightness(1.02); /* 轻微提亮 */
}

@keyframes colorShift {
  0%, 100% { border-color: var(--color-img-wave); }
  50% { border-color: rgba(255, 255, 255, 0.4); }
}

/* 调整波纹定位逻辑 */
.WaveDiv::before,
.WaveDiv::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% + 20px); /* 波纹大小 */
  height: calc(100% + 20px);
  border: 10px solid var(--color-img-wave); /* 主色调 */
  border-radius: 50%;
  animation: ripple 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  pointer-events: none; /* 防止点击穿透 */
}

/* 精准波纹扩散计算 */
@keyframes ripple {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    border-width: 2px;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
    border-width: 0;
  }
}

/* 第二个波纹延迟 */
.WaveDiv::after {
  animation-delay: 0.8s;
}

@keyframes ripple {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0.9);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.3);
  }
}

p {
  text-align: center;
}

.timeline-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 5rem;
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
  color: #1c1c34;
  background: #6BD0A880;
  padding: 2px 4px;
  border-radius: 3px;
  display: inline-block; /* 新增 */
  line-height: 1.2; /* 新增 */
}
</style>