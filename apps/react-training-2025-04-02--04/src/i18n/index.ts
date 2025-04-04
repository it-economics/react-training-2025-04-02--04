import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import enEnums from './en/enums.json';
import enComponents from './en/components.json';
import deEnums from './de/enums.json';
import deComponents from './de/components.json';

export const initI18n = () => {
  i18next.use(initReactI18next).init({
    resources: {
      en: {
        enums: enEnums,
        components: enComponents,
      },
      de: {
        enums: deEnums,
        components: deComponents,
      },
    },
    supportedLngs: ['en', 'de'],
    lng: 'de',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
};

export const useEnumsTranslation = (enumName: string) =>
  useTranslation(`enums`, { keyPrefix: enumName });

export const useComponentsTranslation = (componentName: string) =>
  useTranslation(`components`, { keyPrefix: componentName });
