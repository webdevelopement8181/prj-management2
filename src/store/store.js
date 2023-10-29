import Vue from 'vue'
import Vuex from 'vuex'
import customerModule from './modules/customer/customer'
import groupModule from './modules/group/group'
import languageModule from './modules/languages/languages'
// import usernamesModule from './modules/usernames/usernames'
// import groupModule from './modules/customer/group';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
  
    usernames: JSON.parse(sessionStorage.getItem('usernames')) || [],
    customers: [],
  },

  mutations: {
    ADD_USERNAME(state, username) {
      state.usernames.push(username)
      sessionStorage.setItem('usernames', JSON.stringify(state.usernames))
    },
    SET_USERNAMES(state, usernames) {
      state.usernames = usernames
      sessionStorage.setItem('usernames', JSON.stringify(state.usernames))
    },
  },
  actions: {
    // Define actions if needed
  },
  getters: {
    getAllUsernames: (state) => {
      return state.usernames
    },
    getUserName: (state) => {
      const length = state.usernames.length
      return length > 0 ? state.usernames[length - 1] : ''
    },
  },
  modules: {
    customer: customerModule,
    group: groupModule,
languages:languageModule

  },
})
// languageModule.actions.updateI18nLocale = function ({ rootState }, language) {
//   const i18n = rootState.i18n; // Access the i18n instance from the root state
//   if (i18n) {
//     i18n.locale = language;
//   }
// };
