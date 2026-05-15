import {TransactionGroupBy} from '@sollapay/enums';
import {Badge} from '@sollapay/ui/components';
import {cn} from '@sollapay/ui/lib';
import {dateToIso, formatNIS, parseMoney} from '@sollapay/utils';
import {useTranslation} from 'react-i18next';

import {formatUnitLabel} from '@/features/buyers/utils';

import type {TrustAccountTransactionDTO, TrustAccountTransactionGroupDTO} from '@sollapay/types';
import type {TFunction} from 'i18next';
import type {FC} from 'react';

interface TransactionGroupHeaderProps {
  group: TrustAccountTransactionGroupDTO;
  groupBy: TransactionGroupBy;
}

function resolveDateLabel(dateKey: string, t: TFunction, language: string): string {
  const todayStr = dateToIso(new Date());
  const yesterdayStr = dateToIso(new Date(Date.now() - 86_400_000));
  const dayBeforeStr = dateToIso(new Date(Date.now() - 2 * 86_400_000));

  if (dateKey === todayStr) return t('view.transactions.date.today');
  if (dateKey === yesterdayStr) return t('view.transactions.date.yesterday');
  if (dateKey === dayBeforeStr) return t('view.transactions.date.dayBefore');

  return new Intl.DateTimeFormat(language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(dateKey));
}

function resolveGroupLabel(
  group: TrustAccountTransactionGroupDTO,
  groupBy: TransactionGroupBy,
  t: TFunction,
  language: string
): string {
  const {groupKey, transactions} = group;
  const firstTx: TrustAccountTransactionDTO | undefined = transactions[0];

  switch (groupBy) {
    case TransactionGroupBy.DATE:
      return resolveDateLabel(groupKey, t, language);
    case TransactionGroupBy.COUNTERPARTY:
      return firstTx?.buyerName ?? groupKey;
    case TransactionGroupBy.PURCHASE:
      return firstTx?.unit ? formatUnitLabel(firstTx.unit, t) : groupKey;
    case TransactionGroupBy.STATUS:
      return t(`view.transactions.status.${groupKey}`);
    case TransactionGroupBy.INITIATION_METHOD:
      return groupKey === 'unknown'
        ? t('view.transactions.initiationMethod.unknown')
        : t(`view.transactions.initiationMethod.${groupKey}`);
    case TransactionGroupBy.DIRECTION:
      return t(`view.transactions.direction.${groupKey}`);
  }
}

export const TransactionGroupHeader: FC<TransactionGroupHeaderProps> = ({group, groupBy}) => {
  const {t, i18n} = useTranslation('trustAccounts');
  const groupLabel = resolveGroupLabel(group, groupBy, t, i18n.language);
  const balance = parseMoney(group.totalBalanceNis);
  const isPositive = balance.gte(0);
  const formattedBalance = formatNIS(balance.abs());

  return (
    <div
      data-slot="transaction-group-header"
      className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3"
    >
      <div className="flex items-center gap-2">
        <span data-slot="label" className="text-sm font-semibold text-gray-900">
          {groupLabel}
        </span>
        <Badge variant="gray" size="sm">
          {t('view.transactions.group.transactionCount', {count: group.transactionCount})}
        </Badge>
      </div>

      <span
        data-slot="total-balance"
        className={cn('text-sm font-semibold', isPositive ? 'text-green-600' : 'text-red-600')}
      >
        {formattedBalance}
      </span>
    </div>
  );
};
