import {TransactionDirection, InitiationMethod} from '@sollapay/enums';
import {
  Divider,
  ListFilterCheckboxSection,
  ListFilterCreatedAtSection,
  ListFilterHeader
} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {PaymentInitiationMethodBadge} from '@/features/buyers/view/components/PaymentInitiationMethodBadge';

import {DEFAULT_TRANSACTIONS_FILTER_STATE} from './config/transactions-filter.config';
import {isTransactionsFilterActive} from './utils/transactions.utils';

import type {TransactionsFilterState} from './config/transactions-filter.config';
import type {CreatedAtFilter} from '@sollapay/ui/components';
import type {FC} from 'react';

export interface TransactionsFilterMenuProps {
  filter: TransactionsFilterState;
  onChange: (filter: TransactionsFilterState) => void;
}

const CREATED_AT_KEYS: Record<CreatedAtFilter, string> = {
  all: 'filter.createdAt.all',
  '7d': 'filter.createdAt.last7days',
  '30d': 'filter.createdAt.last30days',
  '90d': 'filter.createdAt.last90days'
};

const CREATED_AT_ORDER: CreatedAtFilter[] = ['all', '7d', '30d', '90d'];

// RTP and PIS share the same label ("ייזום תשלום") — represent both with RTP as the canonical option.
// When RTP is selected in the filter, the utils also matches PIS transactions.
const INITIATION_METHOD_OPTIONS: ReadonlyArray<{value: InitiationMethod}> = [
  {value: InitiationMethod.RTP},
  {value: InitiationMethod.MANUAL_BRANCH_TRANSFER}
];

const DIRECTION_OPTIONS: ReadonlyArray<{value: TransactionDirection}> = [
  {value: TransactionDirection.CREDIT},
  {value: TransactionDirection.DEBIT}
];

export const TransactionsFilterMenu: FC<TransactionsFilterMenuProps> = ({filter, onChange}) => {
  const {t} = useTranslation('trustAccounts');

  const createdAtOptions = CREATED_AT_ORDER.map(value => ({
    value,
    label: t(CREATED_AT_KEYS[value])
  }));

  const initiationMethodOptions = INITIATION_METHOD_OPTIONS.map(opt => ({
    value: opt.value,
    label: <PaymentInitiationMethodBadge method={opt.value} />
  }));

  const directionOptions = DIRECTION_OPTIONS.map(opt => ({
    value: opt.value,
    label: t(`view.transactions.filter.direction.${opt.value}`)
  }));

  return (
    <div data-slot="transactions-filter-menu" className="flex flex-col py-2">
      <ListFilterHeader
        title={t('view.transactions.filter.title')}
        clearLabel={t('view.transactions.filter.clearAll')}
        isActive={isTransactionsFilterActive(filter)}
        onClearAll={() => onChange(DEFAULT_TRANSACTIONS_FILTER_STATE)}
      />
      <ListFilterCreatedAtSection
        sectionLabel={t('filter.sections.createdAt')}
        options={createdAtOptions}
        createdAt={filter.datePreset}
        hasDateRange={false}
        onChange={datePreset => onChange({...filter, datePreset})}
      />
      <Divider className="my-1" />
      <ListFilterCheckboxSection
        title={t('view.transactions.filter.sections.paymentType')}
        options={initiationMethodOptions}
        selected={filter.initiationMethods}
        onChange={vals => onChange({...filter, initiationMethods: vals as InitiationMethod[]})}
      />
      <Divider className="my-1" />
      <ListFilterCheckboxSection
        title={t('view.transactions.filter.sections.direction')}
        options={directionOptions}
        selected={filter.directions}
        onChange={vals => onChange({...filter, directions: vals as TransactionDirection[]})}
      />
      <Divider className="my-1" />
      <div className="px-3 pb-1 pt-2">
        <span className="text-xs font-semibold text-fg-tertiary">
          {t('view.transactions.filter.sections.amountRange')}
        </span>
      </div>
      <div className="flex items-start gap-2 px-3 pb-2 pt-1">
        <div className="flex flex-1 flex-col gap-1.5">
          <span className="text-xs font-medium text-fg-secondary">
            {t('view.transactions.filter.amountRange.from')}
          </span>
          <div className="relative">
            <span
              data-slot="icon"
              className="pointer-events-none absolute inset-e-2 top-1/2 -translate-y-1/2 text-xs text-fg-tertiary"
            >
              ₪
            </span>
            <input
              type="number"
              min={0}
              value={filter.amountMin ?? ''}
              onChange={e => {
                const val = e.target.value === '' ? undefined : Number(e.target.value);
                onChange({...filter, amountMin: val});
              }}
              className="input-base h-9 w-full pe-6 text-sm"
              placeholder="0"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <span className="text-xs font-medium text-fg-secondary">
            {t('view.transactions.filter.amountRange.to')}
          </span>
          <div className="relative">
            <span
              data-slot="icon"
              className="pointer-events-none absolute inset-e-2 top-1/2 -translate-y-1/2 text-xs text-fg-tertiary"
            >
              ₪
            </span>
            <input
              type="number"
              min={0}
              value={filter.amountMax ?? ''}
              onChange={e => {
                const val = e.target.value === '' ? undefined : Number(e.target.value);
                onChange({...filter, amountMax: val});
              }}
              className="input-base h-9 w-full pe-6 text-sm"
              placeholder="∞"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
