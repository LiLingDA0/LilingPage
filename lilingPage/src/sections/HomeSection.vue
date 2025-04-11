<script>
    import { defineComponent } from 'vue';
    import TagViewer from "../components/TagViewer.vue"; // 确保路径和文件名正确

    export default defineComponent({
        name: 'HomeSection',
        components: {
          TagViewer // 注册 TagForest 组件
        }
    });
</script>
<template>
  <div class="SectionRoot"> 
    <div id="HomeSection">      
      <div class="HSLR" id="HomeSectionLeft">
        <p>我是 <sapn id="LiLingSpan"> LiLing </sapn> </p> 
        <span>LEFTSAPAN</span> 
      </div> 
      <div class="HSLR" id="HomeSectionRight">
        <TagViewer id="TagV" data-path="src/assets/TestTag.json"/> <!-- 使用 TagForest 组件 -->
      </div>    
    </div>

  </div>
</template>

<style scoped>

#HomeSectionLeft{

  
}

#TagV {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

#HomeSection {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 90vh;
}

.HSLR {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 300px; /* 最小高度保证 */
}

#HomeSectionLeft,
#HomeSectionRight {
  max-width: 50%;
}

@media screen and (max-width: 1024px) {
  #HomeSection {
    flex-direction: column;
  }

  #HomeSectionLeft,
  #HomeSectionRight {
    max-width: 100%;
    width: 100%;
    min-height: 50vh; /* 保持垂直方向等分 */
  }
}


</style>