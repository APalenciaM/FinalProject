import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import User from '../components/User.vue'
import Dashboard from '../components/Dashboard.vue'
import NewTask from '../components/NewTask.vue'
import EditTask from '../components/EditTask.vue'
import TaskCreated from '../components/TaskCreated.vue'
import TaskDeleted from '../components/TaskDeleted.vue'
import TaskEdited from '../components/TaskEdited.vue'
import Unauthorized from '../components/Unauthorized.vue'

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
          component: Dashboard,
          children: [
            {
              path: '',
              name: '/',
              component: NewTask,
            },
            {
              path: '/ironhack/:username/dashboard/new-task',
              name: 'new-task',
              component: NewTask
            },
            {
              path: '/ironhack/:username/dashboard/task-created',
              name: 'task-created',
              component: TaskCreated
            },            {
              path: '/ironhack/:username/dashboard/task-edited',
              name: 'task-edited',
              component: TaskEdited
            },            {
              path: '/ironhack/:username/dashboard/task-deleted',
              name: 'task-deleted',
              component: TaskDeleted
            },
            {
              path: '/ironhack/:username/dashboard/edit-task/:id',
              name: 'edit-task',
              component: EditTask
            }
          ]
        }
      ]
    },
    {
      path: '/404',
      name: 'page-not-found',
      component: Unauthorized,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ]
})

export default router
