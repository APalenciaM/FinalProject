import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import User from '../components/User.vue'
import Dashboard from '../components/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/ironhack/:username',
      name: 'username',
      component: User,
      children: [
        {
          path: '/ironhack/:username/dashboard',
          name: 'dashboard',
          component: Dashboard
        }
      ]
    }
  ]
})

export default router
