import {ListFilterCheckboxSection} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {TRUST_STATUS_FILTER_OPTIONS} from '../../config/filter.config';

import type {TrustStatus} from '@sollapay/enums';
import type {FC} from 'react';

export interface TrustAccountFilterStatusSectionProps {
  statuses: TrustStatus[];
  onChange: (statuses: TrustStatus[]) => void;
}

export const TrustAccountFilterStatusSection: FC<TrustAccountFilterStatusSectionProps> = ({
  statuses,
  onChange
}) => {
  const {t} = useTranslation('trustAccounts');

  const options = TRUST_STATUS_FILTER_OPTIONS.map(opt => ({
    value: opt.value,
    label: t(opt.i18nKey)
  }));

  return (
    <ListFilterCheckboxSection
      title={t('filter.sections.status')}
      options={options}
      selected={statuses}
      onChange={vals => onChange(vals as TrustStatus[])}
    />
  );
};
