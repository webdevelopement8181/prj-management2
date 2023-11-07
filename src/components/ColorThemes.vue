<!-- <template>
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
    // usernames() {
    //   return this.$store.state.usernames; // Access usernames from the Vuex store
    // },
  },
}
</script>
<style lang="scss">
@import '../assets/my_style.scss';
</style> -->
