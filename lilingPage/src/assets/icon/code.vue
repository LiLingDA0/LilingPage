<template>
<svg 
    :class="className"
    :style="iconStyle"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    @mouseenter="startAnimation"
    @mouseleave="resetAnimation"
    style="margin-bottom: -4%;"
     >
    <!-- 原始边框 -->
    <path d="M942.152 133.12H81.848C36.741 133.12 0 169.759 0 214.948v604.354c0 45.159 36.649 81.818 81.848 81.818h860.304c45.107 0 81.848-36.639 81.848-81.818V214.948c0-45.169-36.639-81.828-81.848-81.828zM480 186.45c29.45 0 53.34 23.88 53.34 53.33s-23.89 53.33-53.34 53.33-53.33-23.88-53.33-53.33 23.88-53.33 53.33-53.33z m-160 0c29.45 0 53.33 23.88 53.33 53.33s-23.88 53.33-53.33 53.33-53.33-23.88-53.33-53.33 23.88-53.33 53.33-53.33z m-160 0c29.45 0 53.33 23.88 53.33 53.33s-23.88 53.33-53.33 53.33-53.33-23.88-53.33-53.33 23.88-53.33 53.33-53.33z m800 609.659c0 22.65-18.299 41.011-40.98 41.011H104.97c-22.63 0-40.97-18.299-40.97-41.011v-449.66h896v449.66z" 
          :fill="color"
          p-id="9761"/>
    
    <!-- 放大后的 > 符号 -->
    <path d="M200 450 L400 600 L200 750" 
          fill="none" 
          :stroke="color"
          stroke-width="60"
          stroke-linecap="round"
          stroke-linejoin="round"
          />

    <!-- 放大后的闪烁光标 -->
    <path d="M 480 750 L780 750 "
          fill="none"
          :stroke="color"
          stroke-width="60"
          stroke-linecap="round"
          class="blinking-cursor"/>
</svg>
</template>

<style scoped>
.blinking-cursor {
    animation: blink 1s infinite;
}

@keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
}
</style>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: '#00bd3c',
  },
  size: {
    type: [Number, String],
    default: 24
  },
  className: {
    type: String,
    default: 'icon-code'
  }
})

const iconStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  transform: 'translateZ(0)' // 保持GPU加速
}))
</script>