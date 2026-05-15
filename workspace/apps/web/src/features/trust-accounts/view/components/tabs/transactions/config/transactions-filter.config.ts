import type {TransactionDirection, InitiationMethod} from '@sollapay/enums';
import type {CreatedAtFilter} from '@sollapay/ui/components';

export type {CreatedAtFilter};

export interface TransactionsFilterState {
  datePreset: CreatedAtFilter;
  amountMin?: number;
  amountMax?: number;
  initiationMethods: InitiationMethod[];
  directions: TransactionDirection[];
}

export const DEFAULT_TRANSACTIONS_FILTER_STATE: TransactionsFilterState = {
  datePreset: 'all',
  initiationMethods: [],
  directions: []
};
