import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import i18n from './store/modules/languages/languages';


// import VueI18n from 'vue-i18n';
// import en from './locales/en'
// import fa from './locales/farsi'


// Vue.use(VueI18n);

// const i18n = new VueI18n({
//   locale: 'en', // Set the default locale
//   messages: {
//     en,
//     fa
//   },
// });

// export { i18n };


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Vue.use(VueI18n);
Vue.use(BootstrapVue)

Vue.use(IconsPlugin)
// Vue.component('multi-select', Multiselect);
Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store: store,

  render: (h) => h(App),
}).$mount('#app')
