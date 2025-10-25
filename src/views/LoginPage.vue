<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-card__header">
        <h1 class="login-card__title">智慧学习平台登录</h1>
        <p class="login-card__subtitle">请通过人脸识别完成身份验证后进入主页</p>
      </div>
      <div class="login-card__body">
        <div class="camera-frame" :class="[`camera-frame--${recognitionStatus}`]">
          <div class="camera-frame__lens">
            <div class="camera-frame__indicator" v-if="recognitionStatus === 'scanning'"></div>
            <span v-else class="camera-frame__placeholder">面向摄像头保持静止</span>
          </div>
        </div>
        <div class="login-card__status">
          <Transition name="fade">
            <p :key="statusMessage" class="status-message" :class="[`status-message--${recognitionStatus}`]">
              {{ statusMessage }}
            </p>
          </Transition>
        </div>
        <div class="login-card__actions">
          <button
            type="button"
            class="login-button"
            :disabled="recognitionStatus === 'scanning'"
            @click="startRecognition"
          >
            {{ recognitionStatus === 'scanning' ? "正在识别..." : "开始人脸识别" }}
          </button>
          <button
            v-if="recognitionStatus === 'success'"
            type="button"
            class="retry-button"
            @click="resetRecognition"
          >
            重新识别
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const recognitionStatus = ref("idle");

const statusMessage = computed(() => {
  switch (recognitionStatus.value) {
    case "scanning":
      return "正在进行人脸识别，请保持正对摄像头";
    case "success":
      return "识别成功，正在进入主页";
    case "error":
      return "识别失败，请重新尝试";
    default:
      return "点击下方按钮开始人脸识别";
  }
});

const startRecognition = () => {
  if (recognitionStatus.value === "scanning") return;

  recognitionStatus.value = "scanning";

  window.setTimeout(() => {
    const success = true;
    recognitionStatus.value = success ? "success" : "error";
  }, 1800);
};

const resetRecognition = () => {
  recognitionStatus.value = "idle";
};

watch(recognitionStatus, (status) => {
  if (status === "success") {
    window.setTimeout(() => {
      router.replace({ name: "HomePage" });
    }, 900);
  }
});
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  background: radial-gradient(circle at top, #f5f8ff 0%, #eef2ff 45%, #e8f3ff 100%);
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

.login-card {
  width: min(680px, 100%);
  background: rgba(255, 255, 255, 0.92);
  border-radius: 28px;
  box-shadow: 0 28px 60px rgba(92, 123, 255, 0.18);
  padding: 40px 48px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  backdrop-filter: blur(16px);
}

.login-card__header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.login-card__title {
  font-size: 2.2rem;
  color: #1f2a44;
  font-weight: 700;
}

.login-card__subtitle {
  color: #52618f;
  font-size: 1rem;
  line-height: 1.6;
}

.login-card__body {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.camera-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(76, 110, 245, 0.08), rgba(92, 141, 255, 0.12));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.camera-frame--idle {
  border-color: rgba(76, 110, 245, 0.3);
}

.camera-frame--scanning {
  border-color: rgba(76, 110, 245, 0.7);
}

.camera-frame--success {
  border-color: rgba(76, 185, 120, 0.8);
}

.camera-frame--error {
  border-color: rgba(240, 96, 96, 0.8);
}

.camera-frame__lens {
  position: relative;
  width: 86%;
  height: 76%;
  border-radius: 20px;
  border: 2px dashed rgba(76, 110, 245, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.55);
  overflow: hidden;
}

.camera-frame__placeholder {
  color: #5c6fa8;
  font-size: 1rem;
  text-align: center;
}

.camera-frame__indicator {
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, rgba(92, 141, 255, 0) 0%, rgba(92, 141, 255, 0.85) 50%, rgba(92, 141, 255, 0) 100%);
  animation: scanning 1.4s infinite;
}

@keyframes scanning {
  0% {
    transform: translateY(-140px);
  }
  100% {
    transform: translateY(140px);
  }
}

.login-card__status {
  min-height: 24px;
  display: flex;
  justify-content: center;
}

.status-message {
  font-size: 1rem;
  color: #4a5b84;
  transition: color 0.3s ease;
}

.status-message--success {
  color: #3aa76d;
}

.status-message--error {
  color: #ea6363;
}

.login-card__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.login-button,
.retry-button {
  padding: 14px 32px;
  border-radius: 999px;
  border: none;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.login-button {
  background: linear-gradient(135deg, #4c6ef5, #5c8dff);
  color: #ffffff;
  box-shadow: 0 18px 40px rgba(76, 110, 245, 0.28);
}

.login-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
  box-shadow: none;
}

.login-button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 24px 48px rgba(76, 110, 245, 0.36);
}

.retry-button {
  background: rgba(76, 110, 245, 0.12);
  color: #4c5f96;
  box-shadow: none;
}

.retry-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 36px rgba(92, 141, 255, 0.18);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

@media (max-width: 600px) {
  .login-card {
    padding: 32px 24px;
    border-radius: 24px;
  }

  .login-card__title {
    font-size: 1.8rem;
  }

  .login-card__subtitle {
    font-size: 0.95rem;
  }

  .login-button,
  .retry-button {
    width: 100%;
    justify-content: center;
  }

  .login-card__actions {
    flex-direction: column;
  }
}
</style>