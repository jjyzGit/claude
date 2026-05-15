import {useTranslation} from 'react-i18next';

import type {FC} from 'react';

const languages = {
  en: 'English',
  he: 'עברית'
};

// For debugging translations, temporary design
export const LanguageSwitcher: FC = () => {
  const {i18n} = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={e => {
        const lang = e.target.value;
        localStorage.setItem('i18nextLng', lang);
        i18n.changeLanguage(lang);
      }}
      className="px-2 py-1 text-sm rounded-md border border-border bg-background text-fg"
    >
      {Object.entries(languages).map(([code, label]) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
};
