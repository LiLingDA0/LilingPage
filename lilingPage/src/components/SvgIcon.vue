<!-- components/SvgIcon.vue -->
<template>
  <div 
    class="svg-icon-wrapper"
    :style="{
      width: size + 'px',
      height: size + 'px',
      display: 'inline-block'
    }"
    v-html="processedSvg"
  ></div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 32
    },
    removeFill: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const processedSvg = ref('');

    const loadSvg = async () => {
      try {
        const response = await fetch(`/logo/${props.name}.svg`);
        let svgText = await response.text();
        
        // 自动处理颜色继承
        if (props.removeFill) {
          svgText = svgText.replace(/fill=["']([^"']+)["']/g, 'fill="currentColor"');
        }
        
        // 添加aria属性
        svgText = svgText.replace('<svg', '<svg aria-hidden="true" role="img"');
        
        processedSvg.value = svgText;
      } catch (error) {
        console.error(`Error loading SVG ${props.name}:`, error);
        processedSvg.value = '';
      }
    };

    watch(() => props.name, loadSvg, { immediate: true });

    return { processedSvg };
  }
});
</script>

<style scoped>
.svg-icon-wrapper :deep(svg) {
  width: 100%;
  height: 100%;
  color: inherit; /* 继承父级颜色 */
}

.svg-icon-wrapper :deep(path) {
  fill: currentColor; /* 确保填充色继承 */
}
</style>