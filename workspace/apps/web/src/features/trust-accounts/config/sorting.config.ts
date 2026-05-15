import {getAccountBalanceAmount} from '../utils';

import type {TrustAccountListItemDTO, TrustAccountListLedgerDTO} from '@sollapay/types';
import type {ListSortConfig} from '@sollapay/ui/components';

export const TRUST_ACCOUNT_SORT_CONFIG = (
  balancesMap?: Record<string, TrustAccountListLedgerDTO>
): ListSortConfig<TrustAccountListItemDTO> => ({
  order: ['createdAt', 'trustName', 'type', 'status', 'balance'],
  fields: {
    createdAt: {
      i18nKey: 'sorting.options.createdAt',
      defaultDesc: true,
      getValue: (account: TrustAccountListItemDTO) => new Date(account.createdAt).getTime()
    },
    trustName: {
      i18nKey: 'sorting.options.trustName',
      defaultDesc: false,
      getValue: (account: TrustAccountListItemDTO) => account.name
    },
    type: {
      i18nKey: 'sorting.options.type',
      defaultDesc: false,
      getValue: (account: TrustAccountListItemDTO) => account.trustPurpose ?? ''
    },
    status: {
      i18nKey: 'sorting.options.status',
      defaultDesc: false,
      getValue: (account: TrustAccountListItemDTO) => account.trustStatus
    },
    balance: {
      i18nKey: 'sorting.options.balance',
      defaultDesc: true,
      getValue: (account: TrustAccountListItemDTO) =>
        getAccountBalanceAmount(account.id, account.trustStatus, balancesMap)
    }
  }
});
