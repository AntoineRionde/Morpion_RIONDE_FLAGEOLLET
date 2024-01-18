import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/ProfileView.vue')
    },
    {
            path: '/games/:id',
            name: 'game',
            component: () => import('../views/Game.vue')
    },
    {
        path: '/join',
        name: 'join',
        component: () => import('../views/JoinView.vue')
    }
  ]
})

export default router
