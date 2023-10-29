<template>
  <footer class="app-footer">
    <div class="container">
      <!-- <selectLanguage></selectLanguage> -->
      <!-- <span class="footer-text">the sticky footer goes here</span> -->
    </div>
  </footer>
</template>

<script>
// import selectLanguage from '@/components/SelectLanguage.vue'
export default {
  // components:{selectLanguage},
  name: 'AppFooter',
  //   data() {
  //     return {
  //       // Your data properties for the footer component
  //     };
  //   }
}
</script>

<style>
body,
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.app-footer {
  position: absolute;
  z-index: -1;
  bottom: 0;
  width: 100%;
  margin-top: 30%;
  overflow: hidden;
  /* margin-left: 5%; */
  border-radius: 5px;
  /* Set the fixed height of the footer here */
  height: 60px;
  line-height: 60px; /* Vertically center the text there */
  background-color: #003865;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
