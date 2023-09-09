

<template>
    <div>
  <AppHeader></AppHeader>
  <AppFooter></AppFooter>
  <!-- <AppMain></AppMain> -->
      <!-- <div>Updated Username: {{ updatedUsername }}</div> -->
    </div>
  </template>
  <script>
   import AppHeader from '../components/AppHeader/AppHeader.vue';
  import AppFooter from '../components/AppFooter/AppFooter.vue';
 
  // import AppMain from './AppMain/AppMain.vue'
  
  
  export default {
    name:'menuPage',
  components:{
      AppHeader,
      AppFooter,
      // AppMain
  },
    data() {
      return {
  
      };
    },
   
  };
  </script>
  