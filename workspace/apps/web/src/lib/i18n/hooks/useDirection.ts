import {useTranslation} from 'react-i18next';

export type Direction = 'ltr' | 'rtl';

export const useDirection = (): Direction => {
  const {i18n} = useTranslation();
  return i18n.dir(i18n.language) as Direction;
};
