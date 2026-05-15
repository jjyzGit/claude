import {TimelineTable} from '@/components';

import {TransactionGroupHeader} from './TransactionGroupHeader';
import {TransactionRow} from './TransactionRow';

import type {TransactionGroupBy} from '@sollapay/enums';
import type {TrustAccountTransactionDTO, TrustAccountTransactionGroupDTO} from '@sollapay/types';
import type {ReactNode, FC} from 'react';

interface TransactionsTimelineTableProps {
  groups: TrustAccountTransactionGroupDTO[];
  groupBy: TransactionGroupBy;
  emptyState?: ReactNode;
}

export const TransactionsTimelineTable: FC<TransactionsTimelineTableProps> = ({
  groups,
  groupBy,
  emptyState
}) => {
  const timelineGroups = groups.map(group => ({
    id: group.groupKey,
    header: <TransactionGroupHeader group={group} groupBy={groupBy} />,
    items: group.transactions
  }));

  return (
    <TimelineTable<TrustAccountTransactionDTO>
      groups={timelineGroups}
      renderItem={tx => <TransactionRow transaction={tx} />}
      getItemKey={tx => tx.id}
      emptyState={emptyState}
      className="flex flex-col gap-6"
    />
  );
};
