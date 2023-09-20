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
        <!--     
         <b-col cols="6">
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
        </b-col>  -->
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
            @click="updateCustomer"
            :disabled="!isRoleSelected || (!firstNameState && !lastNameState)"
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
import { mapGetters } from 'vuex'


export default {
  name: 'CreateCustomerModal',
  props: {
    customerId:String,
  },
  data() {
    return {
      selectedRole: null,
      customer: {},
      hasChanges: false,
    }
  },
  mounted() {
    // this.getCusomterByID();
    // setInterval(() => {
    //   const currentDate = new Date()
    //   const hours = String(currentDate.getHours()).padStart(2, '0')
    //   const minutes = String(currentDate.getMinutes()).padStart(2, '0')
    //   const seconds = String(currentDate.getSeconds()).padStart(2, '0')
    //   const time = `${hours}:${minutes}:${seconds}`
    //   this.customer.last_modification_time = time 
    // }) 
    this.hasChanges = false
  },
  computed: {
    ...mapGetters('customer', ['getCustomerById']),
    ...mapGetters(['getUserName']),

    userNameState() {
      if (this.customer && this.customer.last_modifier) {
        const userNameLength = this.customer.last_modifier.length
        return userNameLength >= 5 && userNameLength <= 45
      }
      return false 
    },
    isRoleSelected() {
      return this.selectedRole !== null
    },

    firstNameState() {
      if (this.customer && this.customer.first_name) {
        const firstNameLength = this.customer.first_name.length
        return firstNameLength <= 45
      }
      return true
    },
    lastNameState() {
      if (this.customer && this.customer.last_name) {
        const lastNameLength = this.customer.last_name.length
        return lastNameLength <= 45
      }
      return true
    },
  },
  created() {
    // Fetch the customer data from Vuex using the customer ID
    this.customer = this.getCustomerById(this.customerId)
    console.log('ida' + this.customerId)
    console.log('cusaa' + this.customer)
    // this.username = this.getUsername;
  },
  watch: {
    'customer.first_name': 'updateHasChanges',
    'customer.last_name': {
      handler: 'updateHasChanges',
      deep: true, 
    },
  },
  methods: {
    updateHasChanges() {
      this.hasChanges = true
    },
    updateLastModifier() {
      if (this.hasChanges) {
        //  console.log(this.getUserName)
        const username = this.getUserName
        this.customer.last_modifier = username
      }
    },
    updatedType(){
this.customer.user_type= this.selectedRole;
  },
    triggerClose() {
      this.$emit('closeEditModal')
    },

    updateCustomer() {
      this.updatedType()
      this.updateLastModifier()


      const currentDate = new Date()
  const hours = String(currentDate.getHours()).padStart(2, '0')
  const minutes = String(currentDate.getMinutes()).padStart(2, '0')
  const seconds = String(currentDate.getSeconds()).padStart(2, '0')
  this.customer.last_modification_time = `${hours}:${minutes}:${seconds}`

      this.$store
        .dispatch('customer/updateCustomer', this.customer)
        .then(() => {
          console.log(this.customer)
          this.$emit('closeEditModal')
          this.$emit('reloadDataTable')
          this.$emit('showSuccessAlert')
        })
        .catch((error) => {
          console.error('Error updating customer:', error)
        })
    },
  },
}
</script>
<style>
.edit-form-container {
  margin-left: 5%;
}

.lastname-cntainer {
  margin-left: -3%;
  width: 100%;
}
</style>
