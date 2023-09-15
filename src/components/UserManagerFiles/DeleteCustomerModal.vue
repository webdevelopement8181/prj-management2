<template>
  <div>
    <b-row class="mt-2 mb-3">
      <h6 class="text-secondary">
        Are you sure you want to delete this user ?
      </h6>
    </b-row>
    <b-row class="mt-2 mb-3">
      <p class="text-danger">
        This action is not reversible and may result in the loss if important
        data.
      </p>
    </b-row>
    <b-row class="mt-4">
      <b-col>
        <b-button variant="danger" @click="removeCustomerFromData">Delete Customer</b-button>
      </b-col>
      <b-col>
        <b-button variant="warning" @click="triggerClose">Close</b-button>
      </b-col>
    </b-row>
  </div>
</template>
  
<script>
// ,mapActions
import { mapGetters } from "vuex";

export default {
  name: "DeleteCustomerModal",
  props: {
    customerId: Number,
  },
  computed: {
    ...mapGetters("customer", ["getCustomerById"]),
    // ...mapActions("customer", ["deleteCustomer"]),
  },
  created() {
    // Fetch the customer data from Vuex using the customer ID
    this.customer = this.getCustomerById(this.customerId);

  },
  //   // this.username = this.getUsername;
  // },
  //   watch: {

  customerId: {
    immediate: true,
    handler(newCustomerId) {
      this.customer = this.getCustomerById(newCustomerId);
      console.log("newCustomerId: ", newCustomerId)
      // console.log(this.customer)
    },

  },
  // },

  methods: {

    triggerClose() {
      this.$emit("closeDeleteModal");
    },

    removeCustomerFromData() {

      this.$store.dispatch('customer/deleteCustomer', this.customer.customerId).then(() => {
        console.log(this.customer.customerId)
        this.$emit("reloadDataTable");
        this.$emit("showDeleteAlert");
        this.$emit("closeDeleteModal");
      })
        .catch((error) => {
          console.error("Error deleting customer:", error);
        }); 
    },

  },
};
</script>