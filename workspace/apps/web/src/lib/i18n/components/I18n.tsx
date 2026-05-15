import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import type {FC} from 'react';

export const I18n: FC = () => {
  const {i18n, t} = useTranslation();

  useEffect(() => {
    const setDocumentAttributes = (language: string) => {
      document.documentElement.dir = i18n.dir(language);
      document.documentElement.lang = language;
      document.title = t('appTitle');
    };

    // Set initial direction and title
    setDocumentAttributes(i18n.language);

    // Update direction and title when language changes
    const handleLanguageChange = (lng: string) => {
      setDocumentAttributes(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n, t]);

  return null;
};
