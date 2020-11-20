import DefaultLayout from '../layout/DefaultLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('../views/index.vue'),
        meta: {
          title: '記帳',
        },
      },
      {
        path: '/report',
        name: 'report',
        component: () => import('../views/report.vue'),
        meta: {
          title: '報表',
        },
      },
      {
        path: '/hi/:name',
        name: '_name',
        component: () => import('../views/hi/_name.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('../views/error.vue'),
  },
  {
    path: '/*',
    redirect: '/',
  },
]

// const router = new VueRouter({
//   // mode: 'history',
//   // base: '/pages/',
//   routes,
// })

export default createRouter({
  history: createWebHistory(),
  routes,
})
