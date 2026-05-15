import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import {
  enAuth,
  enCommon,
  enDilutionCalculator,
  enNav,
  enPayments,
  enTrustAccounts
} from '../locales/en';
import {
  heAuth,
  heCommon,
  heDilutionCalculator,
  heNav,
  hePayments,
  heTrustAccounts
} from '../locales/he';

const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    nav: enNav,
    trustAccounts: enTrustAccounts,
    payments: enPayments,
    dilutionCalculator: enDilutionCalculator
  },
  he: {
    common: heCommon,
    auth: heAuth,
    nav: heNav,
    trustAccounts: heTrustAccounts,
    payments: hePayments,
    dilutionCalculator: heDilutionCalculator
  }
};

const savedLang = localStorage.getItem('i18nextLng');

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang ?? 'he',
  fallbackLng: 'he',
  defaultNS: 'common',
  ns: ['common', 'auth', 'nav', 'trustAccounts', 'payments', 'dilutionCalculator'],
  debug: import.meta.env.DEV,
  interpolation: {
    escapeValue: false // React already escapes values
  },
  initAsync: false
});

export default i18n;
