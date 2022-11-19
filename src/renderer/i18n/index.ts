import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import fr from './locales/en.json';

declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    resources: {
      en: typeof en;
      fr: typeof en;
    };
  }
}

const resources = { en, fr };

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: true,
  supportedLngs: ['en', 'fr'],
  resources,
});

export default i18n;
