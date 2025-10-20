import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage.vue';  // 引入自定义的首页组件
import Scene from '@/views/ScenePage.vue';
import Task from '@/views/TaskPage.vue';
import Profile from '@/views/ProfilePage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,  // 指向你自定义的首页组件
  },
  {
    path: '/scene',
    name: 'Scene',
    component: Scene,
  },
  {
    path: '/task',
    name: 'Task',
    component: Task,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
