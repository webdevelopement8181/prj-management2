// src/store/modules/customer.js
import axios from "axios";

const state = {
  customers: [],
};

const mutations = {
  SET_CUSTOMERS(state, customers) {
    state.customers = customers;
  },
 ADD_CUSTOMER(state, newCustomer) {
  state.customers.push(newCustomer);
}
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
      async addCustomer({ commit }, newCustomer) {
        try {
          // Simultaneously commit the mutation to update the store
          commit("ADD_CUSTOMER", newCustomer);
      
          // Send the request to the server
          const response = await axios.post("http://localhost:3000/customers/", newCustomer);
      
          if (response.status === 201) {
            console.log('added')
            // Data was added on the server successfully, no need to do anything
          } else {
            console.error("Failed to add customer. Server returned:", response);
            // If there's an issue with the server, you might want to handle it here.
          }
        } catch (error) {
          console.error("Error adding customer:", error);
          // Handle any errors related to the HTTP request here.
        }
      }
      
   
};

const getters = {
  allCustomers(state) {
    return state.customers;
  },
};

export default { namespaced: true, state, mutations, actions, getters, };