<script setup lang="ts">
  import HomeSection from './views/HomeSection.vue';
  import AboutSection from './views/AboutSection.vue';
  import ProjectSection from './views/ProjectSection.vue';
  import FindmeSection from './views/FindmeSection.vue';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop;
      const offset = 4 * 16; // 4rem 假设 1rem = 16px
      window.scrollTo({
        top: offsetTop - offset,
        behavior: 'smooth'
      });
    }
  };
</script>

<template>
  <nav>
    <div>
      <span id="MeSpan">Me</span>
    </div>
    <ul>
      <li @click="scrollToSection('home')">首页</li>
      <li @click="scrollToSection('about')">关于</li>
      <li @click="scrollToSection('project')">项目</li>
      <li @click="scrollToSection('findme')">找我</li>
      <li><a href="https://pcn3drz8fct9.feishu.cn/wiki/TWMkwDadUis9Gnk243pcOdSznsg?from=from_copylink" target="_blank" rel="noopener">简历</a ></li>
    </ul>
  </nav>
  <main>
    <section id="home">
      <HomeSection/>
    </section>
    <section id="about">
      <AboutSection/>
    </section>
    <section id="project">
      <ProjectSection/>    
    </section>
    <section id="findme">
      <FindmeSection/>
    </section>
  </main>
 
  <footer>
    <p>
      这是 <span id="LilingSpan">Li Ling</span> 的 <span id="WebSpan">Web</span> 课程作业,使用了:  
    </p>
    <p>
      <a href="https://v3.vuejs.org/guide/introduction.html" target="_blank" rel="noopener">Vue.js</a>
      +
      <a href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>
    </p>
    <p>
      参考网页：
      <a href="https://www.yanhaixiang.com/" target="_blank" rel="noopener">海怪-个人主页</a>
    </p>
    <p>
      © 2025 April
    </p>
  </footer>
</template>

<style scoped>

  ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0;
    margin: 0;
  }  
  
  #MeSpan {
    padding: 1rem 2rem;
    font-size: 1.5rem;
    color: hsla(160, 100%, 37%, 1);
    font-weight: bold;
  }

  ul li {
    font-size: 1rem;
    padding: 1rem 1rem; /* 添加左右间隔 */
  }

  @media (hover: hover) {
    li:hover {
      color: var(--color-text-hover);
      background-color: var(--backcolor-text-hover);
    }

  }


  nav {
    height: 4rem;
    width: 100%;
    font-size: 12px;
    text-align: center;
    /* padding-top: 0.5rem; */
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed; /* 固定位置 */
    top: 0; /* 固定在顶部 */
    /* background-color: white;  */
    background-color: var(--color-nav-background);
    /* 添加背景色以避免内容穿透 */
    z-index: 1000; /* 确保 nav 在其他内容之上 */
  }


  nav div {
    margin-bottom: 1rem;
  }

  section {
    min-height: 1000px;
  }

  footer {
    text-align: center; /* 使文本内容居中 */
    margin: 0 auto; /* 使 footer 在父元素中水平居中 */
    width: 100%; /* 根据需要调整宽度 */
    padding: 1rem 0; /* 添加上下内边距 */
    background-color: var(--color-footer-background);
  }

  footer p {
    margin: 0.3rem 0; /* 调整段落之间的间距 */
  }

  #LilingSpan {
    color: rgb(249, 208, 6);
    padding: 0 0.5rem;
    font-size: 1rem;
    text-size-adjust: 100%;
    font-weight: bold;
  }

  #WebSpan {
    color: rgb(6, 168, 249);
    padding: 0 0.5rem;
    font-size: 1rem;
    text-size-adjust: 100%;
    font-weight: bold;
  }


  @media (min-width: 1024px) {
    nav {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    nav div {
      margin-bottom: 0;
    }
  }
</style>
