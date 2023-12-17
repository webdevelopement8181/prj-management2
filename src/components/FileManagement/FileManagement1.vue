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
                  <b-button
                    variant="primary"
                    id="show-btn"
                    @click="showCreateModal"
                    class="btn"
                  >
                    <!-- add customer part  icons and the text-->
                    <b-icon-plus class="text-white"></b-icon-plus>
                    <span class="h6 text-white">New File</span>
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-table
              striped
              hover
              :items="files"
              :fields="fields"
              class="text-center"
            >
          
              <template #cell(creator_name)="data">
                {{ data.item.file_name }}
              </template>
              <template #cell(creation_time)="data">
                {{ data.item.file_format }}
              </template>
              <template #cell(last_modification_time)="data">
                {{ data.item.size }}
              </template>
              <template #cell(last_modifier)="data">
                {{ data.item.upload_time }}
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
                  <b-col cols="12">
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
    <b-modal ref="create-customer-modal" size="xl" hide-footer title="upload File">
      <createFile
        @closeCreateModal="closeCreateModal"
        @reloadDataTable="getCustomerData"
        @showSuccessAlert="showAlertCreate"
      ></createFile>
    </b-modal>
    <b-modal
      ref="delete-customer-modal"
      size="md"
      hide-footer
      title="Confirm Deletion"
    >
      <DeleteFile

        @closeDeleteModal="closeDeleteModal"
        @reloadDataTable="getCustomerData"
        @showDeleteAlert="showDeleteSuccessModal"
        :customerId="customerId"
      ></DeleteFile>
    </b-modal>
    <AppHeader></AppHeader>
   
  </div>
</template>

<script>
// import axios from "axios";
import { mapGetters, mapState } from 'vuex'
import   CreateFile from '@/components/FileManagement/CreateFile.vue'
import DeleteFile from '@/components/FileManagement/DeleteFile.vue'
import AppHeader from '@/components/AppHeader/AppHeader.vue'


export default {
  components: {
    AppHeader,
  CreateFile,
    DeleteFile,
  },
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        // {
           {
          key: 'file_name',
          label: 'FileName',
          sortable: false,
        },
       
        {
          key: 'file_format',
          label: 'FileFormat',
          sortable: false,
        },
        {
          key: 'size',
          label: 'Size',
          sortable: false,
        },
        {
          key: 'upload_time',
          label: 'UploadTime',
          sortable: false,
        },
   
        'actions',
      ],
      items: [],
      customerId: 0,
      tableHeader: '',
      showSuccessAlert: false,
      alertMessage: '',
    }
  },

  computed: {
    ...mapState('file', ['files']),
    ...mapGetters('file', ['allfiles']),
  },

  mounted() {
   
    this.fetchCustomersFromLocalStorage()
    this.getCustomerData()
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    
    async fetchCustomersFromLocalStorage() {
      try {
      
        this.$store.dispatch('file/savedFiles') // Dispatch the action

      } catch (error) {
        console.error('Error fetching customer data from local storage:', error)
      }
    },
    async getCustomerData() {
    
    },
    showCreateModal() {
      this.$refs['create-customer-modal'].show()
    },
    closeCreateModal() {
      this.$refs['create-customer-modal'].hide()
    },

    
    setFilterTotalIsActive() {
      this.tableHeader = 'Total users'
      this.getCustomerData()
    },

    showAlertCreate() {
      this.showSuccessAlert = true
      this.dismissCountDown = this.dismissSecs
      this.alertMessage = 'file was created successfully!'
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
      this.alertMessage = 'file was deleted successfully!'
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
  margin-left: 10%;
  width: 80%;
  height: 130%;
}

</style>
