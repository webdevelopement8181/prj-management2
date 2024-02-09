<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale" @change="handleLocaleChange">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">

        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script>

export default {
  name: 'locale-changer',
  data() {
    console.log('Initial selected locale:', this.$i18n.locale); // Add this line
    return { langs: ['farsi', 'en'] };
  },
  methods: {
    handleLocaleChange() {
      console.log('Selected locale after change:', this.$i18n.locale);
    },
  },
};
</script>