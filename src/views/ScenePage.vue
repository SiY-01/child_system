<template>
  <div class="scene-page">
    <button class="scene-page__home-button" @click="handleBackHome">
      返回首页
    </button>

    <header class="scene-page__header">
      <h1 class="scene-page__title">知识探险之旅</h1>
      <p class="scene-page__subtitle">
        通过丰富的学习内容与互动体验，开启你的全新成长之路。
      </p>
    </header>

    <section class="scene-page__content">
      <article class="scene-page__card">
        <h2>今日亮点</h2>
        <p>
          精心准备的知识模块将帮你高效掌握重点内容，并提供循序渐进的学习路线。
        </p>
      </article>

      <article class="scene-page__card">
        <h2>互动挑战</h2>
        <p>
          通过趣味化的任务与实时反馈，在游戏化的场景中巩固所学知识。
        </p>
      </article>
    </section>

    <section class="scene-page__actions">
      <button
        class="scene-page__button scene-page__button--primary"
        @click="handleKnowledgeClick"
      >
        知识学习
      </button>
      <button
        class="scene-page__button scene-page__button--secondary"
        @click="handleGameClick"
      >
        互动游戏
      </button>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleKnowledgeClick = () => {
  router.push({ name: "KnowledgePage" });
};

const handleGameClick = () => {
  console.log("进入互动游戏模块");
};

const handleBackHome = () => {
  router.push({ name: "HomePage" });
};
</script>

<style scoped>
.scene-page {
  min-height: 100vh;
  padding: 48px 24px;
  background: linear-gradient(160deg, #f5f7ff 0%, #ffffff 60%, #f0f4ff 100%);
  display: flex;
  flex-direction: column;
  gap: 32px;
  color: #1f2a44;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

.scene-page__home-button {
  align-self: flex-start;
  padding: 10px 22px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #ff6f91, #ff9472);
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(255, 135, 148, 0.24);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.scene-page__home-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(255, 135, 148, 0.32);
}

.scene-page__header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto;
}

.scene-page__title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.scene-page__subtitle {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #46567a;
}

.scene-page__content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.scene-page__card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 12px 32px rgba(31, 42, 68, 0.1);
  backdrop-filter: blur(6px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.scene-page__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(31, 42, 68, 0.16);
}

.scene-page__card h2 {
  font-size: 1.4rem;
  margin-bottom: 12px;
  color: #24355c;
}

.scene-page__card p {
  line-height: 1.8;
  color: #546287;
}

.scene-page__actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
  margin: 0 auto;
  padding: 32px 0;
}

.scene-page__button {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 1.35rem;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scene-page__button--primary {
  background: linear-gradient(135deg, #4c6ef5, #5c8dff);
  color: #ffffff;
  box-shadow: 0 10px 24px rgba(76, 110, 245, 0.3);
}

.scene-page__button--secondary {
  background: #ffffff;
  color: #4c6ef5;
  border: 2px solid #4c6ef5;
  box-shadow: 0 10px 24px rgba(76, 110, 245, 0.16);
}

.scene-page__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(76, 110, 245, 0.25);
}

.scene-page__button:active {
  transform: translateY(0);
  box-shadow: none;
}

@media (max-width: 600px) {
  .scene-page {
    padding: 32px 16px;
  }

  .scene-page__title {
    font-size: 2rem;
  }

  .scene-page__actions {
    flex-direction: column;
    gap: 24px;
  }

  .scene-page__button {
    width: 160px;
    height: 160px;
    font-size: 1.2rem;
  }
}
</style>