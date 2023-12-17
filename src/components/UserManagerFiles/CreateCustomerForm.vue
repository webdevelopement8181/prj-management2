<template>
  <div class="main">
  <div class="create-form-container">
    
    <b-form class="mt-3">
      <b-row> 
    
      </b-row>

      <b-row>
        
        <b-col cols="6">
          <!-- added $t for the translation -->
          <b-form-group id="user-name" :label="$t('user_name_label')" label-for="user-name">
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
            :label="$t('first_name_label')"
            label-for="first-name"
          >
            <b-form-input
              id="first-name"
              type="text"
              :placeholder="$t('first_name_placeholder')"
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
          <b-form-group id="last-name" :label="$t('last_name_label')" label-for="last-name">
            <b-form-input
              id="last-name"
              type="text"
              :placeholder="$t('last_name_placeholder')"
              v-model="customer.last_name"
              :state="lastNameState"
              :valid="lastNameState"
            ></b-form-input>
            <b-form-invalid-feedback>
              last name must be 48 characters at max level
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
   
        
        <b-col cols="6">
        <multiselect
        v-model="selectedGroupNames"
        :options="groupNames" 
        :close-on-select="false"
        :searchable="true"
        placeholder="choose group names "
        id="selectedGroupNamess"
        name="selectedGroupNames"
        :show-labels="false"
        multiple 
        class="custom-multiselect"
      ></multiselect>
    </b-col>
      </b-row>

      <b-row class="mt-5">
        <h5></h5>
      </b-row>
      <b-row>
<!-- seletcting role started -->
        <!-- <div class="selection-role-constainer">
          <b-col cols="4">
            <b-form-radio-group v-model="selectedRole" name="role">
              type:

              <b-form-radio value="admin">Admin</b-form-radio>
              <b-form-radio value="user">User</b-form-radio>
            </b-form-radio-group>
          </b-col>
        </div> -->
        <!-- selection role end -->
        <section class="radio-section" >
	<div class="radio-list" >
		<div class="radio-item"><input name="radio" id="radio2" type="radio"     value="admin"  v-model="selectedRole"><label for="radio2">admin</label></div>
		<div class="radio-item"><input name="radio" id="radio3" type="radio"   value="user"   v-model="selectedRole"><label for="radio3">user</label></div>
	</div>
</section>
      </b-row>

      <b-row class="mt-4">
        <b-col cols="3" >
          <button class="create-btn"
            @click="addNewCustomer"
            :disabled="
              !userNameState ||
              !isRoleSelected ||
              (!firstNameState && !lastNameState)
            "
            >Add Customer</button
          >
        </b-col>
        <b-col>
          <button class="create-btn" @click="triggerClose">Close</button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</div>
</template>

<script>
// import axios from "axios";
import { mapGetters, mapState } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import Multiselect from 'vue-multiselect';

export default {
  name: 'CreateCustomerModal',
  components:{
Multiselect,
  },
  data() {
    return {
      selectedGroupNames:[],
      selectedRole:null,
      customer: {},
      hasChanges:false,
    }
  },

  computed: {
    ...mapState('customer', ['customers']),
    ...mapGetters('customer', ['allCustomers']),
    ...mapGetters(['getUserName']),
    ...mapGetters('group',['groupNames']),
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
groupNamesWithoutQuote(){
let withoutQuoteGroupNames=this.selectedGroupNames.join()
return withoutQuoteGroupNames;
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
         user_group: this.groupNamesWithoutQuote(),

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
@import url('https://fonts.googleapis.com/css2?family=Lato:ital@1&display=swap');


.main {
  font-family: 'Lato', sans-serif;

}
a {
	text-decoration: none;
}
ul {
	list-style-type: none;
}

.radio-section {
	display: flex;
	align-items: center;
	justify-content: center;
  margin-left: -38%;
height: 20vh;
	/* height: 100vh; */
}


.radio-item [type="radio"] {
	display: none;
}
.radio-item + .radio-item {
	margin-top: 15px;
}
.radio-item label {
	display: block;
	padding: 20px 60px;
  background: #b9ceec;
	border: 2px solid rgba(255, 255, 255, 0.1);
	border-radius: 8px;
	cursor: pointer;
	font-size: 18px;
	font-weight: 400;
	min-width: 250px;
	white-space: nowrap;
	position: relative;
	transition: 0.4s ease-in-out 0s;
}
.radio-item label:after,
.radio-item label:before {
	content: "";
	position: absolute;
	border-radius: 50%;
}
.radio-item label:after {
	height: 19px;
	width: 19px;
	border: 2px solid #524eee;
	left: 19px;
	top: calc(50% - 12px);
}
.radio-item label:before {
	background: #524eee;
	height: 20px;
	width: 20px;
	left: 21px;
	top: calc(50%-5px);
	transform: scale(5);
	opacity: 0;
	visibility: hidden;
	transition: 0.4s ease-in-out 0s;
}
.radio-item [type="radio"]:checked ~ label {
	border-color: #524eee;
}
.radio-item [type="radio"]:checked ~ label::before {
	opacity: 1;
	visibility: visible;
	transform: scale(1);
}


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

</style>
