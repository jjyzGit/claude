import type {BuyerPaymentStatus} from '../types/buyers.types';
import type {CreatedAtFilter} from '@sollapay/ui/components';

export interface BuyerFilterState {
  createdAt: CreatedAtFilter;
  paymentStatuses: BuyerPaymentStatus[];
  depositRange?: {min: number; max: number};
}

export const DEFAULT_BUYER_FILTER_STATE: BuyerFilterState = {
  createdAt: 'all',
  paymentStatuses: []
};

export const BUYER_PAYMENT_STATUS_FILTER_OPTIONS: ReadonlyArray<{value: BuyerPaymentStatus}> = [
  {value: 'no_request'},
  {value: 'request_sent'},
  {value: 'partial'},
  {value: 'completed'},
  {value: 'cancelled'},
  {value: 'expired'}
];
