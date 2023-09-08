import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    usernames: JSON.parse(sessionStorage.getItem('usernames')) || [],
  },
  mutations: {
    ADD_USERNAME(state, username) {
      state.usernames.push(username);
      sessionStorage.setItem('usernames', JSON.stringify(state.usernames));
    },
    SET_USERNAMES(state, usernames) {
      state.usernames = usernames;
      sessionStorage.setItem('usernames', JSON.stringify(state.usernames));
    },
  },
  actions: {
    // Define actions if needed
  },
  getters: {
    getAllUsernames(state) {
      return state.usernames;
    },
  },
})
