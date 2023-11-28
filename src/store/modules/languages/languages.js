
import Vue from 'vue';
import VueI18n from 'vue-i18n';
//
import {eventBus} from '../../../eventBus'
Vue.use(VueI18n);

// Function to load locale messages
function loadLocaleMessages() {
  const locales = require.context('../../../locales', true, /[A-Za-z0-9-_\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/[A-Za-z0-9_]+\.json/i);
    if (matched && matched.length > 0) {
      const locale = matched[0].slice(0, -5); // Remove '.json' extension
      messages[locale] = locales(key);
    }
  });
  return messages;
}


// Function to get the initial locale from local storage or use a default
function getInitialLocale() {
  const storedLocale = localStorage.getItem('selectedLanguage');
  if (storedLocale) {
    return storedLocale;
  }
  return 'en'; // Default to 'en' if nothing is stored in local storage
}

const i18n = new VueI18n({
  locale: getInitialLocale(), // Set the initial locale based on local storage or default
  fallbackLocale: 'en',
  messages: loadLocaleMessages(),
});

// Watch for changes to the locale and store it in local storage
i18n.vm.$watch('locale', (newLocale) => {
  localStorage.setItem('selectedLanguage', newLocale);
  eventBus.$emit('languageChanged', newLocale);
});


export default i18n;
