import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainPage from '../components/MainPage.vue'
import UserManagement from '../components/UserManagement.vue'
import ManageUserGroup from '../components/ManageUserGroup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/menu',
    name: 'mainPage',
    component: MainPage,
  },
  {
    path: '/user-management',
    name: 'userManagement',
    component: UserManagement,
  },
  {
    path: '/manage-user-group',
    name: 'manageUserGroup',
    component: ManageUserGroup,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
