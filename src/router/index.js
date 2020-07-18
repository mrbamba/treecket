import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BoardList from '../views/BoardList.vue'
import BoardDetails from '../views/BoardDetails.vue'
import TicketDetails from '../components/board/TicketDetails.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/board',
    name: 'BoardList',
    component: BoardList
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Login
  },
  {
    path: '/board/:boardId',
    name: 'BoardDetails',
    component: BoardDetails,
    children: [
      {
        path: 'ticket/:ticketId',
        component: TicketDetails
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
