import {HeaderMetaRow} from '@sollapay/ui/components';
import {formatDateLocalized, formatPhoneDisplay} from '@sollapay/utils';
import {useTranslation} from 'react-i18next';

import type {BuyerWithDocumentsDTO} from '@sollapay/types';
import type {FC} from 'react';

export interface BuyerMetaInfoProps {
  buyer: BuyerWithDocumentsDTO;
}

export const BuyerMetaInfo: FC<BuyerMetaInfoProps> = ({buyer}) => {
  const {t, i18n} = useTranslation('trustAccounts');

  return (
    <HeaderMetaRow
      items={[
        {
          icon: 'calendar',
          tooltip: t('view.buyers.detail.metaInfo.dateOfBirth'),
          value: buyer.dateOfBirth ? formatDateLocalized(buyer.dateOfBirth, i18n.language) : null
        },
        {
          icon: 'shield',
          tooltip: t('view.buyers.detail.metaInfo.nationalId'),
          value: buyer.nationalId
        },
        {
          icon: 'phone',
          tooltip: t('view.buyers.detail.metaInfo.phone'),
          value: buyer.phone ? formatPhoneDisplay(buyer.phone) : null
        },
        {
          icon: 'mail',
          tooltip: t('view.buyers.detail.metaInfo.email'),
          value: buyer.email
        },
        {
          icon: 'marker-pin',
          tooltip: t('view.buyers.detail.metaInfo.address'),
          value: buyer.address
        }
      ]}
    />
  );
};
