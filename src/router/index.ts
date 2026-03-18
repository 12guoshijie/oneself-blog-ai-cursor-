import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('../views/PostsView.vue'),
  },
  {
    path: '/tags',
    name: 'tags',
    component: () => import('../views/TagsView.vue'),
  },
  {
    path: '/archive',
    name: 'archive',
    component: () => import('../views/ArchiveView.vue'),
  },
  {
    path: '/posts/:slug',
    name: 'post-detail',
    component: () => import('../views/PostDetailView.vue'),
    props: true,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/ai-lab',
    name: 'ai-lab',
    component: () => import('../views/AiLabView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

