<template>
  <div class="edit-form-container">
    <b-form class="mt-3">
      <div class="groupName">
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
      </b-row>
    </div>
    <div v-if="isUserNamesEmpty" class="selectionError">
        <p>first choose a username</p>
      </div>
      <div class="users-container">
      <b-row>
 <b-col cols="6">
<multiselect  v-model="selectedUserName"
     :options="userNames" 
        :close-on-select="false"
        :searchable="true"
        placeholder="choose group names"
        id="selectedUserName"
        name="selectedUserName"
        :show-labels="false"
        multiple 
        class="custom-multiselect">
      
</multiselect>
</b-col>

       
</b-row>
</div>
  
      <b-row class="mt-4">
        <b-col cols="3">
          <button
           class="create-btn"
            @click="updateCustomer"
            :disabled="!groupNameState"
            >Updateuser</button
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
import { mapGetters } from 'vuex'
import Multiselect from 'vue-multiselect'

export default {
  name: 'CreateCustomerModal',
  components:{
Multiselect
  },
  props: {
    customerId: String,
  },
  data() {
    return {
      selectedUserName:[],
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
    ...mapGetters('customer', ['userNames']),
    ...mapGetters(['getUserName']),
   
    isUserNamesEmpty() {
    return this.userNames.length === 0;
  },
 

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
  
  },
  watch: {

    'group.group_name': {
      handler: 'updateHasChanges',
      deep: true, 
    },
  },
  methods: {

    groupNameWithoutQute(){
const withoutQute=this.selectedUserName.join();
return withoutQute;
    },
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

    triggerClose() {
      this.$emit('closeEditModal')
    },

    updateCustomer() {
  this.updateLastModifier();
  const formattedGroupName = this.groupNameWithoutQute();
  this.group.users_list = formattedGroupName;

  const currentDate = new Date();
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  this.group.last_modification_time = `${hours}:${minutes}:${seconds}`;

  this.$store
    .dispatch('group/updateGroup', this.group)
    .then(() => {
      // Success: Close the modal and emit events
      console.log('Update successful')
      this.$emit('closeEditModal');
      this.$emit('reloadDataTable');
      this.$emit('showSuccessAlert');
    })
   
    .catch((error) => {
      console.error('Error updating customer:', error);
      // Handle error if needed
    });
},

  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital@1&display=swap');
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
.edit-form-container {
  margin-left: 5%;
  font-family: 'Lato', sans-serif;
}

.lastname-cntainer {
  margin-left: -3%;
  width: 100%;
}
.custom-multiselect{
margin-right: 10%;
padding: 5%;
border-radius: 8px; /* Add your desired border radius */
  width:100%;
height: 60%;
}
.selectionError{

margin-top:5%;
}
/* .groupName{
margin-bottom: 4%;
} */
.users-container{
width: 110%;
margin-left: -2.5%;
margin-top: 3%;
}
</style>
