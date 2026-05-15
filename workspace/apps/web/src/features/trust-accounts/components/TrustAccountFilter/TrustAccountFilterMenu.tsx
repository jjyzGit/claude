import {Divider, ListFilterCreatedAtSection, ListFilterHeader} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {TrustAccountFilterDateRangeSection} from './TrustAccountFilterDateRangeSection';
import {TrustAccountFilterPurposeSection} from './TrustAccountFilterPurposeSection';
import {TrustAccountFilterStatusSection} from './TrustAccountFilterStatusSection';
import {CREATED_AT_FILTER_OPTIONS, DEFAULT_FILTER_STATE} from '../../config/filter.config';
import {isFilterActive} from '../../utils/filter.utils';

import type {
  TrustAccountFilterState,
  TrustAccountCreatedAtFilter,
  TrustAccountDateRange
} from '../../utils/filter.utils';
import type {TrustPurpose, TrustStatus} from '@sollapay/enums';
import type {FC} from 'react';

export interface TrustAccountFilterMenuProps {
  filter: TrustAccountFilterState;
  onChange: (filter: TrustAccountFilterState) => void;
}

export const TrustAccountFilterMenu: FC<TrustAccountFilterMenuProps> = ({filter, onChange}) => {
  const {t} = useTranslation('trustAccounts');

  const handleStatusChange = (statuses: TrustStatus[]) => onChange({...filter, statuses});
  const handlePurposeChange = (purposes: TrustPurpose[]) => onChange({...filter, purposes});
  const handleCreatedAtChange = (createdAt: TrustAccountCreatedAtFilter) =>
    onChange({...filter, createdAt, dateRange: undefined});
  const handleDateRangeChange = (dateRange: TrustAccountDateRange | undefined) =>
    onChange({...filter, createdAt: 'all', dateRange});

  const createdAtOptions = CREATED_AT_FILTER_OPTIONS.map(opt => ({
    value: opt.value,
    label: t(opt.i18nKey)
  }));

  return (
    <div data-slot="trust-account-filter-menu" className="flex flex-col py-2">
      <ListFilterHeader
        title={t('filter.title')}
        clearLabel={t('filter.clearAll')}
        isActive={isFilterActive(filter)}
        onClearAll={() => onChange(DEFAULT_FILTER_STATE)}
      />
      <TrustAccountFilterStatusSection statuses={filter.statuses} onChange={handleStatusChange} />
      <Divider className="my-1" />
      <TrustAccountFilterPurposeSection purposes={filter.purposes} onChange={handlePurposeChange} />
      <Divider className="my-1" />
      <ListFilterCreatedAtSection
        sectionLabel={t('filter.sections.createdAt')}
        options={createdAtOptions}
        createdAt={filter.createdAt}
        hasDateRange={filter.dateRange !== undefined}
        onChange={handleCreatedAtChange}
      />
      <Divider className="my-1" />
      <TrustAccountFilterDateRangeSection
        dateRange={filter.dateRange}
        onChange={handleDateRangeChange}
      />
    </div>
  );
};
