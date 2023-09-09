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
        // console.error("Fetching customers...");
        try {
          const response = await axios.get("http://localhost:3000/customers/");
          if (response.status === 200) {
            commit("SET_CUSTOMERS", response.data);
          } else {
            console.error("Failed to fetch customer data.");
          }
        } catch (error) {
          console.error("Error fetching customer data:", error);
        }
      
      },
   
};

const getters = {
  allCustomers(state) {
    return state.customers;
  },
};

export default { namespaced: true, state, mutations, actions, getters, };