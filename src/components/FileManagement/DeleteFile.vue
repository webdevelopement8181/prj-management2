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

  import { mapGetters } from 'vuex'
  
  export default {
    name: 'DeleteCustomerModal',
    props: {
      customerId: String,
    },
    computed: {
      ...mapGetters('file', ['getFileById']),
 
    },
    created() {
      if (this.customerId) {
      this.file = this.getFileById(this.customerId)
   
      }
     
    },
     watch: {

    customerId: {
    immediate: true,
    handler(newFileId) {
      this.file = this.getFileById(newFileId)
      console.log('newFilepId1: ', this.file)
      // console.log(this.customer)
    },
  },
  },
  

    methods: {
      triggerClose() {
        this.$emit('closeDeleteModal')
      },
  
      removeCustomerFromData() {

    this.$store
      .dispatch('file/deleteFile', this.file.id)
      .then(() => {
        this.$emit('reloadDataTable');
        this.$emit('showDeleteAlert');
        this.$emit('closeDeleteModal');
      })
      .catch((error) => {
        console.error('Error deleting groups:', error);
      });
 
},

    },
  }
  </script>
  <style>
  .text-danger{
    font-size: smaller;
  }
</style>