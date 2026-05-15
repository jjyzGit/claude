import {ListFilterTrigger} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {BuyerFilterMenu} from './BuyerFilterMenu';
import {countBuyerActiveFilters} from '../../utils/buyer-filter.utils';

import type {BuyerFilterState} from '../../config/buyer-filter.config';
import type {FC} from 'react';

export interface BuyerFilterProps {
  filter: BuyerFilterState;
  onChange: (filter: BuyerFilterState) => void;
  disabled?: boolean;
}

export const BuyerFilter: FC<BuyerFilterProps> = ({filter, onChange, disabled = false}) => {
  const {t} = useTranslation('trustAccounts');

  return (
    <ListFilterTrigger
      buttonLabel={t('view.buyers.list.filter.button')}
      activeCount={countBuyerActiveFilters(filter)}
      disabled={disabled}
    >
      <BuyerFilterMenu filter={filter} onChange={onChange} />
    </ListFilterTrigger>
  );
};
