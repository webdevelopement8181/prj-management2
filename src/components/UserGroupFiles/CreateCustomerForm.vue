<template>
  <div class="create-form-container">
    <b-form class="mt-3">
      <b-row> </b-row>

      <b-row>
        <b-col cols="6">
          <b-form-group id="group-name" label="Group Name" label-for="group-name">
            <b-form-input
              id="group-name"
              type="text"
              placeholder="Group Name"
              v-model="group.group_name"
              :state="groupNameState"
              :valid="groupNameState"
            ></b-form-input>
            <b-form-invalid-feedback>
             group name must be between 5 and 45 characters.
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
    
      </b-row>

      <b-row class="mt-4">
        <b-col cols="3">
          <b-button
            variant="primary"
            class="px-5"
            @click="addNewCustomer"
            :disabled="
              !groupNameState
            "
            >Add group</b-button
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
   group: {},
      hasChanges:false,
    }
  },

  computed: {
    ...mapState('group', ['groups']),
    ...mapGetters('group', ['allGroups']),
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
  groupNameState() {
      if (this.group && this.group.group_name) {
        const groupNameLength = this.group.group_name.length
        return groupNameLength >= 5 && groupNameLength <= 45
      }
      return false // Return false if customer or user_name is not defined
    },

  },

  watch: {
  'group.group_name': 'updateHasChanges',
  // ...
},

  
  methods: {
    updateHasChanges() {
      this.hasChanges = true
    },
    upadateCreator(){
      if (this.hasChanges) {
      const username=this.getUserName;
this.group.creator_name=username;
console.log('this is creator function')
    }
  },
//   updatedType(){
// this.group.user_type= this.selectedRole;
//   },
    triggerClose() {
      this.$emit('closeCreateModal')
    },

    async addNewCustomer() {
 this.upadateCreator();

      if (
        this.groupNameState 
    
      ) {
        // this.updatedType();
        let newGroup = {
          // user_name: this.customer.user_name,
          // first_name: this.customer.first_name,
          // last_name: this.customer.last_name,
          // user_type: this.customer.user_type,
          group_name: this.group.group_name,
          creator_name:this.group.creator_name,
          creation_time: this.group.creation_time,
          users_list:this.group.users_list,
          id: uuidv4(),
        }
        try {
        

          // Commit the mutation to update the Vuex store
          await this.$store.dispatch('group/addGroup',newGroup)
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
      this.group = {}
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
      this.group.creation_time = time // Update the input value
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
