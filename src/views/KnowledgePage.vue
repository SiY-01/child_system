<template>
  <div class="knowledge-page">
    <header class="knowledge-header">
      <div class="knowledge-header__content">
        <h1 class="knowledge-header__title">选择你的学习模块</h1>
        <p class="knowledge-header__subtitle">
          根据兴趣选择不同主题的课程模块，每个模块都包含练习与扩展内容，帮助你循序渐进提升能力。
        </p>
      </div>
      <div class="knowledge-header__actions">
        <button class="knowledge-header__button" @click="handleBackToScene">
          返回场景
        </button>
        <button class="knowledge-header__button knowledge-header__button--home" @click="handleBackHome">
          返回主页
        </button>
      </div>
    </header>

    <section class="knowledge-modules">
      <article
        v-for="module in knowledgeModules"
        :key="module.title"
        class="knowledge-module"
        @click="handleModuleSelect(module)"
      >
        <div class="knowledge-module__header">
          <span class="knowledge-module__tag">{{ module.tag }}</span>
          <span class="knowledge-module__duration">{{ module.duration }}</span>
        </div>
        <h2 class="knowledge-module__title">{{ module.title }}</h2>
        <p class="knowledge-module__description">{{ module.description }}</p>
        <div class="knowledge-module__footer">
          <span class="knowledge-module__progress">{{ module.progress }}</span>
          <span class="knowledge-module__cta">开始学习 →</span>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const knowledgeModules = [
  {
    id: "science",
    title: "科学探究课",
    description: "通过实验与案例分析，了解科学原理与现实生活的联系。",
    duration: "45 分钟",
    progress: "适合入门",
    tag: "STEM",
  },
  {
    id: "humanities",
    title: "人文故事馆",
    description: "从历史人物与文化故事中，感受跨越时空的人文精神。",
    duration: "30 分钟",
    progress: "沉浸体验",
    tag: "人文",
  },
  {
    id: "writing",
    title: "创意写作坊",
    description: "学习构思技巧与表达方式，打造属于自己的精彩故事。",
    duration: "40 分钟",
    progress: "提升表达",
    tag: "语文",
  },
  {
    id: "math",
    title: "数学思维营",
    description: "通过趣味题与逻辑推演，培养举一反三的数学思维能力。",
    duration: "35 分钟",
    progress: "挑战升级",
    tag: "数学",
  },
];

const handleBackToScene = () => {
  router.push({ name: "ScenePage" });
};

const handleBackHome = () => {
  router.push({ name: "HomePage" });
};

const handleModuleSelect = (module) => {
  router.push({
    name: "KnowledgeModulePage",
    params: { moduleId: module.id },
  });
};
</script>

<style scoped>
.knowledge-page {
  min-height: 100vh;
  padding: 48px 24px;
  background: linear-gradient(160deg, #f0f9ff 0%, #ffffff 45%, #fff5f8 100%);
  color: #1f2a44;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.knowledge-header {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
}

.knowledge-header__content {
  flex: 1;
}

.knowledge-header__title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: #1f2a44;
}

.knowledge-header__subtitle {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #4a5b84;
}

.knowledge-header__actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.knowledge-header__button {
  padding: 12px 24px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #4c6ef5, #5c8dff);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(76, 110, 245, 0.24);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.knowledge-header__button--home {
  background: linear-gradient(135deg, #ff6f91, #ff9472);
  box-shadow: 0 10px 24px rgba(255, 135, 148, 0.24);
}

.knowledge-header__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(76, 110, 245, 0.32);
}

.knowledge-header__button--home:hover {
  box-shadow: 0 16px 32px rgba(255, 135, 148, 0.32);
}

.knowledge-modules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.knowledge-module {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 16px 40px rgba(31, 42, 68, 0.12);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(76, 110, 245, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.knowledge-module:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 48px rgba(76, 110, 245, 0.24);
}

.knowledge-module__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.knowledge-module__tag {
  background: rgba(76, 110, 245, 0.12);
  color: #4c6ef5;
  border-radius: 12px;
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.knowledge-module__duration {
  font-size: 0.9rem;
  color: #6a789f;
}

.knowledge-module__title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #1f2a44;
}

.knowledge-module__description {
  font-size: 1rem;
  line-height: 1.7;
  color: #4a5b84;
  flex: 1;
}

.knowledge-module__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  color: #546287;
}

.knowledge-module__cta {
  color: #4c6ef5;
  font-weight: 600;
}

@media (max-width: 900px) {
  .knowledge-header {
    flex-direction: column;
    align-items: stretch;
  }

  .knowledge-header__actions {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

@media (max-width: 600px) {
  .knowledge-page {
    padding: 32px 16px;
  }

  .knowledge-header__title {
    font-size: 1.8rem;
  }

  .knowledge-header__subtitle {
    font-size: 0.95rem;
  }

  .knowledge-header__actions {
    gap: 8px;
  }

  .knowledge-header__button {
    width: 100%;
  }
}
</style>