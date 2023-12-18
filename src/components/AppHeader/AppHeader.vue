<template>
  <div class="main">
    <div :class="['app-header', currentTheme]">

      <div class="header-container">
        <div class="theme-container">
          <div class="sample-div" v-bind:class="currentTheme">
            <div class="theme-options">
              <div id="theme-black" v-bind:class="{ active: currentTheme === 'theme-purple' }"
                v-on:click="switchTheme('theme-purple')"></div>
              <div id="theme-blue" v-bind:class="{ active: currentTheme === 'theme-blue' }"
                v-on:click="switchTheme('theme-blue')"></div>
              <div id="theme-green" v-bind:class="{ active: currentTheme === 'theme-green' }"
                v-on:click="switchTheme('theme-green')"></div>

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
          <b-form-select v-model="selectedUserNames" :options="getAllUsernames" class="custom-select-style mb-3"
            value-field="item" text-field="name" disabled-field="notEnabled"></b-form-select>

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
  </div>
</template>


<script>
import VirtualLogin from '@/components/VirtualLogin.vue'
import SelectLanguage from '@/components/SelectLanguage.vue';
import { mapGetters } from 'vuex'
import { eventBus } from '../../eventBus'
// import {bus} from 'src/main'


export default {
  data() {
    return {
      selectedUserNames: [],
      currentTheme: localStorage.getItem('theme-color'),
      selectedLanguage: '',

    }
  },
  created() {
    console.log('all the usernames in array:', this.getAllUsernames)
  },
  mounted() {
    if (eventBus) {
      eventBus.$on('languageChanged', this.changeLanguage.bind(this));
    }
    else {
      console.log('the event bus is not available')
    }

  },

  watch: {
    selectedUserNames: {
      handler: 'loadUserPreferences',
      immediate: true, // Call the handler immediately to load preferences on component mount

    },
  },

  methods: {

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

      if (storedUserPreferences[this.selectedUserNames]) {
        this.$i18n.locale = storedUserPreferences[this.selectedUserNames].language;
        this.currentTheme = storedUserPreferences[this.selectedUserNames].theme;

      } else {
        storedUserPreferences[this.selectedUserNames] = {
          theme: this.currentTheme,
          language: this.$i18n.locale,


        };

      }


      // console.log("the selected username:", this.selectedUserNames);
      // console.log(this.currentTheme);
      // console.log(this.$i18n.locale);

    },


    switchTheme(theme) {
      localStorage.setItem('theme-color', theme)

      this.currentTheme = theme; // Update the currentTheme immediately
      this.updateUserPreferences();

    },
    changeLanguage(newlocale) {
      this.selectedLanguage = newlocale;
      this.updateUserPreferences();
    },


    // },

  },
  computed: {
    ...mapGetters(['getAllUsernames']),

  },

  components: {
    SelectLanguage,
    VirtualLogin,

  }
}
</script>
<style lang="scss">
@import '~@/assets/my_style.scss';
</style>

<style scoped>
main {

  @import url('https://fonts.googleapis.com/css2?family=Lato:ital@1&display=swap');



  font-family: 'Lato', sans-serif;


}

body,
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.theme-options {
  /* background-color: burlywood; */
  height: 10px;
  margin-top: -45px;

}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 20px;
  height: 90%;
}

.theme-container {
  width: 20%;

  margin-left: 68%;

}

.language-container {
  margin-left: -35px;
}

.username-container {
  margin-left: -12px;
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
  width: 5%;
  /* Adjust the width as needed */
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


.icon-item {
  margin-left: 30%;
  text-decoration-line: none;

}

.nav-item {
  margin-left: 34px;
  font-size: 16px;
}

.menu-item {

  text-decoration-line: none;
  display: block;
  line-height: 300%;
  color: rgb(85, 83, 83);
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-left: 64px;
}

.menu-item:hover {
  background-color: #FFF7D4;
}

.router-link-exact-active {
  background-color: #dfe9f5;
}
</style>
