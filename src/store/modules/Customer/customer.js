

const state = {
  customers: [],
  userNames:[]
}

const mutations = {
  SET_CUSTOMERS(state, customers) {
    state.customers = customers
  },
  ADD_CUSTOMER(state, newCustomer) {
    state.customers.push(newCustomer)
    state.userNames.push(newCustomer.user_name)
  },
  UPDATE_CUSTOMER(state, updatedCustomer) {
    // Find the index of the customer to update in the array
    const index = state.customers.findIndex(
      (customer) => customer.id === updatedCustomer.id,
    )
    if (index !== -1) {
      // Update the customer data in the array
      state.customers.splice(index, 1, updatedCustomer)
    }
     const usernameIndex = state.userNames.findIndex(
      (customer) => customer.id === updatedCustomer.id,
    )
    if (usernameIndex !== -1) {
      // Update the customer data in the array
      state.userNames.splice(usernameIndex, 1, updatedCustomer)
    }
  },
  // Mutation in customer.js
  DELETE_CUSTOMER(state, customerId) {
    const index = state.customers.findIndex(
      (customer) => customer.id === customerId
    );
    if (index !== -1) {
      // Remove the user_name from the userNames array
      const userNameToDelete = state.customers[index].user_name;
      const userNameIndex = state.userNames.findIndex(
        (userName) => userName === userNameToDelete
      );
      if (userNameIndex !== -1) {
        state.userNames.splice(userNameIndex, 1);
      }

      state.customers.splice(index, 1);
    }
  },
}

const actions = {
  // async initStore({ dispatch }) {
  //   await dispatch('savedCustomers')
  //   await dispatch('savedUserNames') // Add this line to load userNames
  // },
  async savedCustomers({ commit }) {
    try {
      const localCustomers = JSON.parse(localStorage.getItem('customers')) || [];
      const localUserNames = JSON.parse(localStorage.getItem('userNames')) || [];
  
      commit('SET_CUSTOMERS', localCustomers);
      commit('SET_USERNAMES', localUserNames);
    } catch (error) {
      console.error('Error loading data from local storage:', error);
    }
  },
  



  async addCustomer({ commit }, newCustomer) {
    try {
      commit('ADD_CUSTOMER', newCustomer);
  
      // Update local storage for customers
      const savedCustomers = JSON.parse(
        localStorage.getItem('customers') || '[]'
      );
      savedCustomers.push(newCustomer);
      localStorage.setItem('customers', JSON.stringify(savedCustomers));
  
      // Update local storage for userNames
      const savedUserNames = JSON.parse(
        localStorage.getItem('userNames') || '[]'
      );
      savedUserNames.push(newCustomer.user_name);
      localStorage.setItem('userNames', JSON.stringify(savedUserNames));
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  },
  
  async updateCustomer({ commit }, updatedCustomer) {
    try {
      commit('UPDATE_CUSTOMER', updatedCustomer);
  
      // Update local storage for customers
      const savedCustomers = JSON.parse(
        localStorage.getItem('customers') || '[]'
      );
      const index = savedCustomers.findIndex(
        (customer) => customer.id === updatedCustomer.id
      );
      if (index !== -1) {
        savedCustomers.splice(index, 1, updatedCustomer);
        localStorage.setItem('customers', JSON.stringify(savedCustomers));
      }
  
      // Update local storage for userNames
      const savedUserNames = JSON.parse(
        localStorage.getItem('userNames') || '[]'
      );
      const userNameIndex = savedUserNames.findIndex(
        (userName) => userName === updatedCustomer.user_name
      );
      if (userNameIndex !== -1) {
        savedUserNames.splice(userNameIndex, 1, updatedCustomer.user_name);
        localStorage.setItem('userNames', JSON.stringify(savedUserNames));
      }
  
      return Promise.resolve();
    } catch (error) {
      console.error('Error updating customer:', error);
      return Promise.reject(error);
    }
  },
  
  DELETE_CUSTOMER(state, customerId) {
    const index = state.customers.findIndex(
      (customer) => customer.id === customerId
    );
    if (index !== -1) {
      // Remove the user_name from the userNames array
      const userNameToDelete = state.customers[index].user_name;
      const userNameIndex = state.userNames.findIndex(
        (userName) => userName === userNameToDelete
      );
      if (userNameIndex !== -1) {
        state.userNames.splice(userNameIndex, 1);
      }
  
      state.customers.splice(index, 1);
    }
  },
  
}

const getters = {
  allCustomers(state) {
    return state.customers
  },
  getCustomerById: (state) => (id) => {
    return state.customers.find((customer) => customer.id === id)
  },
  userNames(state) {
    return state.customers.map((customer) => customer.user_name);
 
  },

}

export default { namespaced: true, state, mutations, actions, getters }
