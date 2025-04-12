<script lang="ts">
    import { defineComponent } from 'vue';
    import TagViewer from "../components/TagViewer.vue"; // 确保路径和文件名正确
    import arrowIcon from "../assets/icon/arrow.vue";
    import codeIcon from "../assets/icon/code.vue";
    import { useThemeStore } from '@/stores/theme'

    export default defineComponent({
      name: 'HomeSection',
      components: {
        TagViewer,
        arrowIcon: arrowIcon,
        codeIcon: codeIcon
      },
      setup() {
        const themeStore = useThemeStore()
        return { themeStore }
      },
      computed: {
        isDark() {
          return this.themeStore.isDark
        }
      },
      data() {
        return {
          currentPath: '/tag/MyHobbyTag.json',
          activeTab: 'hobby',
          refreshKey: 0, // 新增刷新标识
          isDarkTheme: false,
          codeIconSize: 70
        }
      },
      mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
      },
      beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
      },

      methods: {  
        gotoHNCUWebsite() {
          if (window.confirm('您即将访问湖南城市学院官网，是否继续？')) {
            console.log('点击了 HNCU 图标')
            window.open('https://www.hncu.edu.cn/', '_blank');
          }
        },
        gotoGetHubWebsite() {
          if (window.confirm('即将跳转到GitHub个人主页，是否继续？')) {
            console.log('点击了 编程 图标')
            window.open('https://github.com/LiLingDA0', '_blank');
          }
        },
        gotowZWebsite() {
          if (window.confirm('即将查看温州百科介绍，是否继续？')) {
            console.log('点击了 温州 图标')
            window.open('https://baike.baidu.com/item/%E6%B8%A9%E5%B7%9E%E5%B8%82/3357322', '_blank');
          }
        },
        // 新增方法
        changeTagType(path:string, type:string) {
          this.currentPath = path
          this.activeTab = type
        },

        refreshTags() {
          this.refreshKey += 1
        },
        handleResize() {
          const baseWidth = 1000; // 设计基准宽度
          this.codeIconSize = Math.min(50, (window.innerWidth / baseWidth) * 50);
        }
      }
    });

</script>
<template>
  <div class="SectionRoot"> 
    <div id="HomeSection">      
      <div class="HSLR" id="HomeSectionLeft">
        <p>我是&nbsp; <span class="LilingSpan"> LiLing </span>&nbsp;</p> 
        <br>        
        <p>来自&nbsp;<span class="zjwzSpan" @click="gotowZWebsite" style="cursor: pointer;">温州</span></p>
        <div>
        <span>目前在 <span class="HNCUSpan" @click="gotoHNCUWebsite" style="cursor: pointer;">&nbsp;HNCU&nbsp;</span><img src="../assets/logo/hncu.png" class="logo" id="HNCULogo" @click="gotoHNCUWebsite" style="cursor: pointer;">
          <br>
          <span>学习
            <div class="major-container" @click="changeTagType('/tag/MyMajorTag.json', 'major') " style="cursor: pointer;">
              <span class="GIESpan">地理空间信息工程</span>
              <span class="GIESpanEN">Geospatial Information Engineering</span>
            </div>
          </span>
        </span>
        </div>
        <p>
          喜欢<span class="CodeSpan" @click="gotoGetHubWebsite" style="cursor: pointer;">&nbsp;编程&nbsp;</span>
          <codeIcon 
            :size="codeIconSize"
            @click="gotoGetHubWebsite" 
            style="cursor: pointer;"
          />
        </p>
        <br>
        <p>
          我的 
          <span 
            class="TagChoose" 
            :class="{ active: activeTab === 'hobby' }"
            @click="changeTagType('/tag/MyHobbyTag.json', 'hobby')"
          >爱好🤟</span>/ 
          <span 
            class="TagChoose"
            :class="{ active: activeTab === 'major' }"
            @click="changeTagType('/tag/MyMajorTag.json', 'major')"
          >专业🎓️</span>/ 
          <span 
            class="TagChoose"
            :class="{ active: activeTab === 'skills' }"
            @click="changeTagType('/tag/MyCodeTag.json', 'skills')"
          >技能👩‍🔧</span>          
        </p>
        <br>
        <arrowIcon 
          :className="'icon-arrow'"
          :theme="isDark ? 'dark' : 'light'"
          :class="'icon-arrow'"
          :size="'100'"
          :key="isDark"
          @click="refreshTags"
        />
      </div> 
      <div class="HSLR" id="HomeSectionRight">
        <TagViewer 
          :theme="isDark ? 'dark' : 'light'"
          :data-path="currentPath"
          :key="currentPath + refreshKey + isDark"
        />
      </div>    
    </div>
  </div>
</template>

<style scoped>



.icon-arrow {
  cursor: pointer ;
}

.TagChoose.active {
  color:var(--color-tag-choose-active);
  font-weight: 500;
  position: relative;
  animation: textGlow 0.6s ease-out;
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
@keyframes textGlow {
  0% {
    text-shadow: 0 0 8px var(--color-tag-choose-glow);
  }
  100% {
    text-shadow: none;
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
  background: var(--color-tag-choose-after);
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
  color:var(--color-tag-choose-default);
  transition: color 0.3s;
}

.TagChoose:hover {
  color: var(--color-tag-choose-hover);
}

@keyframes shake {
  0% { transform: translateX(0) rotate(0); }
  25% { transform: translateX(4px) rotate(8deg); }
  50% { transform: translateX(-4px) rotate(-8deg); }
  75% { transform: translateX(4px) rotate(8deg); }
  100% { transform: translateX(0) rotate(0); }
}



.logo {  
  width: clamp(1rem, 4vw, 4rem); /* 图片动态大小 */
  height: auto; /* 保持比例 */
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  animation: shake 1.5s ease-in-out infinite; /* 添加动画 */
}
/* 在<style scoped>中添加 */


#HomeSectionLeft{
  display: block;
  margin-top: 5rem;
  align-items: center; /* 垂直居中 */
  font-size: clamp(0rem, 4vw, 3rem); /* 动态字体大小 */
  margin-left: clamp(0rem, 10vw, 2rem); /* 动态边距 */
}

#HomeSectionLeft .LilingSpan {
  font-size: clamp(1.5rem, 4vw, 4.5rem); /* 动态字体大小 */
  display: inline-block; /* 确保动画容器有效 */
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease-out;
}

@keyframes bigJump {
  0% { 
    transform: translateY(0) rotate(0) scale(1);
    filter: drop-shadow(0 0 0 transparent);
  }
  30% { 
    transform: translateY(-40px) rotate(-15deg) scale(1.2);
    filter: drop-shadow(0 12px 8px var(--color-text-shadow));
  }
  60% { 
    transform: translateY(-20px) rotate(10deg) scale(1.1); 
  }
  85% { 
    transform: translateY(-10px) rotate(-5deg) scale(1.05);
  }
  100% { 
    transform: translateY(0) rotate(0) scale(1);
    filter: drop-shadow(0 0 0 transparent);
  }
}

.LilingSpan:active {
  animation: bigJump 0.6s cubic-bezier(0.3, 0.7, 0.4, 1.5);
  transform-origin: bottom center;
}

/* 强化悬停效果 */
.LilingSpan:hover {
  transform: translateY(-5px) scale(1.05);
  transition: all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

#HomeSectionLeft .GIESpan {
  font-size: clamp(1rem, 4vw, 3rem); /* 动态字体大小 */
}

.major-container {
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: 45%;
}

.GIESpanEN {
  display: block;
  width: 100%;
  text-align: center;
  transform: scale(0.5);
  font-size: clamp(1rem, 4vw, 3rem);  
  white-space: nowrap;
  transform-origin: left;
  margin-top: -8%;
  margin-bottom: -10%;
}

#HomeSectionLeft p {
  margin-top: 1vh; /* 垂直间距自适应 */
  line-height: 1.3;
  display: inline-block;
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
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
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
    margin-left: 0.2rem;
    margin-top: 0.5rem;
    margin-right: 0.2rem;
  }
  
}

@media screen and (max-width: 720px) {
  #HomeSectionLeft {
    font-size: 1.7rem;
  }
  
  .logo {
    width: 2rem;
    margin-left: 0.1rem;
    margin-top: 0.1rem;
    margin-right: 0.1rem;
  }
}


@media screen and (max-width: 480px) {
  #HomeSectionLeft {
    font-size: 1.2rem;
  }
  
  .logo {
    width: 1rem;
    margin: 0;
  }
}

</style>