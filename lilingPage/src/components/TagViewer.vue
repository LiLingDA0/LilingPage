<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import G6 from '@antv/g6'
  import Hierarchy  from '@antv/hierarchy';


  const props = defineProps({
    dataPath: {
      type: String,
      default: 'src/assets/testTag.json' // 默认路径
    }
  });

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
          stroke: '#A3B1BF'
        }
      },
      layout: function layout(data) {
        var result = Hierarchy.dendrogram(data, {
          direction: 'LR', // H / V / LR / RL / TB / BT
          nodeSep: 20,
          rankSep: 100
        });
        G6.Util.radialLayout(result);
        return result;
      }
    });

    graph.node(function(node) {
      return {
        size: 26,
        style: {
          fill: '#00bd7e',
          stroke: '#013926'
        },
        label: node.id,
        labelCfg: {
        style: {
          fill: '#f2f2f2' // 使用CSS变量
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
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      graph.changeSize(width, height);
      graph.fitView();
    }
  };

  // 在组件挂载时调用
  onMounted(async () => {
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
    <div class="graph-container" id="mountNode"></div>
  </div>
</template>

<style scoped>
  .graph-container {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    min-width: 300px;
    min-height: 300px;
    max-width: 800px;
    max-height: 800px;
    width: 100%;
    height: 100%;
    /* background-color: hsla(156, 20%, 73%, 0.116); */
  }
</style>