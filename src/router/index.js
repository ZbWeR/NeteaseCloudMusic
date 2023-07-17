import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/itemMusic',
    name: 'ItemMusic',
    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/userInfo',
    name: 'UserInfo',
    component: () => import(/* webpackChunkName: "userInfo" */ '../views/UserInfo.vue'),
    // 登录状态判定
    beforeEnter: (to, from, next) => {
      if (store.state.loginState == false) next({ name: 'Login' })
      else next()
    }

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from) => {
  if (to.path === '/login')
    store.commit("updateShowFooterMusic", false);
  else
    store.commit("updateShowFooterMusic", true);
})

export default router
