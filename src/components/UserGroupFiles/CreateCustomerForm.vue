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
        <b-col cols="6">
          <div class="users-container">
          <b-form-group label="Users">
    <!-- <b-form-group id="user-list" label="User List" label-for="user-list"> -->
      <div v-if="isUserNamesEmpty">
        <p>no user name availabale!</p>
      </div>
      <!-- <label for="multi-select">Multiple Select</label>
<div class="select select--multiple">
  <select id="multi-select" multiple>
    <option value="Option 1">Option 1</option>
    <option value="Option 2">Option 2</option>
    <option value="Option 3">Option 3</option>
    <option value="Option 4">Option 4</option>
    <option value="Option 5">Option 5</option>
    <option value="Option length">
      Option that has too long of a value to fit
    </option>
  </select>
  <span class="focus"></span>
</div> -->
      <multiselect
        v-model="selectedUserNames"
        :options="userNames" 
        :close-on-select="false"
        :searchable="true"
        placeholder="find user names"
        id="selectedUserNames"
        name="selectedUserNames"
        :show-labels="true"
        multiple 
        class="custom-multiselect"
      ></multiselect>
   
           </b-form-group>
          </div>
    <!-- </b-form-group> -->
  </b-col>
      </b-row>
      <b-row>
       
    
      </b-row>
      <b-row>

</b-row>


      <b-row class="mt-4">
        <b-col cols="3">
          <button
          class="create-btn"
            @click="addNewCustomer"
            :disabled="
              !groupNameState
            "
            >Add group</button
          >
        </b-col>
        <b-col>
          <button class="create-btn" @click="triggerClose">Close</button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
// import axios from "axios";
import { mapGetters, mapState } from 'vuex'
import Multiselect from 'vue-multiselect';
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'CreateCustomerModal',
  components:{
    Multiselect,
  },
  data() {
    return {
      selectedUserNames: [],
      selectedRole:null,
   group: {},
      hasChanges:false,
    }
  },

  computed: {
    ...mapState('group', ['groups']),
    ...mapGetters('customer', ['userNames']),
    ...mapGetters('group', ['allGroups']),
    ...mapGetters(['getUserName']),

      isUserNamesEmpty() {
    return this.userNames.length === 0;
  },
 

    // isRoleSelected() {
    //   return this.selectedRole !== null
    // },
    formattedUserNames() {
    return this.userNames.map((userName) => ({
      value: userName,
      text: userName,
    }));
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
  created() {

  // const savedSelectedUserNames = localStorage.getItem('selectedUserNames');
  // if (savedSelectedUserNames) {
  //   this.selectedUserNames = JSON.parse(savedSelectedUserNames);
  // }
  // console.log('User Names:', this.userNames);
},

  watch: {
  'group.group_name': 'updateHasChanges',
  // ...
},

  
  methods: {
  //   updateSelectedUserNames(updatedSelectedUserNames) {
  //   this.selectedUserNames = updatedSelectedUserNames;
    
  //   localStorage.setItem('selectedUserNames', JSON.stringify(updatedSelectedUserNames));
  // },
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
  userNamesWithOutQuote(){
   let WithOutQuoteUser=this.selectedUserNames.join()
   return WithOutQuoteUser
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
          group_name: this.group.group_name,
          creator_name:this.group.creator_name,
          creation_time: this.group.creation_time,
          users_list: this.userNamesWithOutQuote(),
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

.create-btn{
  appearance: button;
  background-color: #4D4AE8;
  background-image: linear-gradient(180deg, rgba(255, 255, 255, .15), rgba(255, 255, 255, 0));
  border: 1px solid #4D4AE8;
  border-radius: 1rem;
  box-shadow: rgba(255, 255, 255, 0.15) 0 1px 0 inset,rgba(46, 54, 80, 0.075) 0 1px 1px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: Inter,sans-serif;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  margin: 0;
  padding: .5rem 1rem;
  text-align: center;
  text-transform: none;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
}

.create-btn:focus:not(:focus-visible),
.create-btn:focus {
  outline: 0;
}

.create-btn:hover {
  background-color: #3733E5;
  border-color: #3733E5;
}

.create-btn:focus {
  background-color: #413FC5;
  border-color: #3E3BBA;
  box-shadow: rgba(255, 255, 255, 0.15) 0 1px 0 inset, rgba(46, 54, 80, 0.075) 0 1px 1px, rgba(104, 101, 235, 0.5) 0 0 0 .2rem;
}

.create-btn:active {
  background-color: #3E3BBA;
  background-image: none;
  border-color: #3A38AE;
  box-shadow: rgba(46, 54, 80, 0.125) 0 3px 5px inset;
}

.create-btn:active:focus {
  box-shadow: rgba(46, 54, 80, 0.125) 0 3px 5px inset, rgba(104, 101, 235, 0.5) 0 0 0 .2rem;
}

.create-btn:disabled {
  background-image: none;
  box-shadow: none;
  opacity: .65;
  pointer-events: none;
}


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
.custom-multiselect .multiselect__content-wrapper {
  max-height: 200px; 
  overflow-y: auto;
}

.custom-multiselect .multiselect__select {
  position: relative;
}


.users-container{
  margin-top: -1.5%;
}



</style>
