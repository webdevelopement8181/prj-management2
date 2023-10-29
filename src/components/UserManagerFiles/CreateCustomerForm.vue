<template>
  <div class="create-form-container">
    <b-form class="mt-3">
      <b-row> </b-row>

      <b-row>
        <b-col cols="6">
          <b-form-group id="user-name" label="User Name" label-for="user-name">
            <b-form-input
              id="user-name"
              type="text"
              :placeholder="$t('user_name_placeholder')"
              v-model="customer.user_name"
              :state="userNameState"
              :valid="userNameState"
            ></b-form-input>
            <b-form-invalid-feedback>
              User name must be between 5 and 45 characters.
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <!-- i added this to the same row as the username -->

        <b-col cols="6">
          <b-form-group
            id="first-name"
            label="first Name"
            label-for="first-name"
          >
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
              placeholder="last Name"
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
          <b-form-group id="creator-name" label="creator name" label-for="creator-name">
            <b-form-input
              id="creator-name"
              type="text"
              placeholder="creator name"
              v-model="customer.user_name"
              :state="lastNameState"
              :valid="lastNameState"
            ></b-form-input>
            <b-form-invalid-feedback>
    last name must be 48 characters at max level
    </b-form-invalid-feedback>
          </b-form-group>
          
        </b-col>  -->
        <!-- <b-col cols="6">
          <b-form-group id="creatoin-time" label="creation time" label-for="creation-time">
            <b-form-input
              id="creatoin-time"
              type="text"
              placeholder="creation time"
              v-model="customer.creation_time"
            
            ></b-form-input>
  
          </b-form-group>
          
        </b-col> -->
      </b-row>

      <b-row class="mt-5">
        <h5></h5>
      </b-row>
      <b-row>
        <div class="selection-role-constainer">
          <b-col cols="4">
            <b-form-radio-group v-model="selectedRole" name="role">
              type:

              <b-form-radio value="admin">Admin</b-form-radio>
              <b-form-radio value="user">User</b-form-radio>
            </b-form-radio-group>
          </b-col>
        </div>
      </b-row>

      <b-row class="mt-4">
        <b-col cols="3">
          <b-button
            variant="primary"
            class="px-5"
            @click="addNewCustomer"
            :disabled="
              !userNameState ||
              !isRoleSelected ||
              (!firstNameState && !lastNameState)
            "
            >Add Customer</b-button
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
// import axios from "axios";
import { mapGetters, mapState } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'CreateCustomerModal',
  data() {
    return {
      selectedRole:null,
      customer: {},
      hasChanges:false,
    }
  },

  computed: {
    ...mapState('customer', ['customers']),
    ...mapGetters('customer', ['allCustomers']),
    ...mapGetters(['getUserName']),
    isRoleSelected() {
      return this.selectedRole !== null
    },

    creationTimeState() {
      const currentDate = new Date()
      const hours = String(currentDate.getHours()).padStart(2, '0')
      const minus = String(currentDate.getMinutes()).padStart(2, '0')
      const seconds = String(currentDate.getSeconds()).padStart(2, '0')
      const time = `${hours}:${minus}:${seconds}`
      return time
    },
    userNameState() {
      if (this.customer && this.customer.user_name) {
        const userNameLength = this.customer.user_name.length
        return userNameLength >= 5 && userNameLength <= 45
      }
      return false // Return false if customer or user_name is not defined
    },
    firstNameState() {
      if (this.customer && this.customer.first_name) {
        const fisrtNameLength = this.customer.first_name.length
        return fisrtNameLength >= 0 && fisrtNameLength <= 45
      }
      return true
    },
    lastNameState() {
      if (this.customer && this.customer.last_name) {
        const lastNameLength = this.customer.last_name.length
        return lastNameLength >= 0 && lastNameLength <= 45
      }
      return true
    },
  },

  watch: {
    'customer.user_name': 'updateHasChanges',
      handler: 'updateHasChanges',
      deep: true, //  deep option if "last_name" is nested within the "customer" object
    },
  
  methods: {
    updateHasChanges() {
      this.hasChanges = true
    },
    upadateCreator(){
      if (this.hasChanges) {
      const username=this.getUserName;
this.customer.creator_name=username;
console.log('this is creator function')
    }
  },
  updatedType(){
this.customer.user_type= this.selectedRole;
  },
    triggerClose() {
      this.$emit('closeCreateModal')
    },

    async addNewCustomer() {
 this.upadateCreator();

      if (
        this.userNameState &&
        this.isRoleSelected &&
        (this.firstNameState || this.lastNameState)
      ) {
        this.updatedType();
        let newCustomer = {
          user_name: this.customer.user_name,
          first_name: this.customer.first_name,
          last_name: this.customer.last_name,
          user_type: this.customer.user_type,
          creator_name:this.customer.creator_name,
          creation_time: this.customer.creation_time,
          group_name: this.customer.group_name,
          id: uuidv4(),
        }
        try {
        

          // Commit the mutation to update the Vuex store
          await this.$store.dispatch('customer/addCustomer', newCustomer)
          this.$emit('closeCreateModal') // Use the correct event name
          this.$emit('reloadDataTable')
          this.$emit('showSuccessAlert')

          // Clear the form values
          this.clearForm()
        } catch (error) {
          console.error('Error adding customer:', error)
        }
      }
    },
    clearForm() {
      // Reset the form fields
      this.customer = {}
      this.selectedRole = null
    },
  },
  mounted() {
    setInterval(() => {
      const currentDate = new Date()
      const hours = String(currentDate.getHours()).padStart(2, '0')
      const minutes = String(currentDate.getMinutes()).padStart(2, '0')
      const seconds = String(currentDate.getSeconds()).padStart(2, '0')
      const time = `${hours}:${minutes}:${seconds}`
      this.customer.creation_time = time // Update the input value
    }) // Update every 1 seco
  },
}
</script>
<style>
.create-form-container {
  width: 100%;
  margin-left: 0.5%;
}

.lastname-container {
  margin-left: -4%;
}

.selection-role-constainer {
  margin-left: 3%;
}
</style>
