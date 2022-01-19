import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/task-list',
    name: 'task-list',
    component: () => import('../views/TaskList.vue')
  },
  {
    path: '/task/:id',
    name: 'task-show',
    component: () => import('../views/TaskShow.vue'),
    props: true
  },
  {
    path: '/task/create',
    name: 'task-create',
    component: () => import('../views/TaskCreate.vue')
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
