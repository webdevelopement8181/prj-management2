import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
// import VueI18n from 'vue-i18n';

// import Multiselect from 'vue-multiselect';


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Vue.use(VueI18n);
Vue.use(BootstrapVue)

Vue.use(IconsPlugin)
// Vue.component('multi-select', Multiselect);
Vue.config.productionTip = false

new Vue({
  router,
  store: store,

  render: (h) => h(App),
}).$mount('#app')
