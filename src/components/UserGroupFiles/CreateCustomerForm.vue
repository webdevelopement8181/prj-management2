<template>
  <div class="create-form-container">
    <b-form class="mt-3">
      <b-row> </b-row>
      <div class="groupName">
        <b-row>
          <b-col cols="5">
            <b-form-group id="group-name" :label="$t('group-name')"  label-for="group-name">
              <b-form-input id="group-name" type="text" :placeholder="$t('group-name')" v-model="group.group_name"
                :state="groupNameState" :valid="groupNameState"></b-form-input>
              <b-form-invalid-feedback>
  {{ $t('group-name-validation-message') }}
</b-form-invalid-feedback>

            </b-form-group>
          </b-col>

        </b-row>
      </div>
      <b-row>
        <div v-if="isUserNamesEmpty" class="selectionError">
  <p>{{ $t('select-username-first') }}</p>
</div>
        <b-col cols="5">
          <div class="users-container">


            <multiselect v-model="selectedUserNames" :options="userNames" :close-on-select="false" :searchable="true"
            :placeholder="$t('find-user-names')" id="selectedUserNames" name="selectedUserNames" :show-labels="false" multiple
              class="custom-multiselect"></multiselect>


          </div>
          <!-- </b-form-group> -->
        </b-col>

      </b-row>
      <b-row>

      </b-row>


      <b-row class="mt-4">
        <b-col cols="3">
          <button class="create-btn" @click="addNewCustomer" :disabled="!groupNameState">{{ $t('add-group') }}</button>

        </b-col>
        <b-col>
          <button class="create-btn" @click="triggerClose">{{ $t('close') }}</button>

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
  components: {
    Multiselect,
  },
  data() {
    return {
      selectedUserNames: [],
      selectedRole: null,
      group: {},
      hasChanges: false,
    }
  },

  computed: {
    ...mapState('group', ['groups']),
    ...mapGetters('customer', ['userNames']),
    ...mapGetters('group', ['allGroups']),
    ...mapGetters(['getUserName']),

    computedUserNames() {
      return this.userName
    },
    isUserNamesEmpty() {
      return this.userNames.length === 0;
    },

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


  },

  watch: {
    'group.group_name': 'updateHasChanges',
    // ...
  },


  methods: {


    userNameCheck() {
      console.log('userNames are', this.userNames)
    },

    updateHasChanges() {
      this.hasChanges = true
    },
    upadateCreator() {
      if (this.hasChanges) {
        const username = this.getUserName;
        this.group.creator_name = username;
        console.log('this is creator function')
      }
    },
    userNamesWithOutQuote() {
      let WithOutQuoteUser = this.selectedUserNames.join()
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
          creator_name: this.group.creator_name,
          creation_time: this.group.creation_time,
          users_list: this.userNamesWithOutQuote(),
          id: uuidv4(),
        }
        try {


          // Commit the mutation to update the Vuex store
          await this.$store.dispatch('group/addGroup', newGroup)
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
@import url('https://fonts.googleapis.com/css2?family=Lato:ital@1&display=swap');

.groupMultiSelect {
  padding: 12%;
}

.create-btn {
  appearance: button;
  background-color: #4D4AE8;
  background-image: linear-gradient(180deg, rgba(255, 255, 255, .15), rgba(255, 255, 255, 0));
  border: 1px solid #4D4AE8;
  border-radius: 1rem;
  box-shadow: rgba(255, 255, 255, 0.15) 0 1px 0 inset, rgba(46, 54, 80, 0.075) 0 1px 1px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: Inter, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  margin: 0;
  padding: .5rem 1rem;
  text-align: center;
  text-transform: none;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
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
  font-family: 'Lato', sans-serif;
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


.users-container {
  width: 110%;
  margin-left: -5%;
}

.selectionError {

  margin-bottom: -5%;
}

.groupName {
  margin-bottom: 4%;
}
</style>
