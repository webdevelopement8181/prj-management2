// src/store/modules/customer.js
// import axios from "axios";

const state = {
   groups: [],
  }
  
  const mutations = {
    SET_GROUPS(state, groups) {
      state.groups = groups
    },
    ADD_GROUPS(state, newGroups) {
      state.groups.push(newGroups)
    },
    UPDATE_GROUPS(state, updatedGroups) {
      // Find the index of the customer to update in the array
      const index = state.groups.findIndex(
        (group) => group.id === updatedGroups.id,
      )
      if (index !== -1) {
        // Update the customer data in the array
        state.groups.splice(index, 1, updatedGroups)
      }
    },
    // Mutation in customer.js
    DELETE_GROUPS(state, groupId) {
      const index = state.groups.findIndex(
        (group) => group.id === groupId,
      )
      if (index !== -1) {
        state.groups.splice(index, 1)
      }
    },
  }
  
  const actions = {
    async savedGroups({ commit }) {
      // Commit the mutation to update the state
      const localData = JSON.parse(localStorage.getItem('groups')) || []
      commit('SET_GROUPS', localData)
    },
  

    async addGroups({ commit }, newGroup) {
      try {
        // Simultaneously commit the mutation to update the store
        commit('ADD_GROUPS', newGroup)
        console.log('new customer inside dispatch: ', newGroup)
        // Update local storage
        const savedGroups = JSON.parse(
          localStorage.getItem('groups') || '[]',
        )
        savedGroups.push(newGroup)
        localStorage.setItem('customers', JSON.stringify(savedGroups))
      } catch (error) {
        console.error('Error adding customer:', error)
      }
    },
    async updateGroups({ commit }, updatedGroups) {
      try {
        // Commit a mutation to update the customer in the store
        commit('UPDATE_GROUPS', updatedGroups)
  
        // Update local storage
        const  savedGroups = JSON.parse(
          localStorage.getItem('groups') || '[]',
        )
        const index = savedGroups.findIndex(
          (group) => group.id === updatedGroups.id,
        )
        if (index !== -1) {
            savedGroups.splice(index, 1, updatedGroups)
          localStorage.setItem('groups', JSON.stringify(savedGroups))
        }
  
        return Promise.resolve()
      } catch (error) {
        console.error('Error updating customer:', error)
  
        return Promise.reject(error)
      }
    },
    async deleteGroups({ commit }, groupId) {
      try {
        commit('DELETE_GROUPS', groupId)
        console.log('groupId:', groupId)
  
        // Update local storage
        const savedGroups = JSON.parse(
          localStorage.getItem('groups') || '[]',
        )
        const updatedGroups = savedGroups.filter(
          (customer) => customer.id !== groupId,
        )
        console.log('updated costumerssss: ' + groupId)
        localStorage.setItem('groups', JSON.stringify(updatedGroups ))
  
        return Promise.resolve()
      } catch (error) {
        console.error('Error deleting customer:', error)
  
        return Promise.reject(error)
      }
    },
  }
  
  const getters = {
    allCustomers(state) {
      return state.groups
    },
    getCustomerById: (state) => (id) => {
      return state.groups.find((customer) => customer.id === id)
    },
  }
  
  export default { namespaced: true, state, mutations, actions, getters }
  