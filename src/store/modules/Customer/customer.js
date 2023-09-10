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
},
  UPDATE_CUSTOMER(state, updatedCustomer) {
    // Find the index of the customer to update in the array
    const index = state.customers.findIndex((customer) => customer.id === updatedCustomer.id);
    if (index !== -1) {
      // Update the customer data in the array
      state.customers.splice(index, 1, updatedCustomer);
    }
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
      },
      async updateCustomer({ commit }, updatedCustomer) {
        try {
          // Send the request to the server to update the customer
          const response = await axios.put(`http://localhost:3000/customers/${updatedCustomer.id}`, updatedCustomer);
          console.log("it getssss the id")
          if (response.status === 200) {
            console.log("it gets the id")
            // Commit a mutation to update the customer in the store
            commit("UPDATE_CUSTOMER", updatedCustomer);
          } else {
            console.error("Failed to update customer. Server returned:", response);
            console.log("it doesnt get  the id")
            // Handle server errors if needed
          }
        } catch (error) {
          console.error("Error updating customer:", error);
          // Handle any errors related to the HTTP request here
        }
      },
      
   
};

const getters = {
  allCustomers(state) {
    return state.customers;
  },
  getCustomerById: (state) => (id) => {
    return state.customers.find((customer) => customer.id === id);
  },
};

export default { namespaced: true, state, mutations, actions, getters, };