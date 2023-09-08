<template >

    <div class="main-div">
    
    
      <div class="container" >
        <div class="box-container">
          <div class="box">
            <form @submit.prevent="validateForm" class="login-form">
              <h2>Login Form</h2>
              <label for="username">Username:</label>
              <input id="username" type="text" v-model="username" placeholder="Username">
              <span class="error-message">{{ usernameError }}</span>
    
              <label for="password">Password:</label>
              <input type="password" v-model="password" placeholder="Password">
              <span class="error-message">{{ passwordError }}</span>
    
              <button type="submit">Log In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </template>
    
    <script>
  
    
  
    export default {
      name: 'LoginForm',
      // props:{
      //   username:String
      // },
      data() {
          return {
              myStyle: {
                  backgroundColor: "#16a085"
              },
              username: '',
              password: '',
              validUsername: '123',
              validPassword: '123',
              usernameError: '',
              passwordError: '',
          };
      },
      methods: {
          validateForm() {
              this.usernameError = '';
              this.passwordError = '';
              if (this.username !== this.validUsername) {
                  this.usernameError = 'Invalid username';
              }
              else if (this.password !== this.validPassword) {
                  this.passwordError = 'Invalid password';
              }
              else {
                  this.$router.push('/menu');
                  // this.username=this.validUsername;
                  // You can navigate to the next page or perform other actions here
              }
          },
      },
   
  };
    </script>
    
    <style scoped>
    
    .main-div {
      background-color: #272829;
    height: 100vh;
    margin-top: -4%;
    }
    
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
    
    
    }
    
    .box-container {
      position: relative;
      width: 380px; /* Adjust the width as needed */
      height: 490px; /* Adjust the height as needed */
      background-color: #E96479; /* New color */
      border-radius: 60px 5px; /* Increased border-radius for the larger container */
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 9%;
    }
    .box {
      position: relative;
      width: 90%; /* Adjust the width as needed */
      height: 90%; /* Adjust the height as needed */
      background-color: #1c1c1c;
      border-radius: 10% 2.5%;
      overflow: hidden;
    }
    
    
    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 5%; /* Added padding for better alignment */
    }
    
    
    h2 {
      color: white;
      margin-bottom: 15%;
    }
    
    label {
      color: white;
      margin-bottom: 5px;
    }
    
    input {
      padding: 10px;
      border: none;
      border-radius: 5px;
      margin: 5px 0;
    }
    
    .error-message {
      color: #d9138a;
    }
    
    button {
      margin-top: 6%;
      padding: 10px;
      background-color: #d9138a;
      border: none;
      border-radius: 5px;
      color: white;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    button:hover {
      background-color: #ff387a;
    }
    </style>
    