<template>
  <div class="edit-form-container">
    <b-form class="mt-3">
      <b-row>
        <b-col cols="6">
          <b-form-group id="group-name" label="group Name" label-for="group-name">
            <b-form-input
              id="group-name"
              type="text"
              :state="groupNameState"
              :valid="groupNameState"
              v-model="group.group_name"
            ></b-form-input>
            <b-form-invalid-feedback>
              first name must be 48 characters at max level
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
<!-- 
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
              v-model="group.first_name"
              :state="firstNameState"
              :valid="firstNameState"
            ></b-form-input>
            <b-form-invalid-feedback>
              first name must be 48 characters at max level
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col> -->
        <!-- <b-col cols="6">
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
        </b-col> -->
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
      <!-- <b-row>
        <div class="selection-role-constainer">
          <b-col cols="4">
            <b-form-radio-group v-model="selectedRole" name="role">
              type:
              <b-form-radio value="admin">Admin</b-form-radio>
              <b-form-radio value="user">User</b-form-radio>
            </b-form-radio-group>
          </b-col>
        </div>
      </b-row> -->

      <b-row class="mt-4">
        <b-col cols="3">
          <b-button
            variant="primary"
            class="px-5"
            @click="updateCustomer"
            :disabled="!groupNameState"
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
    customerId: String,
  },
  data() {
    return {
      selectedRole: null,
     group: {},
      hasChanges: false,
    }
  },
  mounted() {
   
    this.hasChanges = false
  },
  computed: {
    ...mapGetters('group', ['getGroupById']),
    ...mapGetters(['getUserName']),


   groupNameState() {
      if (this.group && this.group.group_name) {
        const groupNameLength = this.group.group_name.length
        return groupNameLength>=5 && groupNameLength <= 45
      }
      return true
    },
  
  },
  created() {
    if(this.customerId){
    // Fetch the customer data from Vuex using the customer ID
    this.group = this. getGroupById(this.customerId)
  }
  
   
    // this.username = this.getUsername;
  },
  watch: {

    'group.group_name': {
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
        this.group.last_modifier = username
      }
    },
//     updatedType(){
// this.customer.user_type= this.selectedRole;
//   },
    triggerClose() {
      this.$emit('closeEditModal')
    },

    updateCustomer() {
      // this.updatedType()
      this.updateLastModifier()


      const currentDate = new Date()
  const hours = String(currentDate.getHours()).padStart(2, '0')
  const minutes = String(currentDate.getMinutes()).padStart(2, '0')
  const seconds = String(currentDate.getSeconds()).padStart(2, '0')
  this.group.last_modification_time = `${hours}:${minutes}:${seconds}`

      this.$store
        .dispatch('group/updateGroup', this.group)
        .then(() => {
          // console.log(this.customer)
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
