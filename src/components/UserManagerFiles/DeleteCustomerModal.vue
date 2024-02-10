<template>
  <div>
    <b-row class="mt-2 mb-3">
      <h6 class="text-secondary">
        {{ $t('are-you-sure') }}
      </h6>
    </b-row>
    <b-row class="mt-2 mb-3">
      <p class="text-danger">
        <!-- This action is not reversible and may result in the loss of files -->
        {{ $t('not-reversible') }}
    
      </p>
    </b-row>
    <b-row class="mt-4">
      <b-col>
        <b-button variant="danger" @click="removeCustomerFromData"
          > {{ $t('delete-files') }}</b-button
        >
      </b-col>
      <b-col>
        <b-button variant="warning" @click="triggerClose"> {{ $t('close') }}</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// ,mapActions
import { mapGetters } from 'vuex'

export default {
  name: 'DeleteCustomerModal',
  props: {
    customerId:String,
  },
  computed: {
    ...mapGetters('customer', ['getCustomerById']),
    // ...mapActions("customer", ["deleteCustomer"]),
  },
  created() {
    // Fetch the customer data from Vuex using the customer ID
    this.customer = this.getCustomerById(this.customerId)
  },
  customerId: {
    immediate: true,
    handler(newCustomerId) {
      this.customer = this.getCustomerById(newCustomerId)
      console.log('newCustomerId: ', newCustomerId)
      // console.log(this.customer)
    },
  },
  // },

  methods: {
    triggerClose() {
      this.$emit('closeDeleteModal')
    },

    removeCustomerFromData() {
      this.$store
        .dispatch('customer/deleteCustomer', this.customer.id)
        .then(() => {
          console.log( this.customer.id)
          this.$emit('reloadDataTable')
          this.$emit('showDeleteAlert')
          this.$emit('closeDeleteModal')
        })
        .catch((error) => {
          console.error('Error deleting customer:', error)
        })
    },
  },
}
</script>
