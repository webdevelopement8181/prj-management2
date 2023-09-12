import Vue from 'vue'
import Vuex from 'vuex'
import customerModule from './modules/customer/customer';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    usernames: JSON.parse(sessionStorage.getItem('usernames')) || [],
    customers:[]
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
    getAllUsernames: (state) => {
      return state.usernames;
    },
    getUserName: (state) => {
      const length = state.usernames.length;
      return length > 0 ? state.usernames[length - 1] : '';
    }
  },
  modules: {
    customer: customerModule, // Register the customer module
  },
})
