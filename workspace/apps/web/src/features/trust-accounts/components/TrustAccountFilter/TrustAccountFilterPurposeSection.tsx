import {ListFilterCheckboxSection} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {TRUST_PURPOSE_FILTER_OPTIONS} from '../../config/filter.config';

import type {TrustPurpose} from '@sollapay/enums';
import type {FC} from 'react';

export interface TrustAccountFilterPurposeSectionProps {
  purposes: TrustPurpose[];
  onChange: (purposes: TrustPurpose[]) => void;
}

export const TrustAccountFilterPurposeSection: FC<TrustAccountFilterPurposeSectionProps> = ({
  purposes,
  onChange
}) => {
  const {t} = useTranslation('trustAccounts');

  const options = TRUST_PURPOSE_FILTER_OPTIONS.map(opt => ({
    value: opt.value,
    label: t(opt.i18nKey)
  }));

  return (
    <ListFilterCheckboxSection
      title={t('filter.sections.purpose')}
      options={options}
      selected={purposes}
      onChange={vals => onChange(vals as TrustPurpose[])}
    />
  );
};
