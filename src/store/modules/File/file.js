
const state={
  files:[],
}
const mutations={
SET_FILES(state,files){
state.files=files
},
ADD_FILES(state,fileInfo){
  state.files.push(fileInfo)
},

  DELETE_FILE(state, fileId) {
    const index = state.files.findIndex(file => file.id === fileId);
    state.files.splice(index, 1);
  },
};

const actions = {
  async savedFiles({commit}){
const localData=JSON.parse(localStorage.getItem('files'))||[];
commit('SET_FILES',localData);
  },

  async addFiles({commit},fileInfo){
try {
  commit('ADD_FILES',fileInfo);
  const savedFiles=JSON.parse(localStorage.getItem('files')||'[]');
  savedFiles.push(fileInfo);
  localStorage.setItem('files',JSON.stringify(savedFiles));
}catch(error){
  console.log('error catching the files')
}
  },

  async deleteFile({ commit }, fileId) {
    try {
      commit('DELETE_FILE', fileId);

      // Update local storage
      const savedFiles = JSON.parse(localStorage.getItem('files') || '[]');
      const updatedFiles = savedFiles.filter(file => file.id !== fileId);
      localStorage.setItem('files', JSON.stringify(updatedFiles));

      return Promise.resolve();
    } catch (error) {
      console.error('Error deleting file:', error);
      return Promise.reject(error);
    }
  },
};

const getters = {
  allFiles(state){
return state.files;
  },
  getFileById: state => id => {
    return state.files.find(file => file.id === id);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
