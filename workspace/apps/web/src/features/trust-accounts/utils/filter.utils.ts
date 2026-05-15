import type {TrustPurpose, TrustStatus} from '@sollapay/enums';
import type {CreatedAtFilter, DateRange} from '@sollapay/ui/components';

/** @deprecated Use `CreatedAtFilter` from `@/components/lists` */
export type TrustAccountCreatedAtFilter = CreatedAtFilter;

/** @deprecated Use `DateRange` from `@/components/lists` */
export type TrustAccountDateRange = DateRange;

export interface TrustAccountFilterState {
  statuses: TrustStatus[];
  purposes: TrustPurpose[];
  createdAt: CreatedAtFilter;
  dateRange?: DateRange;
}

export function isFilterActive(filter: TrustAccountFilterState): boolean {
  return (
    filter.statuses.length > 0 ||
    filter.purposes.length > 0 ||
    filter.createdAt !== 'all' ||
    filter.dateRange !== undefined
  );
}

export function countActiveFilters(filter: TrustAccountFilterState): number {
  let count = filter.statuses.length + filter.purposes.length;
  if (filter.createdAt !== 'all' || filter.dateRange !== undefined) count++;
  return count;
}
