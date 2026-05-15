import {ListFilterTrigger} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {TransactionsFilterMenu} from './TransactionsFilterMenu';
import {countTransactionsActiveFilters} from './utils/transactions.utils';

import type {TransactionsFilterState} from './config/transactions-filter.config';
import type {FC} from 'react';

export interface TransactionsFilterProps {
  filter: TransactionsFilterState;
  onChange: (filter: TransactionsFilterState) => void;
  disabled?: boolean;
}

export const TransactionsFilter: FC<TransactionsFilterProps> = ({
  filter,
  onChange,
  disabled = false
}) => {
  const {t} = useTranslation('trustAccounts');

  return (
    <ListFilterTrigger
      buttonLabel={t('view.transactions.filter.button')}
      activeCount={countTransactionsActiveFilters(filter)}
      disabled={disabled}
    >
      <TransactionsFilterMenu filter={filter} onChange={onChange} />
    </ListFilterTrigger>
  );
};
