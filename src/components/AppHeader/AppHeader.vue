<template>
  
  <div :class="['app-header', currentTheme]">
  
<div class="header-container">
<div class="theme-container">
<div class="sample-div" v-bind:class="currentTheme">
    <div class="theme-options">
      <!-- <p>{{ $i18n.locale }}</p> -->
      <div
        id="theme-black"
        v-bind:class="{ active: currentTheme === 'theme-purple' }"
        v-on:click="switchTheme('theme-purple')"
      ></div>
      <div
        id="theme-blue"
        v-bind:class="{ active: currentTheme === 'theme-blue' }"
        v-on:click="switchTheme('theme-blue')"
      ></div>
      <div
        id="theme-green"
        v-bind:class="{ active: currentTheme === 'theme-green' }"
        v-on:click="switchTheme('theme-green')"
      ></div> 

    </div>
</div> 
</div>
<div class="language-container">
  <SelectLanguage></SelectLanguage>
</div>


 

<!-- username selection starts -->
<div class="username-container">
  <!-- the selected username is stroed in here
  all the usernames are stored in getAllUsernames -->
    <b-form-select
      v-model="selectedUserNames"   
      :options="getAllUsernames"    
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
    ></b-form-select>
  </div>
  <!-- username selection ends -->
   
 
    <nav :class="currentTheme">
       <ul>
        <li>
          <!-- <div class="mt-3">userName <strong>{{ selectedUserNames }}</strong></div> -->
          <span class="icon-item"><font-awesome-icon :icon="['fas', 'user']" /></span>
          <router-link to="/user-management" class="menu-item">{{ $t('user_management') }}</router-link>
        </li>
        <li>
          <span class="icon-item"><font-awesome-icon :icon="['fas', 'file']" /></span>
          <router-link to="/files-management" class="menu-item">{{ $t('file_management') }}</router-link>
        </li>
        <li>
          <span class="icon-item"><font-awesome-icon :icon="['fas', 'user-group']" /></span>
          <router-link to="/manage-user-group" class="menu-item">{{ $t('manage_user_group') }}</router-link>
        </li>
        <li>
          <span class="icon-item"><font-awesome-icon :icon="['fas', 'database']" /></span>
          <router-link to="/storage-space" class="menu-item">{{ $t('storage_space') }}</router-link>
        </li>
        <li>
          <VirtualLogin></VirtualLogin>
        </li>
      </ul>
    </nav>
  </div>
  </div>

</template>


<script>
import VirtualLogin from '@/components/VirtualLogin.vue'
import SelectLanguage from '@/components/SelectLanguage.vue';
import { mapGetters } from 'vuex'
// import {bus} from 'src/main'


export default {
  data(){
    return{
      selectedUserNames:[],
      currentTheme:localStorage.getItem('theme-color')


    }
  },
  created(){
    console.log( 'all the usernames in array:',this.getAllUsernames)
  },
  // created() {
   
  //   bus.$on('languageChanged', this.handleLanguageChange);
  // },
  // beforeDestroy() {

  //   bus.$off('languageChanged', this.handleLanguageChange);
  // },
  watch: {
   selectedUserNames: {
    handler: 'updateUserPreferences',
    immediate: true, // Call the handler immediately to load preferences on component mount
    
  },
},

    methods: {
  //     updateUserPreferences() {
  //   const storedUserPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {};
  //   if(storedUserPreferences[this.selectedUserNames]){
  //     this.currentTheme=storedUserPreferences[this.selectedUserNames].theme;
  //     this.$i18n.locale=storedUserPreferences[this.selectedUserNames].language;
  //   }

  //   else{
  //     storedUserPreferences[this.selectedUserNames] = {
  //     theme: this.currentTheme,
  //     language: this.$i18n.locale,
  //   };

  //   }
    
  //   localStorage.setItem('userPreferences', JSON.stringify(storedUserPreferences));
  //   this.loadUserPreferences();
  // },

  updateUserPreferences() {
    const storedUserPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {};

    // Update preferences for the current selected username
    storedUserPreferences[this.selectedUserNames] = {
      theme: this.currentTheme,
      language: this.$i18n.locale,
    };

    localStorage.setItem('userPreferences', JSON.stringify(storedUserPreferences));
    this.loadUserPreferences();
  },

  loadUserPreferences() {
    const storedUserPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {};

    // Load preferences for the current selected username
    const userPreferences = storedUserPreferences[this.selectedUserNames];
    
    if (userPreferences) {
      this.currentTheme = userPreferences.theme 
      this.$i18n.locale = userPreferences.language 
    } else {
      // If there are no saved preferences for the current user, set defaults or leave it as is
      this.currentTheme = localStorage.getItem('theme-color') || 'blue-theme';
      this.$i18n.locale = localStorage.getItem('selectedLanguage') || 'en';
    }

    console.log("the selected username:", this.selectedUserNames);
    console.log(this.currentTheme);
    console.log(this.$i18n.locale);
  },


    switchTheme(theme){
      localStorage.setItem('theme-color',theme)
      // this.currentTheme=localStorage.getItem('theme-color')
      this.currentTheme = theme; // Update the currentTheme immediately
      this.updateUserPreferences();
      
    },
    changeLanguage(language){
      this.$i18n.locale=language;
      this.updateUserPreferences();
    },
    // handleLanguageChange(newLanguage) {
    //   console.log('Selected language changed:', newLanguage);
 
    // },

  },
  computed: {
    ...mapGetters(['getAllUsernames']),
   
  },

  components: {
    SelectLanguage,
    VirtualLogin,
    // ColorThemes
  }
}
</script>
<style lang="scss">
@import '~@/assets/my_style.scss';
</style>

<style scoped>

body,
ul {
  margin: 0;
  padding: 0;
  list-style: none;
} 
.theme-options{
/* background-color: burlywood; */
height: 10px;
margin-top: -45px;
 
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; /* Add position relative */
  padding: 0 20px; /* Adjust the padding as needed */
  /* background-color: rgb(226, 250, 215); */
  height: 90%;
}

.theme-container {
width: 20%;

margin-left: 68%;

}
.language-container {
    /* background-color: antiquewhite; */
  margin-left: -35px; /* Add some margin between theme and language */
}
.username-container{
  margin-left:-12px;
  /* background-color: aqua; */
}
.app-header {
  position: absolute;
padding: 5PX;
  top: 0;
  border-radius: 5px;
  width: 100%;
  height: 70px;
  line-height: 60px;
 
}
.theme-blue {
  background-color: #9BBEC8;
}

.theme-purple {
  background-color: #C3ACD0;
}

.theme-green {
  background-color: #96C291;
}


nav {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 5%; /* Adjust the width as needed */
  height: 100%;
  background-color: #d1ebfe;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  line-height: 250%;
  transition: width 0.2s linear;
}
nav:hover {
  width: 15%;
  transform: all 0.5s ease;
  line-height: 450%;
}

/* .logo {
  padding: 20px 0;
  text-align: center;
  margin-left: 30%;
} */

.icon-item {
  margin-left: 30%;
}
.nav-item {
  margin-left: 34px;
  font-size: 16px;
}
.menu-item {
  display: block;
  line-height: 300%;
  color: rgb(85, 83, 83);
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-left: 64px;
}

.menu-item:hover {
  background-color: #f0f0f0;
}

.router-link-exact-active {
  background-color: #dfe9f5;
}
</style>
