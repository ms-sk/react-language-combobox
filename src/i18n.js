import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,

    // Add this section:
    backend: {
      // import.meta.env.BASE_URL will be '/' in dev 
      // and '/react-language-combobox/' in production
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
    },

    interpolation: {
      escapeValue: false, 
    }
  });