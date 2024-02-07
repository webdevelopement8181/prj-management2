<template>
  <div class="main-layout">
    <!-- <AppHeader/> -->
    <div class="content-container">
      <router-view />
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
// import AppHeader from '../src/components/AppHeader/AppHeader.vue'

export default {
  name: 'HomeView',
  components: {
    // AppHeader,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.content-container {
  padding-top: 70px; /* Adjust the value based on the height of your app header */
  padding: 20px; /* Additional padding as needed */
}
</style>
