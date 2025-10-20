<template>
  <div class="home-page">
    <header class="home-hero">
      <h1 class="home-hero__title">欢迎来到学习旅程</h1>
      <p class="home-hero__subtitle">
        在这里你可以探索不同的学习场景与互动模块，开启充满灵感的知识冒险。
      </p>
      <button class="home-hero__cta" @click="handleEnterScene">进入学习场景</button>
    </header>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleEnterScene = () => {
  router.push({ name: "ScenePage" });
};
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  background: linear-gradient(160deg, #f4f7ff 0%, #ffffff 50%, #fff0f6 100%);
  color: #1f2a44;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

.home-hero {
  max-width: 720px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.home-hero__title {
  font-size: 2.8rem;
  font-weight: 700;
}

.home-hero__subtitle {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a5b84;
}

.home-hero__cta {
  align-self: center;
  padding: 14px 36px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #4c6ef5, #5c8dff);
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 16px 36px rgba(76, 110, 245, 0.24);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.home-hero__cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 44px rgba(76, 110, 245, 0.3);
}

@media (max-width: 600px) {
  .home-hero__title {
    font-size: 2.1rem;
  }

  .home-hero__subtitle {
    font-size: 1rem;
  }
}
</style>