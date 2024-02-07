import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginLayout from '../components/LoginLayout.vue'
import LoginForm from '../components/LoginForm.vue'
import MainPage from '../components/MainPage.vue'
import UserManagement from '../components/UserManagement.vue'
import ManageUserGroup from '../components/ManageUserGroup.vue'
import FileManagementList from '../components/FileManagementList.vue'
import StorageSpace from '../components/StorageSpace/StorageSpace.vue'

Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView,
//   },
//   {
//     path: '/about',
//     name: 'about',
    
//     component: () =>
//       import( '../views/AboutView.vue'),
//   },  {
//     path: '/menu',
//     name: 'mainPage',
//     component: MainPage,
//   },
//   {
//     path: '/user-management',
//     name: 'userManagement',
//     component: UserManagement,
//   },
//   {
//     path: '/manage-user-group',
//     name: 'manageUserGroup',
//     component: ManageUserGroup,
//   },
//   {
//     path: '/files-management',
//     name: 'FileManagementList',
//     component: FileManagementList,
//   },
//   {
//     path: '/storage-space',
//     name: 'StorageSpace',
//     component: StorageSpace,
//   },
// ]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes,
// })

// export default router
const routes = [
  {
    path: '/',
    component: LoginLayout, //  LoginLayout for the login page
    children: [
      {
        path: '',
        component: LoginForm,
      },
    ],
  },
  {
    path: '/menu',
    component: MainPage, // for pages with the sidebar
    children: [
      {
        path: '/user-management',
        name: 'userManagement',
      component: UserManagement
      },
      {
        path: '/manage-user-group',
        name: 'manageUserGroup',
        component: ManageUserGroup,
      },
      {
        path: '/files-management',
        name: 'FileManagementList',
        component: FileManagementList,
      },
      {
        path: '/storage-space',
        name: 'StorageSpace',
        component: StorageSpace,
      },
    ],
  },

];

const router = new VueRouter({
  routes,
});

export default router;