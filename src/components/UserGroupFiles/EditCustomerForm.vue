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
.edit-form-container {
  margin-left: 5%;
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
</style>
