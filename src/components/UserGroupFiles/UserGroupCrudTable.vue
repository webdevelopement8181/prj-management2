<template>
  <div class="main">
    <b-row>
      <b-alert
        v-model="showSuccessAlert"
        :show="dismissCountDown"
        dismissible
        variant="warning"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        {{ alertMessage }}
      </b-alert>
    </b-row>
    <!-- active and total customers filtering -->
    <b-row>
      <!-- <customer-overview>
        :totalCustomers="numberOfCustomers"
        @totalCustomersIsActive="setFilterTotalIsActive" ></customer-overview
      > -->
    </b-row>
    <div class="table-container">
      <b-row class="mt-3">
        <b-card>
          <b-row align-h="between">
            <b-col cols="6">
              <h3 class="header-style">{{ tableHeader }}</h3>
            </b-col>
            <b-col cols="4">
              <b-row>
                <b-col>
                  <!-- add sutomer the button -->
                  <button
                 class="btn"
                    id="show-btn"
                    @click="showCreateModal"
                  >
                    <!-- add customer part  icons and the text-->
                    <b-icon-plus class="text-white"></b-icon-plus>
                    <span class="h6 text-white">{{ $t('new-group') }}</span>
                  </button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-table
              striped
              hover
              :items="groups"
              :fields=" translatedFields"
              class="text-center"
            >
              <!-- <template #cell(user_name)="data">
                {{ data.item.user_name }}
              </template>
              <template #cell(first_name)="data">
                {{ data.item.first_name }}
              </template>
              <template #cell(last_name)="data">
                {{ data.item.last_name }}
              </template>
              <template #cell(user_type)="data">
                {{ data.item.user_type }}
              </template> -->
              <template #cell(creator_name)="data">
                {{ data.item.creator_name }}
              </template>
              <template #cell(creation_time)="data">
                {{ data.item.creation_time }}
              </template>
              <template #cell(last_modification_time)="data">
                {{ data.item.last_modification_time }}
              </template>
              <template #cell(last_modifier)="data">
                {{ data.item.last_modifier }}
              </template>
              <template #cell(group_name)="data">
                {{ data.item.group_name}}
              </template>
              <template #cell(users_list)="data">
                {{ data.item.users_list}}
              </template>
              <template #cell(customer_status)="data">
                <b-icon-bookmark-check-fill
                  variant="success"
                  v-if="data.item.customer_status === 'active'"
                ></b-icon-bookmark-check-fill>
                <b-icon-bookmark-x-fill
                  variant="danger"
                  v-else
                ></b-icon-bookmark-x-fill>
              </template>
              <template #cell(actions)="data">
                <b-row>
                  <b-col cols="7">
                    <b-icon-pencil-square
                      class="action-item"
                      variant="primary"
                      @click="getRowData(data.item.id)"
                    ></b-icon-pencil-square>
                  </b-col>
                  <b-col cols="1">
                    <b-icon-trash-fill
                      class="action-item"
                      variant="danger"
                      @click="showDeleteModal(data.item.id)"
                    ></b-icon-trash-fill>
                  </b-col>
                </b-row>
              </template>
              <template> </template>
            </b-table>
          </b-row>
        </b-card>
      </b-row>
    </div>
    <!--  Modal for adding new customers -->
    <b-modal ref="create-customer-modal" size="xl" hide-footer :title="$t('new-user')">
      <create-customer-form
        @closeCreateModal="closeCreateModal"
        @reloadDataTable="getCustomerData"
        @showSuccessAlert="showAlertCreate"
      ></create-customer-form>
    </b-modal>

   
    <b-modal ref="edit-customer-modal" size="xl" hide-footer :title="$t('edit-user')">

      <edit-customer-form
        @closeEditModal="closeEditModal"
        @reloadDataTable="getCustomerData"
        @showSuccessAlert="showAlertUpdate"
        :customerId="customerId"
      ></edit-customer-form>
    </b-modal>

 
    <b-modal ref="delete-customer-modal" size="md" hide-footer :title="$t('confirm-deletion')">
      <delete-customer-modal
        @closeDeleteModal="closeDeleteModal"
        @reloadDataTable="getCustomerData"
        @showDeleteAlert="showDeleteSuccessModal"
        :customerId="customerId"
      ></delete-customer-modal>
    </b-modal>
    <!-- <AppHeader></AppHeader> -->
    
  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import CreateCustomerForm from '@/components/UserGroupFiles/CreateCustomerForm.vue'
import EditCustomerForm from '@/components/UserGroupFiles/EditCustomerForm.vue'
import DeleteCustomerModal from '@/components/UserGroupFiles/DeleteCustomerModal.vue'

// import AppHeader from '@/components/AppHeader/AppHeader.vue'


export default {
  components: {
    // AppHeader,
    CreateCustomerForm,
    EditCustomerForm,
    DeleteCustomerModal,
  },
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      // Note 'isActive' is left out and will not appear in the rendered table
      // fields: [
      //   // {
      //      {
      //     key: 'group_name',
      //     label: 'groupName',
      //     sortable: false,
      //   },
       
      //   {
      //     key: 'creator_name',
      //     label: 'Creator Name',
      //     sortable: false,
      //   },
      //   {
      //     key: 'creation_time',
      //     label: 'Creation Time',
      //     sortable: false,
      //   },
      //   {
      //     key: 'last_modifier',
      //     label: 'Last Modifier',
      //     sortable: false,
      //   },
      //   {
      //     key: 'last_modification_time',
      //     label: 'Last Modification Time',
      //     sortable: false,
      //   },
      //   {
      //     key: 'users_list',
      //     label: ' Users',
      //     sortable: false,
      //   },
       
      //   'actions',
      // ],
      items: [],
      customerId: 0,
      tableHeader: '',
      showSuccessAlert: false,
      alertMessage: '',
    }
  },

  computed: {
    ...mapState('group', ['groups']),
    ...mapGetters('group', ['allGroups']),
    translatedFields(){
      return[
      {
    key: 'group_name',
    label: this.$t('group-name'),
    sortable: false,
  },
  {
    key: 'creator_name',
    label: this.$t('creator-name'),
    sortable: false,
  },
  {
    key: 'creation_time',
    label: this.$t('creation-time'),
    sortable: false,
  },
  {
    key: 'last_modifier',
    label: this.$t('last-modifier'),
    sortable: false,
  },
  {
    key: 'last_modification_time',
    label: this.$t('last-modification-time'),
    sortable: false,
  },
  {
    key: 'users_list',
    label: this.$t('users'),
    sortable: false,
  },
  {
    key: 'actions',
  label: this.$t('actions'),
  }
    
      // ],
      
      ]
    }
  },

  mounted() {
    // this.fetchCustomers();

    this.fetchCustomersFromLocalStorage()
    this.getCustomerData()
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    // ...mapActions("customer", ["fetchCustomers"]), // Map the customer module's action
    async fetchCustomersFromLocalStorage() {
      try {
        // const localData = JSON.parse(localStorage.getItem("customers")) || [];
        this.$store.dispatch('group/savedGroups') // Dispatch the action
        // console.log("Local Data:", localData);
      } catch (error) {
        console.error('Error fetching customer data from local storage:', error)
      }
    },
    async getCustomerData() {
      //       const localData = JSON.parse(localStorage.getItem("customers")) || [];
      // this.allCustomers = localData;
    },
    showCreateModal() {
      this.$refs['create-customer-modal'].show()
    },
    closeCreateModal() {
      this.$refs['create-customer-modal'].hide()
    },

    getRowData(id) {
      this.$refs['edit-customer-modal'].show()
      this.customerId = id
    },
    closeEditModal() {
      this.$refs['edit-customer-modal'].hide()
    },
    setFilterTotalIsActive() {
      this.tableHeader = 'Total users'
      this.getCustomerData()
    },

    showAlertCreate() {
      this.showSuccessAlert = true
      this.dismissCountDown = this.dismissSecs
      this.alertMessage = 'group was created successfully!'
    },
    showAlertUpdate() {
      this.showSuccessAlert = true
      this.alertMessage = 'group was updated successfully'
    },
    showDeleteModal(id) {
      this.$refs['delete-customer-modal'].show()
      this.customerId = id
    },
    closeDeleteModal() {
      this.$refs['delete-customer-modal'].hide()
    },
    showDeleteSuccessModal() {
      this.showSuccessAlert = true
      this.alertMessage = 'group was deleted successfully!'
    },
  },
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Lato:ital@1&display=swap');


.main {
  font-family: 'Lato', sans-serif;

}
.btn{

align-items: center;
background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
border: 0;
border-radius: 8px;
box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
box-sizing: border-box;
color: #FFFFFF;
display: flex;
font-family: Phantomsans, sans-serif;
font-size: 20px;
justify-content: center;
line-height: 1em;
max-width: 100%;
min-width: 140px;
padding: 19px 24px;
text-decoration: none;
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;
white-space: nowrap;
cursor: pointer;
}

.btn:active,
.btn:hover {
outline: 0;
}

@media (min-width: 768px) {
.btn{
  font-size: 24px;
  min-width: 196px;
}
}

.action-item:hover {
  cursor: pointer;
}
#show-btn {
  margin-left: 35%;
  height: 90%;
  width: 65%;
}
.header-style {
  margin-right: 52%;
}

.table-container {
  margin-right: 30%;
  margin-top: 10%;
  width: 80%;
  height: 130%;
}
</style>
