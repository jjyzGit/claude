import {TrustStatus} from '@sollapay/enums';
import {IconBox, Typography} from '@sollapay/ui';
import {Money} from '@sollapay/utils';
import {useTranslation} from 'react-i18next';

import type {TrustAccountLedgerDTO} from '@sollapay/types';

export interface TrustAccountViewBalanceMetricProps {
  status: TrustStatus;
  balance?: TrustAccountLedgerDTO | null;
}

export function TrustAccountViewBalanceMetric({
  status,
  balance
}: TrustAccountViewBalanceMetricProps) {
  const {t} = useTranslation('trustAccounts');

  if (status !== TrustStatus.TRUST_ACTIVE || balance == null) return null;

  const amount = Money.from(balance.balance).formatNIS({symbol: true});

  return (
    <div
      data-slot="trust-account-view-balance-metric"
      className="flex flex-col items-end justify-center rounded-xl border border-border bg-background-surface ps-4 pe-6 py-3 shadow-sm"
    >
      <div className="flex items-center gap-4">
        <IconBox icon="wallet" shadow iconColor="secondary" />
        <div className="flex flex-col items-end gap-2">
          <Typography size="sm" weight="medium" color="tertiary" className="whitespace-nowrap">
            {t('view.balanceMetric.title')}
          </Typography>
          <div className="flex items-end gap-1 font-semibold">
            <span className="text-xl leading-body-xl text-fg tabular-nums">{amount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
