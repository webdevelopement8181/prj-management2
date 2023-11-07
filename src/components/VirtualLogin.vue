<template>
  <div id="virtual-container">
    <b-button v-b-modal.modal-scrollable class="virtual-button"
      >virtual login</b-button
    >
   
    <b-modal
      id="modal-scrollable"
      modal-class="modal-container"
      size="lg"
      scrollable
      title="virtual login"
    >
      <div v-for="(username, index) in usernames" :key="index.id">
        {{ username }}
      </div>
      <div class="button-container" v-for="i in 10" :key="i">

        <div class="language-buttons">
          <b-button pill variant="outline-danger">eng</b-button>
          <b-button pill variant="outline-danger">farsi</b-button>
        </div>
        <!-- color themes starts -->
        <div id="app" v-bind:class="currentTheme">
          <div class="theme-options">
            <div
              id="theme-black"
              v-bind:class="{ active: currentTheme === 'theme-black' }"
              v-on:click="switchTheme('theme-black')"
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
        <!-- color theme ends -->
      </div>
     
    </b-modal>
    <!-- </div> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      currentTheme: localStorage.getItem('theme-color'),
    }
  },
  methods: {
    switchTheme(theme) {
      localStorage.setItem('theme-color', theme)
      this.currentTheme = localStorage.getItem('theme-color')
    },
  },
  computed: {
    ...mapGetters(['getAllUsernames']),
    usernames() {
      return this.getAllUsernames
    },
 
  },
}
</script>
<style lang="scss">
@import '../assets/my_style.scss';
</style>
