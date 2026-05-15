import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {formatUnitLabel} from '../utils';
import {applyBuyerFilter} from '../utils/buyer-filter.utils';

import type {BuyerFilterState} from '../config/buyer-filter.config';
import type {BuyerTableRow} from '../types/buyers.types';

export function useFilteredBuyers(
  rows: BuyerTableRow[],
  searchText: string,
  filter?: BuyerFilterState
): BuyerTableRow[] {
  const {t} = useTranslation('trustAccounts');

  return useMemo(() => {
    let result = rows;

    if (searchText.trim()) {
      const query = searchText.trim().toLowerCase();
      result = result.filter(row => {
        const {unit} = row.purchase;
        return (
          row.buyers.some(b => b.fullName.toLowerCase().includes(query)) ||
          formatUnitLabel(unit, t).toLowerCase().includes(query) ||
          unit.buildingNumber.toLowerCase().includes(query) ||
          unit.unitNumber.toLowerCase().includes(query)
        );
      });
    }

    if (filter) {
      result = applyBuyerFilter(result, filter);
    }

    return result;
  }, [rows, searchText, filter, t]);
}
