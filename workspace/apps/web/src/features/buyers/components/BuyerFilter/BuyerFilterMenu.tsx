import {Divider, ListFilterCreatedAtSection, ListFilterHeader} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {BuyerFilterDepositRangeSection} from './BuyerFilterDepositRangeSection';
import {BuyerFilterPaymentStatusSection} from './BuyerFilterPaymentStatusSection';
import {DEFAULT_BUYER_FILTER_STATE} from '../../config/buyer-filter.config';
import {isBuyerFilterActive} from '../../utils/buyer-filter.utils';

import type {BuyerFilterState} from '../../config/buyer-filter.config';
import type {CreatedAtFilter} from '@sollapay/ui/components';
import type {FC} from 'react';

export interface BuyerFilterMenuProps {
  filter: BuyerFilterState;
  onChange: (filter: BuyerFilterState) => void;
}

const CREATED_AT_KEYS: Record<CreatedAtFilter, string> = {
  all: 'filter.createdAt.all',
  '7d': 'filter.createdAt.last7days',
  '30d': 'filter.createdAt.last30days',
  '90d': 'filter.createdAt.last90days'
};

const CREATED_AT_ORDER: CreatedAtFilter[] = ['all', '7d', '30d', '90d'];

export const BuyerFilterMenu: FC<BuyerFilterMenuProps> = ({filter, onChange}) => {
  const {t} = useTranslation('trustAccounts');

  const createdAtOptions = CREATED_AT_ORDER.map(value => ({
    value,
    label: t(CREATED_AT_KEYS[value])
  }));

  return (
    <div data-slot="buyer-filter-menu" className="flex flex-col py-2">
      <ListFilterHeader
        title={t('view.buyers.list.filter.title')}
        clearLabel={t('view.buyers.list.filter.clearAll')}
        isActive={isBuyerFilterActive(filter)}
        onClearAll={() => onChange(DEFAULT_BUYER_FILTER_STATE)}
      />
      <ListFilterCreatedAtSection
        sectionLabel={t('filter.sections.createdAt')}
        options={createdAtOptions}
        createdAt={filter.createdAt}
        hasDateRange={false}
        onChange={createdAt => onChange({...filter, createdAt})}
      />
      <Divider className="my-1" />
      <BuyerFilterPaymentStatusSection
        selected={filter.paymentStatuses}
        onChange={paymentStatuses => onChange({...filter, paymentStatuses})}
      />
      <Divider className="my-1" />
      <BuyerFilterDepositRangeSection
        depositRange={filter.depositRange}
        onChange={depositRange => onChange({...filter, depositRange})}
      />
    </div>
  );
};
