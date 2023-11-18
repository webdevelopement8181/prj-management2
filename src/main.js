import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import i18n from './store/modules/languages/languages';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false
export const bus= new Vue();
new Vue({
  i18n,
  router,
  store: store,

  render: (h) => h(App),
}).$mount('#app')
