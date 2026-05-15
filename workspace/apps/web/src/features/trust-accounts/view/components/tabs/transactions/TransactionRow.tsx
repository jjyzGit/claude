import {TransactionDirection, TransactionStatus} from '@sollapay/enums';
import {AmountDisplay, cn, Icon, Typography} from '@sollapay/ui';
import {parseMoney} from '@sollapay/utils';
import {useTranslation} from 'react-i18next';

import {formatUnitLabel} from '@/features/buyers/utils';
import {PaymentInitiationMethodBadge} from '@/features/buyers/view/components/PaymentInitiationMethodBadge';

import {TransactionStatusBadge} from './TransactionStatusBadge';

import type {TrustAccountTransactionDTO} from '@sollapay/types';
import type {FC} from 'react';

interface TransactionRowProps {
  transaction: TrustAccountTransactionDTO;
}

export const TransactionRow: FC<TransactionRowProps> = ({transaction}) => {
  const {t} = useTranslation('trustAccounts');
  const isCredit = transaction.direction === TransactionDirection.CREDIT;
  const isInflight = transaction.status === TransactionStatus.INFLIGHT;
  const amountPrefix = isCredit ? '+' : '-';
  const formattedAmount = parseMoney(transaction.amount).formatNIS({symbol: true});

  return (
    <div
      data-slot="transaction-row"
      className="flex h-18 w-full items-center rounded-xl border border-border-subtle bg-background-surface shadow-sm"
    >
      <div className="flex w-[25%] shrink-0 items-center gap-3 px-6">
        <Icon
          data-slot="direction-icon"
          name={isCredit ? 'sollapay:payin' : 'sollapay:payout'}
          className="size-8 shrink-0"
        />
        <div className="flex min-w-0 flex-col items-start">
          {transaction.buyerName != null && (
            <Typography size="sm" weight="medium">
              {transaction.buyerName}
            </Typography>
          )}
          {transaction.unit != null && (
            <Typography size="xs" color="tertiary">
              {formatUnitLabel(transaction.unit, t)}
            </Typography>
          )}
        </div>
      </div>

      <div className="flex w-39 shrink-0 items-center px-6">
        {transaction.initiationMethod != null && (
          <PaymentInitiationMethodBadge method={transaction.initiationMethod} />
        )}
      </div>

      <div className="flex w-39 shrink-0 items-center px-6">
        <TransactionStatusBadge status={transaction.status} />
      </div>

      <div className={cn('flex min-w-0 flex-1 items-center px-6', !isInflight && 'justify-end')}>
        {isInflight ? (
          <div data-slot="inflight-amount" className="flex items-center gap-1" dir="ltr">
            {transaction.percent != null && (
              <Typography size="xs" color="tertiary">
                ({transaction.percent}%)
              </Typography>
            )}
            <div className="flex items-center gap-1">
              <Typography size="md" weight="semibold">
                {amountPrefix}
              </Typography>
              <Typography size="sm" weight="semibold">
                {formattedAmount}
              </Typography>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-end">
            <AmountDisplay amountNis={transaction.amount} variant={isCredit ? 'credit' : 'debit'} />
            {transaction.percent != null && (
              <Typography size="xs" color="tertiary">
                {transaction.percent}%
              </Typography>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
