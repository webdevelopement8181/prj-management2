// src/store/modules/customer.js

const state = {
  groups: [],
}

const mutations = {
  SET_GROUP(state, groups) {
    state.groups = groups;
  },
  ADD_GROUP(state, newGroup) {
    state.groups.push(newGroup);
  },
  UPDATE_GROUP(state, updatedGroup) {
    const index = state.groups.findIndex(group => group.id === updatedGroup.id);
    if (index !== -1) {
      state.groups.splice(index, 1, updatedGroup);
    }
  },
  DELETE_GROUP(state, groupId) {
    const index = state.groups.findIndex(group => group.id === groupId);
    if (index !== -1) {
      state.groups.splice(index, 1);
    }
  },
}

const actions = {
  async savedGroups({ commit }) {
    // Commit the mutation to update the state
    const localData = JSON.parse(localStorage.getItem('groups')) || [];
    commit('SET_GROUP', localData);
  },

  async addGroup({ commit }, newGroup) {
    try {
      // Simultaneously commit the mutation to update the store
      commit('ADD_GROUP', newGroup);
      console.log('new group inside dispatch: ', newGroup);
      // Update local storage
      const savedGroups = JSON.parse(localStorage.getItem('groups') || '[]');
      savedGroups.push(newGroup);
      localStorage.setItem('groups', JSON.stringify(savedGroups));
    } catch (error) {
      console.error('Error adding group:', error);
    }
  },
  async updateGroup({ commit }, updatedGroup) {
    try {
      // Commit a mutation to update the group in the store
      commit('UPDATE_GROUP', updatedGroup);

      // Update local storage
      const savedGroups = JSON.parse(localStorage.getItem('groups') || '[]');
      const index = savedGroups.findIndex(group => group.id === updatedGroup.id);
      if (index !== -1) {
        savedGroups.splice(index, 1, updatedGroup);
        localStorage.setItem('groups', JSON.stringify(savedGroups));
      }

      return Promise.resolve();
    } catch (error) {
      console.error('Error updating group:', error);
      return Promise.reject(error);
    }
  },
  async deleteGroup({ commit }, groupId) {
    try {
      commit('DELETE_GROUP', groupId);
      console.log('groupId:', groupId);

      // Update local storage
      const savedGroups = JSON.parse(localStorage.getItem('groups') || '[]');
      const updatedGroups = savedGroups.filter(group => group.id !== groupId);
      console.log('updated groups: ' + groupId);
      localStorage.setItem('groups', JSON.stringify(updatedGroups));

      return Promise.resolve();
    } catch (error) {
      console.error('Error deleting group:', error);

      return Promise.reject(error);
    }
  },
}

const getters = {
  allGroups(state) {
    return state.groups;
  },
  getGroupById: state => id => {
    return state.groups.find(group => group.id === id);
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
