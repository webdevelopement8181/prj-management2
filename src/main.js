import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import i18n from './store/modules/languages/languages';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faUpload } from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {faFile} from "@fortawesome/free-solid-svg-icons";
import{faUserGroup} from "@fortawesome/free-solid-svg-icons";
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
library.add(faUpload,faUser,faFile,faUserGroup, faDatabase)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
export const bus= new Vue();
new Vue({
  i18n,
  router,
  store: store,

  render: (h) => h(App),
}).$mount('#app')
