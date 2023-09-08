import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// store.js
export const store = new Vuex.Store({
    state: {
      // Other state properties...
      usernames: [],
    },
    mutations: {
      // Define mutations to add and remove usernames if needed
      ADD_USERNAME(state, username) {
        state.usernames.push(username);
      },
      // Define other mutations if needed
    },
  })