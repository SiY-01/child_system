<template>
  <div id="app">
    <!-- 使用 router-view 显示当前匹配的组件 -->
    <router-view></router-view>
  </div>
</template>

<script>
// 不再需要引入 HelloWorld 组件
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
