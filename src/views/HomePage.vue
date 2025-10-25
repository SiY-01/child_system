<template>
  <div class="home-page">
    <header class="home-hero">
      <h1 class="home-hero__title">欢迎来到学习旅程</h1>
      <p class="home-hero__subtitle">
        在这里你可以探索不同的学习场景与互动模块，开启充满灵感的知识冒险。
      </p>
      <div class="home-hero__actions">
        <button class="home-hero__cta" @click="handleEnterScene">进入学习场景</button>
        <button class="home-hero__profile" @click="handleOpenProfile">个人档案</button>
      </div>
    </header>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleEnterScene = () => {
  router.push({ name: "ScenePage" });
};

const handleOpenProfile = () => {
  router.push({ name: "ProfilePage" });
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

.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.home-hero__cta,
.home-hero__profile {
  padding: 14px 36px;
  border-radius: 999px;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-width: 180px;
}

.home-hero__cta {
  background: linear-gradient(135deg, #4c6ef5, #5c8dff);
  color: #ffffff;
  box-shadow: 0 16px 36px rgba(76, 110, 245, 0.24);
}

.home-hero__profile {
  background: linear-gradient(135deg, #ff8ba7, #ffb3c1);
  color: #2d1a2f;
  box-shadow: 0 16px 36px rgba(255, 139, 167, 0.2);
}

.home-hero__cta:hover,
.home-hero__profile:hover {
  transform: translateY(-2px);
}

.home-hero__cta:hover {
  box-shadow: 0 20px 44px rgba(76, 110, 245, 0.3);
}

.home-hero__profile:hover {
  box-shadow: 0 20px 44px rgba(255, 139, 167, 0.28);
}

@media (max-width: 600px) {
  .home-hero__title {
    font-size: 2.1rem;
  }

  .home-hero__subtitle {
    font-size: 1rem;
  }

  .home-hero__actions {
    flex-direction: column;
    gap: 12px;
  }
}
</style>