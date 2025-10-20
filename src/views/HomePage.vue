<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="logo">个性化儿童学习系统</div>
      <nav class="navbar">
        <ul>
          <li><router-link to="/home">首页</router-link></li>
          <li><router-link to="/about">关于我们</router-link></li>
          <li><router-link to="/contact">联系我们</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- 页面中间内容 -->
    <div class="main-content">
      <h1>欢迎使用个性化儿童学习系统</h1>
      <div class="button-container">
        <button @click="navigateTo('Scene')" class="action-button blue">学习场景</button>
        <button @click="navigateTo('Task')" class="action-button yellow">学习任务</button>
        <button @click="navigateTo('Profile')" class="action-button green">学习档案</button>
      </div>
    </div>

    <!-- 底部部分 -->
    <footer class="footer">
      <p>© 2025 个性化儿童学习系统 | 版权声明</p>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(page) {
      this.$router.push({ name: page });
    }
  }
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #f0f8ff;
  padding: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.navbar {
  margin-top: 10px;
}

.navbar ul {
  list-style: none;
  padding: 0;
}

.navbar li {
  display: inline;
  margin: 0 15px;
}

.navbar a {
  text-decoration: none;
  color: #333;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  padding: 50px 20px;
}

.main-content h1 {
  font-size: 28px;
  color: #333;
}

.button-container {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}

.action-button {
  padding: 20px 40px;
  font-size: 18px;
  color: #fff;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  opacity: 0.8;
}

.blue {
  background-color: #4d8df3;
}

.yellow {
  background-color: #f9d423;
}

.green {
  background-color: #48c78e;
}

.footer {
  background-color: #fff;
  text-align: center;
  padding: 10px;
  border-top: 1px solid #ddd;
  font-size: 14px;
}
</style>
