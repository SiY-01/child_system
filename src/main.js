import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // 引入 Vue Router 配置
import 'font-awesome/css/font-awesome.css';

createApp(App)
  .use(router)  // 注册 Vue Router
  .mount('#app');
