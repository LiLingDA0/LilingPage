<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import G6 from '@antv/g6'
  import Hierarchy  from '@antv/hierarchy';


  const props = defineProps({
    dataPath: {
      type: String,
      default: 'src/assets/tag/testTag.json' // 默认路径
    },
    theme: {
      type: String,
      default: 'light'
    }
  });

  console.log(props.dataPath);
  console.log(props.theme)

  //默认light
  var color={
      nodeFill: '#00E0A0',    // 荧光青绿，提升100%亮度
      nodeStroke: '#007550',  // 深海绿增强轮廓对比
      labelColor: '#1A2E40',  // 深蓝灰保持可读性
      edgeStroke: '#90A4B8',   // 浅冰蓝提升边缘活力
      helpTextColor: '#1A2E40'
  }
  if (props.theme === 'dark') {
    color={
        nodeFill: '#6BD0A880',  // 半透明荧光绿增强科技感
        nodeStroke: '#1A4430',  // 深青绿保持轮廓清晰
        labelColor: '#c3e0f5',  // 亮冰蓝提升可读性
        edgeStroke: '#3A7D5C',   // 青灰色保持边缘可见但不突兀
        helpTextColor: '#c3e0f5'
    }
  }

  // 使用ref来存储数据
  const data = ref(null);

  // 定义一个函数来加载JSON文件
  const loadData = async () => {
    try {
      const response = await fetch(props.dataPath);
      data.value = await response.json();
      console.log(data.value);
    } catch (error) {
      console.error('Error loading the JSON file:', error);
    }
  };

   // 构建图的函数
   const BuildGraph = (data) => {
    // 获取容器的尺寸
    const container = document.getElementById('mountNode');
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    var graph = new G6.TreeGraph({
      container: 'mountNode',
      width: width,
      height: height,
      pixelRatio: 2,
      linkCenter: true,
      modes: {
        default: [{
          type: 'collapse-expand',
          onChange: function onChange(item, collapsed) {
            var data = item.get('model').data;
            data.collapsed = collapsed;
            return true;
          }
        }, 'drag-canvas', 'zoom-canvas']
      },
      defaultNode: {
        size: 16,
        style: {
          fill: '#00bd7e',
          stroke: '#096dd9'
        }
      },
      defaultEdge: {
        style: {
          stroke: color.edgeStroke // 使用CSS变量
        }
      },
      layout: function layout(data) {
        var result = Hierarchy.dendrogram(data, {
          direction: 'LR', // H / V / LR / RL / TB / BT
          nodeSep: 40,
          rankSep: 150
        });
        G6.Util.radialLayout(result);
        return result;
      }
    });

    graph.node(function(node) {
      const depth = node.depth || 0; // 获取节点层级
      const baseSize = 26 + (5 * (5 - Math.min(depth, 5))); // 层级越浅尺寸越大
      const fontSize = 12 + (2 * (5 - Math.min(depth, 5))); // 层级越浅字体越大
      
      return {
        size: baseSize,
        label: node.id,
        style: {
          fill: color.nodeFill,
          stroke: color.nodeStroke
        },
        labelCfg: {
          avoidLabelOverlap: true,
          style: {
            fontSize,
            fill: color.labelColor 
          }
        }
      };
    });

    graph.data(data);
    graph.render();
    graph.fitView();
    
  };
  // 监听窗口的resize事件
  const handleResize = () => {
    if (graph) {
      const container = document.getElementById('mountNode');
      const viewportWidth = window.innerWidth;
      
      // 根据视口宽度设置尺寸
      let size = 300;
      if(viewportWidth >= 1920) size = 900;
      else if(viewportWidth >= 1700) size = 800;
      else if (viewportWidth >= 1440) size = 700;
      else if (viewportWidth >= 1236) size = 700;
      else if (viewportWidth >= 1200) size = 600;
      else if (viewportWidth >= 1024) size = 500;
      else if (viewportWidth >= 960) size = 700;
      else if (viewportWidth >= 840) size = 600;
      else if (viewportWidth >= 720) size = 500;
      else if (viewportWidth >= 640) size = 400;
      else if (viewportWidth >= 420) size = 200;
      
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      
      graph.changeSize(size, size);
      graph.fitView();
    }
  };

  // 在组件挂载时调用
  onMounted(async () => {
    console.log('Component TagV mounted.');
    console.log("TagViwer:"+props.dataPath);
    console.log("TagViwer:"+props.theme)
    await loadData();
    if (data.value) {
      BuildGraph(data.value);
    }
    window.addEventListener('resize', handleResize);
  });

  // 在组件卸载时移除事件监听器
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    if (graph) {
      graph.destroy();
    }
  });


</script>

<template>
  <div class="TagViewer">
    <span id="HelpText">左键拖动&滚轮缩放</span>
    <span id="HelpText">点击父节点可以收起子节点</span>
    <div class="graph-container" id="mountNode"></div>
  </div>
</template>

<style scoped>
  .TagViewer {
    position: relative;
  }

  .graph-container{
    cursor: pointer;
  }

  #HelpText {
    position: absolute;
    bottom: 30px;
    right: 10px;
    z-index: 2; /* 确保显示在G6画布上层 */
    color: v-bind('color.helpTextColor');
    font-size: clamp(0.5rem, 1.2vw, 1rem); /* 流体字体大小 */
    /* background: rgba(255,255,255,0.9); */
    padding: 4px 8px;
    border-radius: 4px;
    display: block;
    width: max-content;
  }

  /* 调整第二个提示的位置 */
  #HelpText:nth-of-type(2) {
    bottom: 0px; /* 下移第二个提示 */
  }

  .graph-container {
    position: relative; /* 确保画布定位上下文 */
    z-index: 1;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 300px) and (max-width: 420px) {
    .graph-container { width: 200px; height: 200px; }
  }

  @media (min-width: 420px) and (max-width: 640px) {
    .graph-container { width: 300px; height: 300px; }
  }

  @media (min-width: 640px) and (max-width: 720px) {
    .graph-container { width: 400px; height: 400px; }
  }

  @media (min-width: 720px) and (max-width: 840px) {
    .graph-container { width: 500px; height: 500px; }
  }

  @media (min-width: 840px) and (max-width: 960px) {
    .graph-container { width: 600px; height: 600px; }
  }

  @media (min-width: 960px) and (max-width: 1024px) {
    .graph-container { width: 700px; height: 700px; }
  }

  @media (min-width: 1024px) and (max-width: 1200px) {
    .graph-container { width: 500px; height: 500px; }
  }

  @media (min-width: 1200px) and (max-width: 1236px) {
    .graph-container { width: 600px; height: 600px; }
  }

  @media (min-width: 1236px) and (max-width: 1440px) {
    .graph-container { width: 700px; height: 700px; }
  }

  @media (min-width: 1440px) {
    .graph-container { width: 700px; height: 700px; }
  }

  @media (min-width: 1700px) {
    .graph-container { width: 800px; height: 800px; }
  }

  @media (min-width: 1920px) {
    .graph-container { width: 900px; height: 900px; }
  }

</style>