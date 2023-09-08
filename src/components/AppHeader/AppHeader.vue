<template>
    <div class="app-header">

   
  <nav>
    <!-- <div class="logo">
      <font-awesome-icon :icon="['fas', 'house']" />
 
      <div class="nav-item">{{ username }}</div>
    </div> -->
    <ul>
      <li>
        <span class="icon-item"><font-awesome-icon :icon="['fas', 'user']" /></span>
        <router-link to="/user-management" class="menu-item">   User Management   </router-link>
   
     
      </li>
      <li>
        <span class="icon-item"> <font-awesome-icon :icon="['fas', 'file']" /></span>
        <router-link to="/files-management" class="menu-item">   file Management</router-link>
    
      </li>
      <li>
        <span class="icon-item">  <font-awesome-icon :icon="['fas', 'user-group']" /></span>
        <router-link to="/manage-user-group" class="menu-item"> manage user group</router-link>
      </li>
      <li>
        <span class="icon-item">  <font-awesome-icon :icon="['fas', 'database']" /> </span>
        <router-link to="/storage-space" class="menu-item">   storage space</router-link>
      
      </li>
      <li>
        <!-- <VirtualLogIn></VirtualLogIn> -->
      </li>
    </ul>
  </nav>
</div>
</template>

<script>
// import VirtualLogIn from '../VirtualLogIn.vue'
export default {
//   components:{
//     VirtualLogIn
//   },
  props: {
    username: String, // Pass the username as a prop
  },
};
</script>

<style scoped>
/* Reset some default styles */
body, ul {
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


nav {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width:5%; /* Adjust the width as needed */
  height: 100%;
  background-color: #D1EBFE;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  line-height: 250%;


  transition: width 0.2s linear;
}
nav:hover{
  width: 15%;
transform: all 0.5s ease;
line-height: 450%

}

.logo {
  padding: 20px 0;
  text-align: center;
  margin-left: 30%;
}


.icon-item{
margin-left: 30%;
}
.nav-item{
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



.menu-item:hover  {
 
 
background-color: #f0f0f0;
}

.router-link-exact-active {
  background-color: #dfe9f5;
}
</style>