import {Money, formatDateLocalized, formatNIS} from '@sollapay/utils';

import {BUYER_PAYMENT_STATUS_CONFIG} from './buyers.config';
import {formatBuyerDisplayName} from '../utils';

import type {BuyerTableRow} from '../types/buyers.types';
import type {ExportColumn} from '@/utils';
import type {TFunction} from 'i18next';

export function createBuyerExportColumns(
  t: TFunction,
  language: string
): ExportColumn<BuyerTableRow>[] {
  return [
    {
      header: t('view.buyers.list.columns.buyerName'),
      value: row => formatBuyerDisplayName(row.buyers[0].fullName)
    },
    {
      header: t('view.buyers.list.columns.createdAt'),
      value: row => formatDateLocalized(row.buyers[0].createdAt, language)
    },
    {
      header: t('view.buyers.list.columns.purchasePrice'),
      value: row => formatNIS(row.purchase.purchasePriceNis),
      rawValue: row => Money.from(row.purchase.purchasePriceNis).toNumber()
    },
    {
      header: t('view.buyers.list.columns.amountToPay'),
      value: row => formatNIS(row.amountToPayNis),
      rawValue: row => Money.from(row.amountToPayNis).toNumber()
    },
    {
      header: t('view.buyers.list.columns.depositPaid'),
      value: row => formatNIS(row.depositPaidNis),
      rawValue: row => Money.from(row.depositPaidNis).toNumber()
    },
    {
      header: t('view.buyers.list.columns.paymentStatus'),
      value: row => t(BUYER_PAYMENT_STATUS_CONFIG[row.paymentStatus].labelKey)
    }
  ];
}
