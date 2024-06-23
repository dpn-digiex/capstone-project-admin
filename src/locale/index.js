import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './en.json'
import vn from './vn.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: en
      },
      vn: {
        translations: vn
      }
    },
    fallbackLng: 'en',
    lng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
      formatSeparator: '.'
    },
    react: {
      useSuspense: true
    }
  })

export default i18n
