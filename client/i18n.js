import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import translationEN from './locales/en/translation.json'
import translationRU from './locales/ru/translation.json'

const resources = {
  en: {
    translation: translationEN
  },
  ru: {
    translation: translationRU
  }
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    // lng: 'ru',
    fallbackLng: 'en',

    // keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      useSuspense: false,
      wait: false
    }
  })

export default i18n
