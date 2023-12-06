// src/store/modules/customer.js

const state = {
  groups: [],
  // groupnames:[]
}

const mutations = {
  SET_GROUP(state, groups) {
    state.groups = groups;
  },
  ADD_GROUP(state, newGroup) {
    state.groups.push(newGroup)
    // state.groupnames.push(newGroup.group_name)
  },
  UPDATE_GROUP(state, updatedGroup) {
    const index = state.groups.findIndex(group => group.id === updatedGroup.id);
    if (index !== -1) {
      state.groups.splice(index, 1, updatedGroup);
    }
    // const groupNameIndex = state.groupnames.findIndex(
    //   (group)=>group.id===updatedGroup.id,
    // )
    // if(groupNameIndex!==-1){
    //   state.groupnames.splice(groupNameIndex,1,updatedGroup)
    // }
  },
  DELETE_GROUP(state, groupId) {
    const index = state.groups.findIndex(group => group.id === groupId);
  //   if (index !== -1) {
  //     //groupName is array of strings no the data
  //     const groupNameToDelete=state.groupnames[index];
  //  const groupNameIndex=state.groupnames.findIndex(
  //       (group)=>group===groupNameToDelete
  //     );
  //     if(groupNameIndex!==-1){
  //       state.groupnames.splice(groupNameIndex,1)
  //     }
      state.groups.splice(index, 1);
    }
  };


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
    
    // const savedGroupName=JSON.parse(
    //   localStorage.getItem('groupnames')||'[]'
    // );
    // savedGroupName.push(newGroup.group_name);
    // localStorage.setItem('groupnames',JSON.stringify(savedGroupName));
    }catch(error){
      console.log('error catching the group names')
    }
  },
  async updateGroup({ commit }, updatedGroup) {
    try {
      // Commit a mutation to update the group in the store
      commit('UPDATE_GROUP', updatedGroup);
      console.log('the updated group is:', updatedGroup);
  
      // Update local storage
      const savedGroups = JSON.parse(localStorage.getItem('groups') || '[]');
      const index = savedGroups.findIndex(group => group.id === updatedGroup.id);
      if (index !== -1) {
        savedGroups.splice(index, 1, updatedGroup);
        localStorage.setItem('groups', JSON.stringify(savedGroups));
      }
  
      // const groupNamesFromLocalStorage = localStorage.getItem('groupnames');
      // console.log('groupNamesFromLocalStorage:', groupNamesFromLocalStorage);
      
      // const savedGroupNames = groupNamesFromLocalStorage ? JSON.parse(groupNamesFromLocalStorage) : [];
      // console.log('savedGroupNames:', savedGroupNames);
  
      // const groupNameIndex = savedGroupNames.findIndex(
      //   (groupName) => groupName === updatedGroup.group_name
      // );
      // if (groupNameIndex !== -1) {
      //   savedGroupNames.splice(groupNameIndex, 1, updatedGroup.group_name);
      //   localStorage.setItem('groupnames', JSON.stringify(savedGroupNames));
      // }
  
      return Promise.resolve();
  
    } catch (error) {
      console.error('Error updating group:', error);
      return Promise.reject(error);
    }
  },
  
  async deleteGroup({ commit }, groupId) {
    try {
      commit('DELETE_GROUP', groupId);


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
groupNames(state) {
    return state.groups.map((group) => group.group_name);
 
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
