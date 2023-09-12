<template>
    <div>
      <b-row>
        <b-alert v-model="showSuccessAlert"      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged">
          {{ alertMessage }}
        </b-alert>
      </b-row>
      <!-- active and total customers filtering -->
      <b-row>
  
        <customer-overview>
          :totalCustomers="numberOfCustomers"
       
          @totalCustomersIsActive="setFilterTotalIsActive"
      
        ></customer-overview>
      </b-row>
      <div class="table-container">
      <b-row class="mt-3" >
        <b-card>
          <b-row align-h="between" >
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
                  >
                  <!-- add customer part  icons and the text-->
                    <b-icon-plus class="text-white"></b-icon-plus>
                    <span class="h6 text-white">New user</span>
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row class="mt-3">
        
            <b-table 
              striped
              hover
              :items="customers"
              :fields="fields"
              class="text-center"
            >
          
              <template #cell(user_name)="data">
                {{
                  data.item.user_name
                }}
              </template>
              <template #cell(first_name)="data">
                {{
                      data.item.first_name
                }}
              </template> 
              <template #cell(last_name)="data">
                {{
                      data.item.last_name
                }}
              </template> 
              <template #cell(user_type)="data">
                {{
                      data.item.user_type
                }}
              </template> 
              <template #cell(creator_name)="data">
                {{
                    data.item.user_name
                }}
              </template>
              <template #cell(creation_time)="data">
                {{
                      data.item.creation_time
                }}
              </template>
              <template #cell(last_modification_time)="data">
                {{
                      data.item.last_modification_time
                }}
              </template>
              <template #cell(last_modifier)="data">
                {{
                   
     data.item.last_modifier

                }}
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
              <template>

              </template>
            </b-table>
     
          </b-row>
        </b-card>
      </b-row>
    </div>
      <!--  Modal for adding new customers -->
      <b-modal
        ref="create-customer-modal"
        size="xl"
        hide-footer
        title="New user"
      >
        <create-customer-form
          @closeCreateModal="closeCreateModal"
          @reloadDataTable="getCustomerData"
          @showSuccessAlert="showAlertCreate"
        ></create-customer-form>
      </b-modal>
  
      Modal for updating customers
      <b-modal
        ref="edit-customer-modal"
        size="xl"
        hide-footer
        title="Edit user"
      >
        <edit-customer-form
          @closeEditModal="closeEditModal"
          @reloadDataTable="getCustomerData"
          @showSuccessAlert="showAlertUpdate"
          :customerId="customerId"
        ></edit-customer-form>
      </b-modal>
  
      Delete Customer Modal
      <b-modal
        ref="delete-customer-modal"
        size="md"
        hide-footer
        title="Confirm Deletion"
      >
        <delete-customer-modal
          @closeDeleteModal="closeDeleteModal"
          @reloadDataTable="getCustomerData"
          @showDeleteAlert="showDeleteSuccessModal"
          :customerId="customerId"
        ></delete-customer-modal>
      </b-modal>
<AppHeader></AppHeader>
<!-- <AppFooter></AppFooter> -->
<!-- <AppMain></AppMain> -->
    </div>
   
  </template>
  
  <script>
  // import axios from "axios";
 import { mapGetters, mapActions,mapState } from "vuex";
  import CustomerOverview from "@/components/UserGroupFiles/CustomerOverview.vue";
  import CreateCustomerForm from "@/components/UserGroupFiles/CreateCustomerForm.vue";
  import EditCustomerForm from "@/components/UserGroupFiles/EditCustomerForm.vue";
  import DeleteCustomerModal from "@/components/UserGroupFiles/DeleteCustomerModal.vue";
// import AppFooter from "../footer/AppFooter.vue";
import AppHeader from '@/components/AppHeader/AppHeader.vue'
// import AppMain from "../AppMain/AppMain.vue";

  
  export default {
    components: {
      // AppFooter,
      AppHeader,
      // AppMain,
      CustomerOverview,
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
        fields: [
        {
          key: "user_name",
          label: "UserName",
          sortable: false,
        },
        {
          key: "first_name",
          label: "First Name",
          sortable: false,
        },
        {
          key: "last_name",
          label: "Last Name",
          sortable: false,
        },
        {
          key: "role",
          label: "Type",
          sortable: false,
        },
        //
        {
          key: "creator_name",
          label: "Creator Name",
          sortable: false,
        },
        {
          key: "creation_time",
          label: "Creation Time",
          sortable: false,
        },
        {
          key: "last_modifier",
          label: "Last Modifier",
          sortable: false,
        },
        {
          key: "last_modification_time",
          label: "Last Modification Time",
          sortable: false,
        },
        {
          key: "users",
          label: " users",
          sortable: false,
        },
        "actions",
      ],
        items: [],
        numberOfCustomers: 0,
        activeCustomers: 0,
        activeCustomersData: [],
        customerId: 0,
        companySearchTerm: "",
        tableHeader: "",
        showSuccessAlert: false,
        alertMessage: "",
      };
    },
   


  computed: {
    
    ...mapState("customer", ["customers"]),
    ...mapGetters("customer", ["allCustomers"]), // Map the customer module's getter
  },
 
  mounted() {
 
  this.fetchCustomers();


    this.getCustomerData();
  },
    methods: {
      
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      ...mapActions("customer", ["fetchCustomers"]), // Map the customer module's action

async getCustomerData() {
  await this.fetchCustomers(); // Dispatch the action to fetch customer data
  // You can now access customer data using this.allCustomers
  console.log(this.allCustomers);
},
      showCreateModal() {
        this.$refs["create-customer-modal"].show();
      },
      closeCreateModal() {
        this.$refs["create-customer-modal"].hide();
      },
  
      getRowData(id) {
        this.$refs["edit-customer-modal"].show();
        this.customerId = id;
      },
      closeEditModal() {
        this.$refs["edit-customer-modal"].hide();
      },
      setFilterTotalIsActive() {
        this.tableHeader = "Total users";
        this.getCustomerData();
      },
    
      showAlertCreate() {
        this.showSuccessAlert = true;
        this.dismissCountDown = this.dismissSecs
        this.alertMessage = "Customer was created successfully!";
      },
      showAlertUpdate() {
        this.showSuccessAlert = true;
        this.alertMessage = "Customer was updated successfully";
      },
      showDeleteModal(id) {
        this.$refs["delete-customer-modal"].show();
        this.customerId = id;
      },
      closeDeleteModal() {
        this.$refs["delete-customer-modal"].hide();
      },
      showDeleteSuccessModal() {
        this.showSuccessAlert = true;
        this.alertMessage = "Customer was deleted successfully!";
      },
    },
  };
  </script>
  
  <style>
  .action-item:hover {
    cursor: pointer;
  }
  #show-btn{
    margin-left: 35%;
   height: 90%;
   width: 65%;
  }
 .header-style{
margin-right: 52%;

 }

.table-container{
  margin-left: 10%;
  width: 80%;
  height: 130%;
}


  </style>