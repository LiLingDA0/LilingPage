<template>
  <div class="arrow-container">
    <svg
      :class="className"
      :style="iconStyle"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      @mouseenter="startAnimation"
      @mouseleave="resetAnimation"
    >
      <defs>
        <filter :id="glowFilterId">
          <feGaussianBlur stdDeviation="12" result="glow"/> <!-- 增大模糊范围 -->
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <g class="icon-arrow-main">
        <path
          class="icon-glow"
          :fill="effectiveGlowColor"
          :filter="`url(#${glowFilterId})`"
          d="M550.4 490.666667L230.4 170.666667 170.666667 230.4l260.266666 260.266667L170.666667 750.933333 230.4 810.666667l320-320z m298.666667 0L533.333333 170.666667 469.333333 230.4l260.266667 260.266667-260.266667 260.266666 59.733334 59.733334 320-320z"
        />
        <path
          class="icon-arrow-base"
          :fill="effectiveColor"
          d="M550.4 490.666667L230.4 170.666667 170.666667 230.4l260.266666 260.266667L170.666667 750.933333 230.4 810.666667l320-320z m298.666667 0L533.333333 170.666667 469.333333 230.4l260.266667 260.266667-260.266667 260.266666 59.733334 59.733334 320-320z"
        />
        <path
          class="icon-arrow-highlight"
          :fill="effectiveHighlight"
          d="M550.4 490.666667L230.4 170.666667 170.666667 230.4l260.266666 260.266667L170.666667 750.933333 230.4 810.666667l320-320z m298.666667 0L533.333333 170.666667 469.333333 230.4l260.266667 260.266667-260.266667 260.266666 59.733334 59.733334 320-320z"
        />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  theme: {
    type: String,
    default: 'light',
    validator: v => ['light', 'dark'].includes(v)
  },
  color: String,
  highlightColor: String,
  size: {
    type: [Number, String],
    default: 24
  },
  className: {
    type: String,
    default: 'icon-arrow'
  },
  animationDuration: {
    type: Number,
    default: 1.2
  },
  glowIntensity: {
    type: Number,
    default: 1.5,  // 默认强度提升
    validator: v => v >= 0 && v <= 2
  },
  pokeDistance: {
    type: Number,
    default: 10,  // 默认移动距离加大
    validator: v => v >= 0 && v <= 20
  },
  pokeDuration: {
    type: Number,
    default: 0.4
  }
})

// 颜色配置优化为绿色系
const colorPalette = computed(() => ({
  light: {
    base: '#00ad6e',          // 主色改为绿色
    highlight: '#a8ffd966',   // 半透明浅绿高亮
    glow: '#00ad6e'           // 绿色光晕基础色
  },
  dark: {
    base: '#e2e8f0',
    highlight: 'rgba(226, 232, 240, 0.2)',
    glow: 'rgba(226, 232, 240, 0.1)'
  }
}))

const effectiveColor = computed(() => 
  props.color || colorPalette.value[props.theme].base
)

const effectiveHighlight = computed(() =>
  props.highlightColor || colorPalette.value[props.theme].highlight
)

const effectiveGlowColor = computed(() => {
  const base = colorPalette.value[props.theme].glow
  return adjustAlpha(base, props.glowIntensity)
})

// 动画状态管理优化
const isAnimating = ref(false)
const animationTimer = ref(null)

const startAnimation = () => {
  if (animationTimer.value) clearTimeout(animationTimer.value)
  isAnimating.value = true
}

const resetAnimation = () => {
  animationTimer.value = setTimeout(() => {
    isAnimating.value = false
  }, props.pokeDuration * 1000 * 0.8)
}

// 工具函数优化（允许更高透明度）
const adjustAlpha = (hexColor, intensity) => {
  const rgb = hexToRgb(hexColor)
  const alpha = Math.min(0.6 * intensity, 0.8) // 最大透明度提升到0.8
  return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`
}

const hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 }
}

const glowFilterId = computed(() => 
  `glow-${props.theme}-${props.glowIntensity}`
)

const iconStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  transform: 'translateZ(0)' // 保持GPU加速
}))

const desktopRotation = computed(() => 
  window.innerWidth >= 1024 ? '0deg' : '90deg'
)

const isMobile = ref(false)

const checkViewport = () => {
  isMobile.value = window.innerWidth < 1024
}

onMounted(() => {
  checkViewport()
  window.addEventListener('resize', checkViewport)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkViewport)
})
</script>

<style scoped>
/* 新增容器处理旋转 */
.arrow-container {
  display: inline-block;
  transform-origin: center center;
  transition: transform 0.3s;
}

/* 响应式旋转控制 */
@media (min-width: 1025px) {
  .arrow-container {
    transform: rotate(0deg);
  }
}
@media (max-width: 1025px) {
  .arrow-container {
    transform: rotate(90deg);
    margin-top: 12px; /* 方向补偿 */
  }
}

/* 顶击动画容器 */
.icon-arrow-main {
  display: inline-block;
  transform-origin: center center;
  animation: 
    poke-translate v-bind('props.pokeDuration + "s"') cubic-bezier(0.4, 0, 0.2, 1) infinite,
    poke-scale v-bind('props.pokeDuration + "s"') cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes poke-translate {
  0%, 100% { transform: translateX(0); }
  30% { transform: translateX(v-bind('props.pokeDistance + "px"')); }
  70% { transform: translateX(calc(v-bind('props.pokeDistance') * -0.5 * 1px)); }
}

@keyframes poke-scale {
  0%, 100% { transform: scale(1); }
  30% { transform: scale(0.85); }
  70% { transform: scale(1.15); }
}

/* 其他原有样式保持不变 */
.icon-arrow {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-glow {
  opacity: 0.3;
  transition: opacity 0.3s ease-out;
}

.icon-arrow:hover .icon-glow {
  opacity: 0.8;
  animation: glow-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.icon-arrow-highlight {
  opacity: 0;
  mask: linear-gradient(
    -60deg,
    transparent 0%,
    var(--mask-gradient) 50%,
    transparent 100%
  );
  transition: opacity 0.3s;
}

.icon-arrow:hover .icon-arrow-highlight {
  opacity: 1;
  animation: highlight-flow v-bind('props.animationDuration + "s"') linear infinite;
}

@keyframes highlight-flow {
  0% { mask-position: -100% 0; }
  100% { mask-position: 200% 0; }
}

.icon-arrow-base {
  transition: filter 0.3s;
}
.icon-arrow:hover .icon-arrow-base {
  filter: brightness(1.25);
}

:root {
  --mask-gradient: v-bind('props.theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.6)"');
}
</style>
