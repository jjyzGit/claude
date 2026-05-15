import {DirectionProvider} from '@sollapay/ui/providers';
import {I18nextProvider, useTranslation} from 'react-i18next';

import {I18n} from '../components';
import i18n from '../config';

import type {TextDirection} from '@sollapay/ui/providers';
import type {FC, PropsWithChildren} from 'react';

const DirectionBridge: FC<PropsWithChildren> = ({children}) => {
  const {i18n: i18nInstance} = useTranslation();
  const direction = i18nInstance.dir(i18nInstance.language) as TextDirection;
  return <DirectionProvider direction={direction}>{children}</DirectionProvider>;
};

export const I18nProvider: FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <DirectionBridge>{children}</DirectionBridge>
      </I18nextProvider>
      <I18n />
    </>
  );
};
