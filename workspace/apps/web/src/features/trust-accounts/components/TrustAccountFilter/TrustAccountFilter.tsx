import {ListFilterTrigger} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {TrustAccountFilterMenu} from './TrustAccountFilterMenu';
import {countActiveFilters} from '../../utils/filter.utils';

import type {TrustAccountFilterState} from '../../utils/filter.utils';
import type {FC} from 'react';

export interface TrustAccountFilterProps {
  filter: TrustAccountFilterState;
  onChange: (filter: TrustAccountFilterState) => void;
  disabled?: boolean;
}

export const TrustAccountFilter: FC<TrustAccountFilterProps> = ({
  filter,
  onChange,
  disabled = false
}) => {
  const {t} = useTranslation('trustAccounts');

  return (
    <ListFilterTrigger
      buttonLabel={t('filter.button')}
      activeCount={countActiveFilters(filter)}
      disabled={disabled}
    >
      <TrustAccountFilterMenu filter={filter} onChange={onChange} />
    </ListFilterTrigger>
  );
};
