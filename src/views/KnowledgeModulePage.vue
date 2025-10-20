<template>
  <div class="module-page">
    <header class="module-header">
      <div class="module-header__intro">
        <h1 class="module-header__title">{{ activeModule.title }}</h1>
        <p class="module-header__subtitle">{{ activeModule.summary }}</p>
      </div>
      <div class="module-header__actions">
        <button class="module-header__button" @click="handleBackToKnowledge">
          返回模块列表
        </button>
        <button class="module-header__button module-header__button--home" @click="handleBackHome">
          返回主页
        </button>
      </div>
    </header>

    <section class="module-layout">
      <div class="module-player">
        <div class="module-player__video" v-if="selectedContent">
          <video
            :key="selectedContent.videoUrl"
            class="module-player__video-element"
            :src="selectedContent.videoUrl"
            controls
            playsinline
          ></video>
        </div>
        <div class="module-player__details" v-if="selectedContent">
          <span class="module-player__tag">{{ selectedContent.duration }}</span>
          <h2 class="module-player__title">{{ selectedContent.title }}</h2>
          <p class="module-player__description">{{ selectedContent.description }}</p>
        </div>
      </div>

      <div class="module-mascot-slot">
        <slot name="mascot">
          <div class="module-mascot-slot__placeholder">
            <span class="module-mascot-slot__sparkle">✨</span>
            <p class="module-mascot-slot__text">在这里放入活泼的卡通伙伴，为课程加油助威吧！</p>
          </div>
        </slot>
      </div>

      <aside class="module-sidebar">
        <h3 class="module-sidebar__title">课程内容</h3>
        <div class="module-sidebar__list">
          <button
            v-for="content in activeModule.contents"
            :key="content.id"
            class="module-sidebar__item"
            :class="{
              'module-sidebar__item--active':
                selectedContent && content.id === selectedContent.id,
            }"
            @click="handleContentSelect(content)"
          >
            <span class="module-sidebar__item-index">{{ content.index }}</span>
            <div class="module-sidebar__item-body">
              <span class="module-sidebar__item-title">{{ content.title }}</span>
              <span class="module-sidebar__item-duration">{{ content.duration }}</span>
            </div>
          </button>
        </div>
      </aside>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const moduleLibrary = [
  {
    id: "science",
    title: "科学探究课",
    summary: "通过观察、实验与数据分析，循序渐进掌握科学思维的方法。",
    contents: [
      {
        id: "science-1",
        index: "内容 1",
        title: "磁力的神奇演示",
        duration: "12:48",
        description: "跟随老师一起完成磁力实验，理解看不见的力如何影响世界。",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "science-2",
        index: "内容 2",
        title: "水循环实验站",
        duration: "09:32",
        description: "制作迷你水循环模型，观察蒸发、凝结与降水的全过程。",
        videoUrl: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
      },
      {
        id: "science-3",
        index: "内容 3",
        title: "实验数据如何记录",
        duration: "07:41",
        description: "学习记录实验结果的常见方法，培养严谨的数据整理习惯。",
        videoUrl: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
      },
    ],
  },
  {
    id: "humanities",
    title: "人文故事馆",
    summary: "走进历史与文化的长廊，用故事连接古今人物与生活场景。",
    contents: [
      {
        id: "humanities-1",
        index: "内容 1",
        title: "丝绸之路的旅人",
        duration: "10:20",
        description: "从古代商队的故事中，体验跨文化交流的魅力。",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "humanities-2",
        index: "内容 2",
        title: "一封来自博物馆的信",
        duration: "08:15",
        description: "透过信件了解文物背后的秘密与守护者的心声。",
        videoUrl: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
      },
      {
        id: "humanities-3",
        index: "内容 3",
        title: "从诗词看古人的生活",
        duration: "11:02",
        description: "细读诗词中的生活细节，感受文字中蕴含的温度与情感。",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
    ],
  },
  {
    id: "writing",
    title: "创意写作坊",
    summary: "运用多种写作技巧，激发灵感并构建独一无二的故事世界。",
    contents: [
      {
        id: "writing-1",
        index: "内容 1",
        title: "故事从人物开始",
        duration: "06:58",
        description: "设计鲜活的人物形象，理解角色动机如何推动情节发展。",
        videoUrl: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
      },
      {
        id: "writing-2",
        index: "内容 2",
        title: "情节的起承转合",
        duration: "09:04",
        description: "掌握故事结构的经典模型，让作品更有张力。",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "writing-3",
        index: "内容 3",
        title: "让语言更具画面感",
        duration: "07:26",
        description: "练习用细节描写刻画场景，为读者创造身临其境的体验。",
        videoUrl: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
      },
    ],
  },
  {
    id: "math",
    title: "数学思维营",
    summary: "用游戏化的方式探索数学规律，培养逻辑推理与建模能力。",
    contents: [
      {
        id: "math-1",
        index: "内容 1",
        title: "图形中的对称密码",
        duration: "08:44",
        description: "寻找日常生活中的对称现象，理解几何的美感。",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "math-2",
        index: "内容 2",
        title: "数独背后的逻辑思维",
        duration: "10:36",
        description: "分析数独的解题策略，体验推理带来的乐趣。",
        videoUrl: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
      },
      {
        id: "math-3",
        index: "内容 3",
        title: "生活中的概率游戏",
        duration: "09:18",
        description: "通过小游戏理解概率与决策之间的关系。",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
    ],
  },
];

const activeModule = ref(
  moduleLibrary.find((item) => item.id === route.params.moduleId) || moduleLibrary[0]
);

if (!route.params.moduleId || !activeModule.value) {
  router.replace({
    name: "KnowledgeModulePage",
    params: { moduleId: activeModule.value?.id ?? moduleLibrary[0].id },
  });
}

const selectedContent = ref(activeModule.value.contents[0]);

watch(
  () => route.params.moduleId,
  (moduleId) => {
    const match = moduleLibrary.find((item) => item.id === moduleId);
    if (match) {
      activeModule.value = match;
      selectedContent.value = match.contents[0];
    } else if (activeModule.value) {
      router.replace({
        name: "KnowledgeModulePage",
        params: { moduleId: activeModule.value.id },
      });
    }
  }
);

const handleContentSelect = (content) => {
  selectedContent.value = content;
};

const handleBackToKnowledge = () => {
  router.push({ name: "KnowledgePage" });
};

const handleBackHome = () => {
  router.push({ name: "HomePage" });
};
</script>

<style scoped>
.module-page {
  min-height: 100vh;
  padding: 48px 32px 64px;
  background: linear-gradient(150deg, #eef3ff 0%, #ffffff 50%, #f8f5ff 100%);
  color: #1f2a44;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.module-header {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
}

.module-header__intro {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.module-header__title {
  font-size: 2.4rem;
  font-weight: 700;
  color: #1f2a44;
}

.module-header__subtitle {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #4a5b84;
}

.module-header__actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.module-header__button {
  padding: 12px 24px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #4c6ef5, #5c8dff);
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(76, 110, 245, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.module-header__button--home {
  background: linear-gradient(135deg, #ff6f91, #ff9472);
  box-shadow: 0 12px 24px rgba(255, 135, 148, 0.24);
}

.module-header__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 36px rgba(76, 110, 245, 0.28);
}

.module-header__button--home:hover {
  box-shadow: 0 18px 36px rgba(255, 135, 148, 0.32);
}

.module-layout {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 2.1fr) minmax(160px, 0.8fr) minmax(260px, 1fr);
  align-items: stretch;
  gap: 36px;
}

.module-player {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 18px 44px rgba(31, 42, 68, 0.18);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.module-mascot-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.72);
  border-radius: 24px;
  border: 2px dashed rgba(92, 141, 255, 0.35);
  box-shadow: 0 18px 40px rgba(76, 110, 245, 0.15);
  min-height: 240px;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.module-mascot-slot__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
  color: #3f4b74;
  font-size: 0.95rem;
  line-height: 1.6;
}

.module-mascot-slot__sparkle {
  font-size: 2rem;
  animation: sparkle 2.4s ease-in-out infinite;
}

.module-mascot-slot__text {
  max-width: 180px;
}

@keyframes sparkle {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15) rotate(6deg);
    opacity: 0.7;
  }
}

.module-player__video {
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  background: #0f1a2d;
  position: relative;
}

.module-player__video-element {
  width: 100%;
  height: 100%;
  display: block;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.module-player__details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.module-player__tag {
  align-self: flex-start;
  background: rgba(76, 110, 245, 0.12);
  color: #4c6ef5;
  border-radius: 12px;
  padding: 6px 12px;
  font-size: 0.9rem;
  font-weight: 600;
}

.module-player__title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1f2a44;
}

.module-player__description {
  font-size: 1rem;
  line-height: 1.75;
  color: #4a5b84;
}

.module-sidebar {
  background: rgba(15, 26, 45, 0.85);
  color: #ffffff;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 18px 40px rgba(15, 26, 45, 0.32);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.module-sidebar__title {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.module-sidebar__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.module-sidebar__item {
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
  padding: 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  border: none;
  color: inherit;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
  text-align: left;
}

.module-sidebar__item:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.14);
}

.module-sidebar__item--active {
  background: rgba(255, 255, 255, 0.24);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
}

.module-sidebar__item-index {
  font-size: 0.95rem;
  font-weight: 700;
  min-width: 56px;
}

.module-sidebar__item-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.module-sidebar__item-title {
  font-size: 1rem;
  font-weight: 600;
}

.module-sidebar__item-duration {
  font-size: 0.85rem;
  opacity: 0.7;
}

@media (max-width: 1200px) {
  .module-layout {
    grid-template-columns: minmax(0, 1.5fr) minmax(220px, 1fr);
    grid-template-areas:
      "player sidebar"
      "player mascot";
    gap: 32px;
  }

  .module-player {
    grid-area: player;
  }

  .module-sidebar {
    grid-area: sidebar;
  }

  .module-mascot-slot {
    grid-area: mascot;
  }
}

@media (max-width: 1024px) {
  .module-layout {
    grid-template-columns: 1fr;
    grid-template-areas: none;
  }

  .module-mascot-slot {
    min-height: 200px;
  }

  .module-sidebar {
    flex-direction: row;
    align-items: stretch;
    overflow-x: auto;
    gap: 16px;
  }

  .module-sidebar__list {
    flex-direction: row;
    gap: 16px;
  }

  .module-sidebar__item {
    min-width: 220px;
  }
}

@media (max-width: 640px) {
  .module-page {
    padding: 32px 16px 48px;
  }

  .module-header {
    flex-direction: column;
    align-items: stretch;
  }

  .module-header__actions {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .module-header__button {
    flex: 1 1 auto;
  }
}
</style>