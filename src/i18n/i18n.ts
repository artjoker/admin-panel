import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    react: {
      bindI18n: 'languageChanged',
      useSuspense: true,
    },
    debug: false,
    fallbackLng: 'en',
    supportedLngs: ['ru', 'en'],
    interpolation: {
      escapeValue: false,
    },
    keySeparator: false,
    detection: {
      order: ['path', 'cookie', 'querystring', 'htmlTag', 'localStorage'],
      caches: ['cookie', 'localStorage'],
    },
    initImmediate: true,

    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });
export default i18n;
