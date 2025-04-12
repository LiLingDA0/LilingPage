<script>
    import { defineComponent } from 'vue';
    import TagViewer from "../components/TagViewer.vue"; // 确保路径和文件名正确

    export default defineComponent({
      name: 'HomeSection',
      components: {
        TagViewer
      },

      data() {
        return {
          currentPath: 'src/assets/tag/MyHobbyTag.json',
          activeTab: 'hobby',
          refreshKey: 0, // 新增刷新标识
          isDarkTheme: false
        }
      },
      mounted() {
        this.initThemeWatch()
      },
      beforeUnmount() {
        this.removeThemeWatch()
      },

      methods: {  
        gotoHNCUWebsite() {
          console.log('点击了 HNCU 图标')
          window.open('https://www.hncu.edu.cn/', '_blank');
        },
        // 新增方法
        changeTagType(path, type) {
          this.currentPath = path
          this.activeTab = type
        },

        refreshTags() {
          this.refreshKey += 1
        },
        initThemeWatch() {
          this.checkTheme()
          this.themeMedia = window.matchMedia('(prefers-color-scheme: dark)')
          this.themeMedia.addEventListener('change', this.handleThemeChange)

          // //新监听
          // this.observer = new MutationObserver((mutations) => {
          //   mutations.forEach(mutation => {
          //     if (mutation.attributeName === 'data-theme') {
          //       const newTheme = document.documentElement.getAttribute('data-theme');
          //       this.handleThemeChange(newTheme)
          //     }
          //   });
          // });
          // this.observer.observe(document.documentElement, {
          //   attributes: true,
          //   attributeFilter: ['data-theme']
          // });
        },
        // 新增移除监听方法
        removeThemeWatch() {
          if (this.themeMedia) {
            this.themeMedia.removeEventListener('change', this.handleThemeChange)
          }
          
          // this.observer.disconnect();
        },
        // 优化后的主题变更处理方法
        handleThemeChange(event) {
          console.log(event)
          console.log('检测到主题变化，当前是否为暗色模式:', event.matches)
          this.isDarkTheme = event.matches
          console.log("是否为黑暗："+this.isDarkTheme)
          console.log('Tag主题变更', event)
          // if (event === 'dark') {
          //   this.isDarkTheme = true
          // } else {
          //   this.isDarkTheme = false
          // }
          this.refreshTags()
        },
        // 修改后的检查主题方法
        checkTheme() {
          this.isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          console.log('初始化主题检查，暗色模式:', this.isDarkTheme)
        }
      }
    });

</script>
<template>
  <div class="SectionRoot"> 
    <div id="HomeSection">      
      <div class="HSLR" id="HomeSectionLeft">
        <p>我是 <span class="LilingSpan"> LiLing </span></p> 
        <br>        
        <p>来自<span class="zjwzSpan">浙江温州</span></p>
        <div>
        <span>目前在 <span class="HNCUSpan">HNCU</span><img src="../assets/logo/hncu.png" class="logo" id="HNCULogo" @click="gotoHNCUWebsite" style="cursor: pointer;">
          <br>
          就读<span class="GIESpan">地理空间信息工程</span> 
        </span>
        </div>
        <p>
          喜欢用<span class="CodeSpan">编程</span>实现想法
        </p>
        <br>
        <p>
          我的 
          <span 
            class="TagChoose" 
            :class="{ active: activeTab === 'hobby' }"
            @click="changeTagType('src/assets/tag/MyHobbyTag.json', 'hobby')"
          >爱好</span> / 
          <span 
            class="TagChoose"
            :class="{ active: activeTab === 'major' }"
            @click="changeTagType('src/assets/tag/MyMajorTag.json', 'major')"
          >专业</span> / 
          <span 
            class="TagChoose"
            :class="{ active: activeTab === 'skills' }"
            @click="changeTagType('src/assets/tag/MyCodeTag.json', 'skills')"
          >技能</span>          
        </p>
        <br>
        <div class="iconDiv">
          <img 
            src="../assets/arrow.svg" 
            class="icon" 
            id="arrow"
            @click="refreshTags"
            style="cursor: pointer;"
          >
        </div>
      </div> 
      <div class="HSLR" id="HomeSectionRight">
        <TagViewer 
          :theme="isDarkTheme ? 'dark' : 'light'"
          :data-path="currentPath"
          :key="currentPath + refreshKey"
        />
      </div>    
    </div>
  </div>
</template>

<style scoped>

.TagChoose.active {
  color: #409eff;
  font-weight: 500;
  position: relative;
  /* 添加下划线动画 */
  &::before {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 2px;
    background: currentColor;
    transform: scaleX(1);
    animation: underline 0.3s ease-out;
  }
}

@keyframes underline {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
} 

.TagChoose {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  position: relative;
}

/* 波纹动画效果 */
.TagChoose::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(64, 158, 255, 0.15);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
}

.TagChoose:active::after {
  width: 120%;
  height: 120%;
  opacity: 0;
}

/* 点击缩放动画 */
.TagChoose:active {
  transform: scale(0.92);
}

/* 文字颜色动画 */
.TagChoose {
  color: #606266;
  transition: color 0.3s;
}

.TagChoose:hover {
  color: #409eff;
}

/* 当前选中状态样式 */
.TagChoose.active {
  color: #409eff;
  font-weight: 500;
  animation: textGlow 0.6s ease-out;
}

@keyframes textGlow {
  0% {
    text-shadow: 0 0 8px rgba(64, 158, 255, 0.4);
  }
  100% {
    text-shadow: none;
  }
}

/* 在现有.icon样式中添加 */
.icon {
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  width: 100px;
  height: 100px;
}

/* 添加光线动画关键帧 */
@keyframes lightSweep {
  0% {
    mask-position: -100% 0;
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.3);
  }
  100% {
    mask-position: 100% 0;
    filter: brightness(1);
  }
}

/* 添加遮罩效果 */
.icon::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.3) 50%,
    rgba(255,255,255,0) 100%
  );
  mask: linear-gradient(
    120deg,
    rgba(0,0,0,0.2) 0%,
    rgba(0,0,0,0.8) 50%,
    rgba(0,0,0,0.2) 100%
  );
  mask-size: 200% 100%;
  animation: lightSweep 3s ease-in-out infinite;
}

/* 悬停增强效果 */
.icon:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 6px rgba(255,255,255,0.3));
}

.icon {
  transform-origin: center center;
  transition: transform 0.3s ease; /* 添加过渡效果 */
}

@media (min-width: 1024px) {
  .icon {
    transform: rotate(0deg); /* 大屏幕恢复原状 */
  }
}

@media (max-width: 1024px) {
  .icon {
    transform: rotate(90deg); /* 小屏幕旋转90度 */
  }
}

@keyframes shake {
  0% { transform: translateX(0) rotate(0); }
  25% { transform: translateX(4px) rotate(8deg); }
  50% { transform: translateX(-4px) rotate(-8deg); }
  75% { transform: translateX(4px) rotate(8deg); }
  100% { transform: translateX(0) rotate(0); }
}



.logo {  
  width: clamp(2rem, 4vw, 4.5rem); /* 图片动态大小 */
  height: auto; /* 保持比例 */
  margin-left: 0.5rem;
  margin-top: 1rem;
  margin-right: 0.5rem;
  animation: shake 1.5s ease-in-out infinite; /* 添加动画 */
}
/* 在<style scoped>中添加 */


#HomeSectionLeft{
  display: block;
  margin-top: 5rem;
  margin-left: 10rem;
  align-items: center; /* 垂直居中 */
  font-size: clamp(1rem, 4vw, 3.5rem); /* 动态字体大小 */
  margin-left: clamp(1rem, 10vw, 10rem); /* 动态边距 */
}

#HomeSectionLeft .LilingSpan {
  font-size: clamp(1rem, 4vw, 3.5rem); /* 动态字体大小 */
}

#HomeSectionLeft .GIESpan {
  font-size: clamp(1rem, 4vw, 3.5rem); /* 动态字体大小 */
}
#HomeSectionLeft p {
  margin: 1vh 0; /* 垂直间距自适应 */
  line-height: 1.3;
  display: inline-block;
  white-space: nowrap; /* 防止短词换行 */
}

.zjwzSpan, .GIESpan {
  display: inline-block;
  white-space: nowrap; /* 防止短词换行 */
}

#TagV {
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
  min-height: 90vh;
  height: auto;
}

.HSLR {  
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 0 2%;
  box-sizing: border-box;
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

  #HomeSectionLeft {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    margin-left: 5%;
    margin-top: 2rem;
  }
  
  .logo {
    width: 3rem;
    margin: 0.5rem;
  }
  
}

@media screen and (max-width: 480px) {
  #HomeSectionLeft {
    font-size: 1.2rem;
  }
  
  .logo {
    width: 2rem;
  }
}

</style>