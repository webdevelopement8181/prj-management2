<template>
    <div class="edit-form-container">
      <b-form class="mt-3">
        <b-row>
  
        
          <b-col cols="6">
            <b-form-group id="user-name" label="user Name" label-for="user-name">
              <b-form-input
                id="user-name"
  
                type="text"
                readonly
                v-model="customer.user_name"
              ></b-form-input>
              
            </b-form-group>
       
          </b-col>
        
          <b-col cols="6">
          <b-form-group id="first-name" label="first Name" label-for="first-name">
            <b-form-input
              id="first-name"
              type="text"
              placeholder="first Name"
              v-model="customer.first_name"
              :state="firstNameState"
      :valid="firstNameState"
            ></b-form-input>
            <b-form-invalid-feedback>
   first name must be 48 characters at max level
    </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col cols="6">
            <b-form-group id="last-name" label="last Name" label-for="last-name">
              <b-form-input
                id="last-name"
                type="text"
                placeholder="Last Name"
                v-model="customer.last_name"
                :state="lastNameState"
      :valid="lastNameState"
              ></b-form-input>
              <b-form-invalid-feedback>
  last name must be 48 characters at max level
    </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
    
        <!-- <b-col cols="6">
          <b-form-group id="last-modifier" label="last modifier" label-for="last-modifier">
            <b-form-input
              id="last-modifier"
              type="text"
              placeholder="last modifier"
              v-model="customer.last_modifier"
              :state="userNameState"
      :valid="userNameState"
            ></b-form-input>
            <b-form-invalid-feedback>
   first name must be 48 characters at max level
    </b-form-invalid-feedback>
          </b-form-group>
        </b-col> -->
        <!-- <b-col cols="6">
          <b-form-group id="last-modification-time" label="last Modification Time" label-for="last-modification-time">
            <b-form-input
              id="last-modification-time"
              type="text"
              placeholder="last Modification Time"
              v-model="customer.last_modification_time"
            ></b-form-input>
            <b-form-invalid-feedback>
   first name must be 48 characters at max level
    </b-form-invalid-feedback>
          </b-form-group>
        </b-col> -->
        
        </b-row>
        <b-row>
       <div class="selection-role-constainer">
        <b-col cols="4">
  
          <b-form-checkbox-group v-model="selectedRole" name="role">
        <b-form-checkbox value="admin" switch>Admin</b-form-checkbox>
        <b-form-checkbox value="user" switch>User</b-form-checkbox>
      </b-form-checkbox-group>
     
        </b-col>
      </div>
      </b-row>
      
        <b-row class="mt-4">
          <b-col cols="3">
            <b-button variant="primary" class="px-5" @click="updateCustomer" :disabled=" !isRoleSelected|| (!firstNameState && !lastNameState)"
              >Updateuser</b-button
            >
          </b-col>
          <b-col>
            <b-button variant="warning" @click="triggerClose">Close</b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>
    </template>
    
    <script>
  import { mapGetters } from "vuex";
    
    export default {
      name: "CreateCustomerModal",
      props: {
        customerId: Number,
      },
      data() {
        return {
          selectedRole:null,
          customer: {},
        };
      },
      mounted() {
        // this.getCusomterByID();
        setInterval(() => {
        const currentDate = new Date();
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        const time = `${hours}:${minutes}:${seconds}`;
        this.customer.last_modification_time = time; // Update the input value
      }, ); // Update 
      },
      computed:{
        ...mapGetters("customer", ["getCustomerById"]),
        userNameState() {
      if (this.customer && this.customer.last_modifier) {
        const userNameLength = this.customer.last_modifier.length;
        return userNameLength >= 5 && userNameLength <= 45;
      }
      return false; // Return false if customer or user_name is not defined
    },
        isRoleSelected() {
        return this.selectedRole !== null;
      },
  
        firstNameState(){
      if (this.customer && this.customer.first_name) {
        const firstNameLength = this.customer.first_name.length;
        return  firstNameLength<= 45;
      }
      return true; 
    },  
    lastNameState() {
        if (this.customer && this.customer.last_name) {
          const lastNameLength = this.customer.last_name.length;
          return lastNameLength <= 45; // Corrected condition
        }
        return true;
      }, 
      },
      created() {
    // Fetch the customer data from Vuex using the customer ID
    this.customer = this.getCustomerById(this.customerId);
  },
      methods: {
        triggerClose() {
          this.$emit("closeEditModal");
        },
       
          updateCustomer() {
      
    this.$store.dispatch("customer/updateCustomer", this.customer)
      .then(() => {
        console.log("Customer updated successfully");
        this.$emit("closeEditModal");
        this.$emit("reloadDataTable");
        this.$emit("showSuccessAlert");
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  },
      
  //       clearForm() {
  //   // Reset the form fields
  //   this.customer = {};
  //   this.selectedRole = null;
  // },
},
     
    };
    </script>
    <style>
    .edit-form-container{
  margin-left: 5%;
  
  
    }
   
    .lastname-cntainer{
   
      margin-left: -3%;
      width: 100%;
    }
  </style>