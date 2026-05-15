import {DEFAULT_BUYER_FILTER_STATE} from '../config/buyer-filter.config';

import type {BuyerFilterState} from '../config/buyer-filter.config';
import type {BuyerTableRow} from '../types/buyers.types';

export function isBuyerFilterActive(filter: BuyerFilterState): boolean {
  return (
    filter.createdAt !== 'all' ||
    filter.paymentStatuses.length > 0 ||
    filter.depositRange !== undefined
  );
}

export function countBuyerActiveFilters(filter: BuyerFilterState): number {
  let count = filter.paymentStatuses.length;
  if (filter.createdAt !== 'all') count++;
  if (filter.depositRange !== undefined) count++;
  return count;
}

export function applyBuyerFilter(rows: BuyerTableRow[], filter: BuyerFilterState): BuyerTableRow[] {
  if (!isBuyerFilterActive(filter)) return rows;

  return rows.filter(row => {
    if (filter.paymentStatuses.length > 0 && !filter.paymentStatuses.includes(row.paymentStatus)) {
      return false;
    }

    if (filter.depositRange !== undefined) {
      const depositAmount = Number(row.depositPaidNis);
      if (depositAmount < filter.depositRange.min || depositAmount > filter.depositRange.max) {
        return false;
      }
    }

    if (filter.createdAt !== 'all') {
      const days = filter.createdAt === '7d' ? 7 : filter.createdAt === '30d' ? 30 : 90;
      const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      if (new Date(row.buyers[0].createdAt) < cutoff) return false;
    }

    return true;
  });
}

export function clearBuyerFilter(): BuyerFilterState {
  return DEFAULT_BUYER_FILTER_STATE;
}
