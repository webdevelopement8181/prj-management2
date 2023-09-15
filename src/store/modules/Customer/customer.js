// src/store/modules/customer.js
// import axios from "axios";

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
},
// Mutation in customer.js
DELETE_CUSTOMER(state, customerId) {
  const index = state.customers.findIndex((customer) => customer.id === customerId);
  if (index !== -1) {
    state.customers.splice(index, 1);
  }
}



};


const actions = {
  async savedCustomers({ commit }) {
    // Commit the mutation to update the state
    const localData = JSON.parse(localStorage.getItem("customers")) || [];
    commit("SET_CUSTOMERS", localData);
    
  },
    // async fetchCustomers({ commit }) {
    //     // console.error("Fetching customers...");
    //     try {
    //       const response = await axios.get("http://localhost:3000/customers/");
    //       if (response.status === 200) {
    //         commit("SET_CUSTOMERS", response.data);
    //       } else {
    //         console.error("Failed to fetch customer data.");
    //       }
    //     } catch (error) {
    //       console.error("Error fetching customer data:", error);
    //     }
      
    //   },
    async addCustomer({ commit }, newCustomer) {
      try {
        // Simultaneously commit the mutation to update the store
        commit("ADD_CUSTOMER", newCustomer);
        console.log("updated costumers: ")
        // Update local storage
        const savedCustomers = JSON.parse(localStorage.getItem("customers") || "[]");
        savedCustomers.push(newCustomer);
        localStorage.setItem("customers", JSON.stringify(savedCustomers));
      } catch (error) {
        console.error("Error adding customer:", error);
      }
    },
    async updateCustomer({ commit }, updatedCustomer) {
      try {
        // Commit a mutation to update the customer in the store
        commit("UPDATE_CUSTOMER", updatedCustomer);
  
        // Update local storage
        const savedCustomers = JSON.parse(localStorage.getItem("customers") || "[]");
        const index = savedCustomers.findIndex((customer) => customer.id === updatedCustomer.id);
        if (index !== -1) {
          savedCustomers.splice(index, 1, updatedCustomer);
          localStorage.setItem("customers", JSON.stringify(savedCustomers));
        }
  
      
        return Promise.resolve(); 
      } catch (error) {
        console.error("Error updating customer:", error);
   
        return Promise.reject(error); 
      }
    },
async deleteCustomer({ commit }, customerId) {
  try {
    
    commit("DELETE_CUSTOMER", customerId);

    // Update local storage
    const savedCustomers = JSON.parse(localStorage.getItem("customers") || "[]");
    const updatedCustomers = savedCustomers.filter((customer) => customer.id !== customerId);
    console.log("updated costumers: "+ updatedCustomers)
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    
   
    return Promise.resolve();

  }catch (error) {
    console.error("Error deleting customer:", error);
    
    return Promise.reject(error); 
  }
}
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