<template>
  <div>
    <router-view />
    <AppHeader></AppHeader>
   
  </div>
</template>
<script>
import AppHeader from '../components/AppHeader/AppHeader.vue'

export default {
  name: 'menuPage',
  components: {
    AppHeader,
   
  },
  data() {
    return {}
  },
}
</script>
