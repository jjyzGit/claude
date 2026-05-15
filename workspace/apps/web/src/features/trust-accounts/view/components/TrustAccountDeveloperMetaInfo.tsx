import {DeveloperType} from '@sollapay/enums';
import {HeaderMetaRow} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import type {TrustDeveloperDetailsDTO} from '@sollapay/types';
import type {FC} from 'react';

export interface TrustAccountDeveloperMetaInfoProps {
  developerDetails: TrustDeveloperDetailsDTO;
  purpose?: string | null;
}

const ID_TOOLTIP_KEYS: Record<DeveloperType, string> = {
  [DeveloperType.CORPORATION]: 'view.header.developerInfo.tooltips.idNumber.corporation',
  [DeveloperType.INDIVIDUAL]: 'view.header.developerInfo.tooltips.idNumber.individual'
};

export const TrustAccountDeveloperMetaInfo: FC<TrustAccountDeveloperMetaInfoProps> = ({
  developerDetails,
  purpose
}) => {
  const {t} = useTranslation('trustAccounts');
  const {fullName, idNumber, developerType, address} = developerDetails;

  const idTooltip = developerType ? t(ID_TOOLTIP_KEYS[developerType]) : '';

  return (
    <HeaderMetaRow
      items={[
        {
          icon: 'coins-swap',
          tooltip: t('view.header.developerInfo.tooltips.purpose'),
          value: purpose
        },
        {
          icon: 'user-check',
          tooltip: t('view.header.developerInfo.tooltips.fullName'),
          value: fullName
        },
        {
          icon: 'building',
          tooltip: idTooltip,
          value: idNumber
        },
        {
          icon: 'marker-pin',
          tooltip: t('view.header.developerInfo.tooltips.address'),
          value: address
        }
      ]}
    />
  );
};
