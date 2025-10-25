import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/home",
    name: "HomePage",
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: () => import("../views/ProfilePage.vue"),
  },
  {
    path: "/scene",
    name: "ScenePage",
    component: () => import("../views/ScenePage.vue"),
  },
  {
    path: "/knowledge",
    name: "KnowledgePage",
    component: () => import("../views/KnowledgePage.vue"),
  },
  {
    path: "/knowledge/modules/:moduleId",
    name: "KnowledgeModulePage",
    component: () => import("../views/KnowledgeModulePage.vue"),
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "LoginPage" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

export default router;