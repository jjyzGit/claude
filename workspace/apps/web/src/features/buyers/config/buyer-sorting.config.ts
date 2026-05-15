import type {BuyerTableRow} from '../types/buyers.types';
import type {ListSortConfig} from '@sollapay/ui/components';

export const BUYER_SORT_CONFIG: ListSortConfig<BuyerTableRow> = {
  order: ['createdAt', 'fullName', 'purchasePrice', 'depositPaid', 'paymentStatus', 'unit'],
  fields: {
    createdAt: {
      i18nKey: 'view.buyers.list.sorting.createdAt',
      defaultDesc: true,
      getValue: (row: BuyerTableRow) => new Date(row.buyers[0].createdAt).getTime()
    },
    fullName: {
      i18nKey: 'view.buyers.list.sorting.fullName',
      defaultDesc: false,
      getValue: (row: BuyerTableRow) => row.buyers[0].fullName
    },
    purchasePrice: {
      i18nKey: 'view.buyers.list.sorting.purchasePrice',
      defaultDesc: true,
      getValue: (row: BuyerTableRow) => Number(row.purchase.purchasePriceNis)
    },
    depositPaid: {
      i18nKey: 'view.buyers.list.sorting.depositPaid',
      defaultDesc: true,
      getValue: (row: BuyerTableRow) => Number(row.depositPaidNis)
    },
    paymentStatus: {
      i18nKey: 'view.buyers.list.sorting.paymentStatus',
      defaultDesc: false,
      getValue: (row: BuyerTableRow) => row.paymentStatus
    },
    unit: {
      i18nKey: 'view.buyers.list.sorting.unit',
      defaultDesc: false,
      getValue: (row: BuyerTableRow) =>
        `${row.purchase.unit.buildingNumber}|||${row.purchase.unit.unitNumber}`
    }
  }
};
