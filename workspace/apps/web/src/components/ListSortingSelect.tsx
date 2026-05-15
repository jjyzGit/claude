import {ListSortingSelect as ListSortingSelectUI, parseSortState} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import type {ListOnSortingChange, ListSortConfig, ListSortingState} from '@sollapay/ui/components';
import type {FC} from 'react';

export interface ListSortingSelectProps<T> {
  config: ListSortConfig<T>;
  sorting: ListSortingState;
  onSortingChange: ListOnSortingChange;
  disabled?: boolean;
  className?: string;
}

function ListSortingSelectInner<T>({
  config,
  sorting,
  onSortingChange,
  disabled,
  className
}: ListSortingSelectProps<T>) {
  const {t} = useTranslation('trustAccounts');
  const {t: tc} = useTranslation('common');

  const {field: selectedField, desc: isDescending} = parseSortState(sorting, config);

  const options = config.order.map(value => ({
    value,
    label: t(config.fields[value]?.i18nKey ?? value),
    defaultDesc: config.fields[value]?.defaultDesc ?? true
  }));

  const resolvedSorting = selectedField ? [{id: selectedField, desc: isDescending}] : [];

  return (
    <ListSortingSelectUI
      options={options}
      sorting={resolvedSorting}
      onSortingChange={onSortingChange}
      labels={{
        placeholder: tc('sorting.placeholder'),
        clear: tc('sorting.clear'),
        toggleAsc: tc('sorting.toggleAsc'),
        toggleDesc: tc('sorting.toggleDesc')
      }}
      disabled={disabled}
      className={className}
    />
  );
}

export const ListSortingSelect = ListSortingSelectInner as <T>(
  props: ListSortingSelectProps<T>
) => ReturnType<FC>;
