<template>
    <div>
        <label for="selected-language">Selected language:</label>
        <select id="selected-lnguage" v-model="SelectedLanguage" @change="changeLanguage">
            <option value="en">English</option>
      <option value="fa">Persian</option></select>
    </div>
</template>
<script>
export default {
  data() {
    return {
      selectedLanguage: 'en', // Set the default selected language
    };
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = this.selectedLanguage;
    },
  },
};
</script>