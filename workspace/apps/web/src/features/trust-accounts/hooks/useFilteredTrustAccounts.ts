import {useMemo} from 'react';

import type {TrustAccountFilterState} from '../utils/filter.utils';
import type {TrustAccountListItemDTO} from '@sollapay/types';

export function useFilteredTrustAccounts(
  accounts: TrustAccountListItemDTO[],
  searchText: string,
  filter: TrustAccountFilterState
): TrustAccountListItemDTO[] {
  return useMemo(() => {
    let result = accounts;

    if (filter.statuses.length > 0) {
      result = result.filter(a => filter.statuses.includes(a.trustStatus));
    }

    if (filter.purposes.length > 0) {
      result = result.filter(
        a => a.trustPurpose != null && filter.purposes.includes(a.trustPurpose)
      );
    }

    if (filter.dateRange) {
      const {from, to} = filter.dateRange;
      const toEndOfDay = new Date(to);
      toEndOfDay.setHours(23, 59, 59, 999);
      result = result.filter(a => {
        const created = new Date(a.createdAt);
        return created >= from && created <= toEndOfDay;
      });
    } else if (filter.createdAt !== 'all') {
      const days = filter.createdAt === '7d' ? 7 : filter.createdAt === '30d' ? 30 : 90;
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      result = result.filter(a => new Date(a.createdAt) >= cutoff);
    }

    if (searchText.trim()) {
      const query = searchText.trim().toLowerCase();
      result = result.filter(
        a => a.name.toLowerCase().includes(query) || a.refId.toLowerCase().includes(query)
      );
    }

    return result;
  }, [accounts, searchText, filter]);
}
