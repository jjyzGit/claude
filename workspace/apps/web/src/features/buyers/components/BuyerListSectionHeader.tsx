import {SearchInput, ListViewPicker} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {ListSortingSelect} from '@/components';

import {BuyerFilter} from './BuyerFilter';
import {BUYER_SORT_CONFIG} from '../config/buyer-sorting.config';

import type {BuyerFilterState} from '../config/buyer-filter.config';
import type {ListOnSortingChange, ListSortingState, ListView} from '@sollapay/ui/components';
import type {FC, ReactNode} from 'react';

export interface BuyerListSectionHeaderProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  sorting: ListSortingState;
  onSortingChange: ListOnSortingChange;
  view: ListView;
  onViewChange: (view: ListView) => void;
  filter: BuyerFilterState;
  onFilterChange: (filter: BuyerFilterState) => void;
  exportMenu?: ReactNode;
}

export const BuyerListSectionHeader: FC<BuyerListSectionHeaderProps> = ({
  searchText,
  onSearchChange,
  sorting,
  onSortingChange,
  view,
  onViewChange,
  filter,
  onFilterChange,
  exportMenu
}) => {
  const {t} = useTranslation('trustAccounts');

  return (
    <div className="flex items-center justify-between gap-4">
      <SearchInput
        value={searchText}
        onChange={onSearchChange}
        placeholder={t('view.buyers.list.search.placeholder')}
      />
      <div className="flex items-center gap-3">
        {exportMenu}
        <BuyerFilter filter={filter} onChange={onFilterChange} />
        <ListSortingSelect
          config={BUYER_SORT_CONFIG}
          sorting={sorting}
          onSortingChange={onSortingChange}
        />
        <ListViewPicker
          value={view}
          onChange={onViewChange}
          tableLabel={t('view.buyers.list.viewPicker.table')}
          cardLabel={t('view.buyers.list.viewPicker.card')}
        />
      </div>
    </div>
  );
};
