<template>
  <div class="profile-page">
    <header class="profile-header">
      <div class="profile-header__intro">
        <h1>个人档案</h1>
        <p>定制专属形象，记录成长轨迹，并实时掌握课程学习进度。</p>
      </div>
      <button class="back-button" @click="handleBackHome">返回首页</button>
    </header>

    <main class="profile-main">
      <section class="profile-card">
        <div class="profile-avatar">
          <div class="avatar-frame">
            <img :src="currentAvatarPreview" alt="个人头像" />
          </div>
          <p class="avatar-hint">当前头像将同步应用到学习空间内的虚拟角色。</p>
        </div>

        <div class="profile-details">
          <label class="field">
            <span>姓名 / 昵称</span>
            <input v-model="profileForm.name" type="text" placeholder="输入你的名字" />
          </label>
          <label class="field field--textarea">
            <span>学习目标</span>
            <textarea
              v-model="profileForm.goal"
              rows="3"
              placeholder="记录你的学习期望，例如：每周完成 3 个知识模块"
            ></textarea>
          </label>

          <div class="avatar-selector">
            <span class="avatar-selector__label">选择预设头像</span>
            <div class="avatar-selector__list">
              <button
                v-for="option in avatarOptions"
                :key="option.id"
                class="avatar-selector__option"
                :class="{ 'avatar-selector__option--active': option.id === selectedAvatarId }"
                type="button"
                @click="handleAvatarSelect(option)"
              >
                <img :src="option.src" :alt="option.label" />
                <small>{{ option.label }}</small>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="personalization-section">
        <div class="personalization-section__intro">
          <h2>个性化课程生成</h2>
          <p>
            上传你的照片，我们会在生成课程时将学习角色的人脸替换成你的形象，带来更加沉浸的互动体验。
          </p>
          <ul>
            <li>请上传清晰的正面照片，推荐使用 JPG 或 PNG 格式。</li>
            <li>系统会为课程中的角色自动换脸，仅用于学习体验展示。</li>
            <li>可随时重新上传，立即更新课程角色形象。</li>
          </ul>
        </div>
        <div class="personalization-section__action">
          <div class="personalization-preview">
            <img :src="currentAvatarPreview" alt="个性化课程预览头像" />
            <span class="personalization-preview__badge">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm-1 15-5-5 1.41-1.41L11 13.17l5.59-5.58L18 9Z"
                  fill="currentColor"
                />
              </svg>
              课程角色示例
            </span>
          </div>
          <label class="personalization-upload">
            <input type="file" accept="image/*" @change="handlePhotoUpload" />
            <span class="personalization-upload__label">上传我的照片</span>
          </label>
          <p class="personalization-status" :class="{ 'personalization-status--success': hasCustomPhoto }">
            <template v-if="hasCustomPhoto">
              已生成个性化课程形象，课程中的角色人脸已替换为你的照片。
              <span class="personalization-status__filename">（文件：{{ uploadedPhotoName }}）</span>
            </template>
            <template v-else>
              尚未上传个性化照片，默认使用你选择的预设头像。
            </template>
          </p>
        </div>
      </section>

      <section class="analysis-section">
        <h2>学习进度分析</h2>
        <div class="analysis-grid">
          <article
            v-for="card in analysisCards"
            :key="card.title"
            class="analysis-card"
          >
            <h3>{{ card.title }}</h3>
            <p class="analysis-card__value">{{ card.value }}</p>
            <p class="analysis-card__desc">{{ card.desc }}</p>
          </article>
        </div>

        <div class="progress-overview">
          <div class="progress-summary">
            <h3>课程完成度</h3>
            <div class="progress-bar">
              <div class="progress-bar__fill" :style="{ width: overallCompletion + '%' }"></div>
            </div>
            <p class="progress-label">已完成 {{ overallCompletion }}%</p>
          </div>
          <ul class="progress-tags">
            <li v-for="(item, index) in progressHighlights" :key="index">{{ item }}</li>
          </ul>
        </div>

        <div class="course-table">
          <h3>课程成绩详情</h3>
          <table>
            <thead>
              <tr>
                <th>课程名称</th>
                <th>完成度</th>
                <th>平均成绩</th>
                <th>本周变化</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="course in courseProgress" :key="course.id">
                <td>
                  <span class="course-name">{{ course.name }}</span>
                  <span class="course-note">{{ course.note }}</span>
                </td>
                <td>{{ course.completion }}%</td>
                <td>{{ course.score }} 分</td>
                <td :class="{ 'trend-positive': course.delta > 0, 'trend-negative': course.delta < 0 }">
                  {{ formatDelta(course.delta) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const avatarOptions = [
  {
    id: "sunny",
    label: "阳光先锋",
    src: "https://avatars.dicebear.com/api/big-smile/sunny.svg",
  },
  {
    id: "dreamer",
    label: "梦想探索者",
    src: "https://avatars.dicebear.com/api/big-smile/dreamer.svg",
  },
  {
    id: "thinker",
    label: "智慧思考者",
    src: "https://avatars.dicebear.com/api/big-smile/thinker.svg",
  },
  {
    id: "sprout",
    label: "成长小芽",
    src: "https://avatars.dicebear.com/api/big-smile/sprout.svg",
  },
];

const profileForm = reactive({
  name: "学习小达人",
  goal: "保持好奇心，每天完成 1 节互动课程并做好总结。",
  selectedAvatar: avatarOptions[0].src,
});

const selectedAvatarId = ref(avatarOptions[0].id);
const uploadedPhotoName = ref("");
const customPhotoUrl = ref("");

const courseProgress = ref([
  {
    id: "science",
    name: "科学探秘",
    completion: 92,
    score: 95,
    delta: 0.08,
    note: "擅长实验探究，保持领先",
  },
  {
    id: "history",
    name: "历史足迹",
    completion: 76,
    score: 88,
    delta: 0.04,
    note: "故事记忆力强，继续巩固细节",
  },
  {
    id: "math",
    name: "数学奇遇记",
    completion: 64,
    score: 82,
    delta: -0.03,
    note: "需要多练逻辑推理题型",
  },
  {
    id: "art",
    name: "创意美术",
    completion: 58,
    score: 79,
    delta: 0.1,
    note: "创意十足，尝试更多色彩搭配",
  },
]);

const averageScore = computed(() => {
  if (!courseProgress.value.length) return 0;
  const total = courseProgress.value.reduce((sum, course) => sum + course.score, 0);
  return Math.round(total / courseProgress.value.length);
});

const overallCompletion = computed(() => {
  if (!courseProgress.value.length) return 0;
  const total = courseProgress.value.reduce((sum, course) => sum + course.completion, 0);
  return Math.round(total / courseProgress.value.length);
});

const bestCourse = computed(() => {
  if (!courseProgress.value.length) return null;
  return courseProgress.value.reduce((top, course) => (course.score > top.score ? course : top));
});

const focusCourse = computed(() => {
  if (!courseProgress.value.length) return null;
  return courseProgress.value.reduce((lowest, course) =>
    course.completion < lowest.completion ? course : lowest
  );
});

const analysisCards = computed(() => {
  if (!courseProgress.value.length) {
    return [];
  }

  return [
    {
      title: "平均成绩",
      value: `${averageScore.value} 分`,
      desc: "综合表现稳步提升，继续保持当前节奏。",
    },
    {
      title: "最佳课程",
      value: bestCourse.value?.name ?? "-",
      desc: "建议挑战更高难度任务，争取获得荣誉徽章。",
    },
    {
      title: "提升重点",
      value: focusCourse.value?.name ?? "-",
      desc: "可安排专项复习，巩固知识盲点。",
    },
    {
      title: "学习活跃度",
      value: overallCompletion.value >= 85 ? "高度活跃" : "稳健进步",
      desc: `本周课程完成度达 ${overallCompletion.value}%`,
    },
  ];
});

const progressHighlights = computed(() => {
  const highlights = [];
  if (bestCourse.value) {
    highlights.push(`最佳课程：${bestCourse.value.name}`);
  }
  highlights.push(`平均成绩：${averageScore.value} 分`);
  highlights.push(`整体完成度：${overallCompletion.value}%`);
  if (focusCourse.value) {
    highlights.push(`建议重点关注：${focusCourse.value.name}`);
  }
  return highlights;
});

const currentAvatarPreview = computed(
  () => customPhotoUrl.value || profileForm.selectedAvatar
);

const hasCustomPhoto = computed(() => Boolean(customPhotoUrl.value));

const handleAvatarSelect = (option) => {
  selectedAvatarId.value = option.id;
  profileForm.selectedAvatar = option.src;
  if (customPhotoUrl.value) {
    URL.revokeObjectURL(customPhotoUrl.value);
    customPhotoUrl.value = "";
    uploadedPhotoName.value = "";
  }
};

const handlePhotoUpload = (event) => {
  const [file] = event.target.files;
  if (!file) return;

  if (customPhotoUrl.value) {
    URL.revokeObjectURL(customPhotoUrl.value);
  }

  customPhotoUrl.value = URL.createObjectURL(file);
  uploadedPhotoName.value = file.name;
  selectedAvatarId.value = "";
};

const formatDelta = (delta) => {
  const percentage = Math.round(delta * 100);
  if (percentage > 0) return `+${percentage}%`;
  if (percentage < 0) return `${percentage}%`;
  return "0%";
};

const handleBackHome = () => {
  router.push({ name: "HomePage" });
};

onBeforeUnmount(() => {
  if (customPhotoUrl.value) {
    URL.revokeObjectURL(customPhotoUrl.value);
  }
});
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  padding: 40px 24px 64px;
  background: linear-gradient(160deg, #f4f7ff 0%, #ffffff 55%, #fef1ff 100%);
  color: #1f2a44;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

.profile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 32px;
}

.profile-header__intro h1 {
  font-size: 2.4rem;
  margin-bottom: 8px;
}

.profile-header__intro p {
  color: #4a5b84;
  font-size: 1.05rem;
}

.back-button {
  padding: 10px 20px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #4c6ef5, #5c8dff);
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(76, 110, 245, 0.24);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(76, 110, 245, 0.28);
}

.profile-main {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.profile-card {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 32px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.88);
  border-radius: 24px;
  box-shadow: 0 24px 60px rgba(31, 42, 68, 0.08);
}

.profile-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.avatar-frame {
  width: 200px;
  height: 200px;
  border-radius: 24px;
  overflow: hidden;
  border: 4px solid rgba(76, 110, 245, 0.2);
  background: linear-gradient(135deg, #dbe4ff, #edf2ff);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-hint {
  font-size: 0.92rem;
  color: #5a6b95;
  text-align: center;
}

.personalization-section {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 36px;
  background: rgba(255, 255, 255, 0.88);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 24px 60px rgba(31, 42, 68, 0.08);
}

.personalization-section__intro {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.personalization-section__intro h2 {
  font-size: 1.8rem;
  color: #1f2a44;
}

.personalization-section__intro p {
  color: #4a5b84;
  line-height: 1.6;
}

.personalization-section__intro ul {
  padding-left: 20px;
  color: #5a6b95;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.personalization-section__action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.personalization-preview {
  position: relative;
  width: 220px;
  height: 220px;
  border-radius: 32px;
  overflow: hidden;
  border: 3px solid rgba(76, 110, 245, 0.25);
  box-shadow: 0 20px 40px rgba(76, 110, 245, 0.18);
}

.personalization-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.personalization-preview__badge {
  position: absolute;
  left: 12px;
  bottom: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(76, 110, 245, 0.92);
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
}

.personalization-preview__badge svg {
  width: 18px;
  height: 18px;
}

.personalization-upload {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 999px;
  border: 1px dashed rgba(76, 110, 245, 0.5);
  background: rgba(231, 236, 255, 0.75);
  color: #3d5af1;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.personalization-upload:hover {
  background: rgba(231, 236, 255, 0.95);
  transform: translateY(-2px);
}

.personalization-upload input {
  display: none;
}

.personalization-upload__label {
  font-weight: 600;
  letter-spacing: 0.02em;
}

.personalization-status {
  font-size: 0.95rem;
  color: #5a6b95;
  text-align: center;
  line-height: 1.6;
}

.personalization-status--success {
  color: #217856;
  font-weight: 600;
}

.personalization-status__filename {
  display: inline-block;
  margin-left: 4px;
  font-weight: 500;
  color: inherit;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.field span {
  font-weight: 600;
  color: #2c3a66;
}

.field input,
.field textarea {
  border: 1px solid rgba(108, 122, 165, 0.26);
  border-radius: 14px;
  padding: 12px 16px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  transition: border 0.2s ease, box-shadow 0.2s ease;
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: rgba(76, 110, 245, 0.65);
  box-shadow: 0 0 0 3px rgba(76, 110, 245, 0.15);
}

.field--textarea textarea {
  resize: none;
}

.avatar-selector {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.avatar-selector__label {
  font-weight: 600;
  color: #2c3a66;
}

.avatar-selector__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 16px;
}

.avatar-selector__option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: 18px;
  padding: 12px;
  background: rgba(244, 247, 255, 0.8);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease;
}

.avatar-selector__option img {
  width: 72px;
  height: 72px;
}

.avatar-selector__option small {
  color: #4a5b84;
}

.avatar-selector__option:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(76, 110, 245, 0.16);
}

.avatar-selector__option--active {
  border-color: rgba(76, 110, 245, 0.75);
  box-shadow: 0 12px 28px rgba(76, 110, 245, 0.18);
}

.analysis-section {
  display: flex;
  flex-direction: column;
  gap: 28px;
  background: rgba(255, 255, 255, 0.88);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 24px 60px rgba(31, 42, 68, 0.08);
}

.analysis-section h2 {
  font-size: 1.8rem;
  color: #1f2a44;
}

.analysis-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 18px;
}

.analysis-card {
  padding: 20px;
  border-radius: 20px;
  background: linear-gradient(145deg, rgba(236, 243, 255, 0.85), rgba(255, 245, 252, 0.9));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 16px 32px rgba(76, 110, 245, 0.12);
}

.analysis-card h3 {
  font-size: 1.05rem;
  color: #3a4a72;
  margin-bottom: 8px;
}

.analysis-card__value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2a44;
}

.analysis-card__desc {
  margin-top: 6px;
  color: #5a6b95;
  line-height: 1.5;
}

.progress-overview {
  display: grid;
  grid-template-columns: minmax(0, 320px) 1fr;
  gap: 24px;
  align-items: center;
}

.progress-summary {
  background: linear-gradient(135deg, rgba(76, 110, 245, 0.12), rgba(92, 141, 255, 0.16));
  border-radius: 20px;
  padding: 24px;
}

.progress-summary h3 {
  margin-bottom: 14px;
  color: #2c3a66;
}

.progress-bar {
  width: 100%;
  height: 14px;
  background: rgba(202, 213, 255, 0.6);
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background: linear-gradient(135deg, #4c6ef5, #8da4ff);
  border-radius: 999px;
}

.progress-label {
  margin-top: 12px;
  color: #4a5b84;
  font-weight: 600;
}

.progress-tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 0;
  margin: 0;
}

.progress-tags li {
  padding: 10px 16px;
  background: rgba(255, 139, 167, 0.16);
  color: #b23b5d;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 600;
}

.course-table {
  background: rgba(244, 247, 255, 0.65);
  border-radius: 20px;
  padding: 24px;
}

.course-table h3 {
  margin-bottom: 16px;
  color: #2c3a66;
}

.course-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.98rem;
}

.course-table th,
.course-table td {
  text-align: left;
  padding: 14px 12px;
}

.course-table thead {
  background: rgba(76, 110, 245, 0.12);
  color: #2c3a66;
}

.course-table tbody tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.85);
}

.course-table tbody tr + tr {
  border-top: 1px solid rgba(108, 122, 165, 0.16);
}

.course-name {
  font-weight: 600;
  display: block;
  color: #1f2a44;
}

.course-note {
  display: block;
  font-size: 0.85rem;
  color: #5a6b95;
  margin-top: 4px;
}

.trend-positive {
  color: #1b9a5c;
  font-weight: 600;
}

.trend-negative {
  color: #c92a2a;
  font-weight: 600;
}

@media (max-width: 1024px) {
  .profile-card {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .profile-details {
    text-align: left;
  }

  .personalization-section {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .personalization-section__intro {
    align-items: center;
  }

  .personalization-section__intro ul {
    text-align: left;
  }

  .progress-overview {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .profile-page {
    padding: 32px 16px 48px;
  }

  .profile-header__intro h1 {
    font-size: 1.9rem;
  }

  .profile-card,
  .analysis-section {
    padding: 24px;
  }

  .avatar-frame {
    width: 160px;
    height: 160px;
  }

  .personalization-section {
    padding: 24px;
    gap: 24px;
  }

  .personalization-preview {
    width: 180px;
    height: 180px;
  }

  .analysis-grid {
    grid-template-columns: 1fr;
  }
}
</style>