import type {BuyerDTO, BuyerPurchaseDTO} from '@sollapay/types';

export type BuyerPaymentStatus =
  | 'no_request'
  | 'request_sent'
  | 'partial'
  | 'completed'
  | 'cancelled'
  | 'expired';

export interface BuyerTableRow {
  buyers: [BuyerDTO, ...BuyerDTO[]];
  purchase: BuyerPurchaseDTO;
  amountToPayNis: string;
  depositPaidNis: string;
  paymentStatus: BuyerPaymentStatus;
}
