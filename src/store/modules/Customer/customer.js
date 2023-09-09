// src/store/modules/customer.js
import axios from "axios";

const state = {
  customers: [],
};

const mutations = {
  SET_CUSTOMERS(state, customers) {
    state.customers = customers;
  },
};

const actions = {
  async fetchCustomers({ commit }) {
    try {
      const response = await axios.get("http://locajson-server --watch db.jsonlhost:3000/customers/");
      commit("SET_CUSTOMERS", response.data);
    } catch (error) {
      console.error(error);
    }
  },
};

const getters = {
  allCustomers(state) {
    return state.customers;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
