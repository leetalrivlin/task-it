import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
// import chat from './views/chat.vue'
// import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import userDetails from './views/user-details.vue'
import boardList from './views/board-list.vue'
import board from './views/board.vue'
import taskDetails from './cmps/task-details.vue'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'loginSignup',
      component: loginSignup
    },
    {
      path: '/user/:id',
      name: 'user-details',
      component: userDetails
    },
    {
      path: '/board',
      name: 'board-list',
      component: boardList
    },
    {
      path: '/board/:boardId/',
      name: 'board',
      component: board,
      children: [
        {
          path: ':taskId',
          component: taskDetails,
        }
      ]
    }
    // {
    //   path: '/chat',
    //   name: 'chat',
    //   component: chat
    // },
  ]
})
