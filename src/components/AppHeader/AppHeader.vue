<template>
  
  <div :class="['app-header', currentTheme]">
<div class="sample-div" v-bind:class="currentTheme">
 <!-- <ColorThemes></ColorThemes> -->

    <div class="theme-options">
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
    <SelectLanguage></SelectLanguage>
 
    <nav :class="currentTheme">
       <ul>
        <li>
  
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
</template>


<script>
import VirtualLogin from '@/components/VirtualLogin.vue'
import SelectLanguage from '@/components/SelectLanguage.vue';
// import ColorThemes from '@/components/ColorThemes.vue';

export default {
  data(){
    return{
      currentTheme:localStorage.getItem('theme-color')

    }
  },
  methods:{
    switchTheme(theme){
      localStorage.setItem('theme-color',theme)
      this.currentTheme=localStorage.getItem('theme-color')
    }
  },
  computed: {},
  components: {
    SelectLanguage,
    VirtualLogin,
    // ColorThemes
  }
}
</script>

<style scoped>
/* Reset some default styles */
body,
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.app-header {
  position: absolute;
  top: 0;
  border-radius: 5px;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #003865;
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

.sample-div{
  margin-left: 80%;
 height: 20%;
  width: 12%;
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

.logo {
  padding: 20px 0;
  text-align: center;
  margin-left: 30%;
}

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
