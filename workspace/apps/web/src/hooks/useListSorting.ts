import {parseSortState} from '@sollapay/ui/components';
import {useMemo, useState} from 'react';

import type {ListOnSortingChange, ListSortConfig, ListSortingState} from '@sollapay/ui/components';

interface UseListSortingReturn<T> {
  sorting: ListSortingState;
  onSortingChange: ListOnSortingChange;
  sortedItems: T[];
}

export function useListSorting<T>(
  items: readonly T[],
  config: ListSortConfig<T>
): UseListSortingReturn<T> {
  const [sorting, setSorting] = useState<ListSortingState>([]);

  const sortedItems = useMemo(() => {
    const {field, desc} = parseSortState(sorting, config);
    if (!field) return [...items];

    const fieldConfig = config.fields[field];
    if (!fieldConfig) return [...items];

    const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    return [...items].sort((a, b) => {
      const aVal = fieldConfig.getValue(a);
      const bVal = fieldConfig.getValue(b);
      if (aVal === null && bVal === null) return 0;
      if (aVal === null) return 1;
      if (bVal === null) return -1;
      const comparison =
        typeof aVal === 'number' && typeof bVal === 'number'
          ? aVal - bVal
          : collator.compare(String(aVal), String(bVal));
      return desc ? -comparison : comparison;
    });
  }, [items, sorting, config]);

  return {sorting, onSortingChange: setSorting, sortedItems};
}
