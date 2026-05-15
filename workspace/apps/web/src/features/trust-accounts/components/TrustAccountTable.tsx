import {TrustStatus} from '@sollapay/enums';
import {Table, Typography, nodeColumn, TableActionsCell} from '@sollapay/ui/components';
import {formatDateLocalized} from '@sollapay/utils';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {TrustAccountActionButton} from './TrustAccountActionButton';
import {TrustAccountAvatar} from './TrustAccountAvatar';
import {TrustAccountBadge} from './TrustAccountBadge';
import {TrustAccountBalanceChip} from './TrustAccountBalanceChip';
import {TrustAccountMoreMenu} from './TrustAccountMoreMenu';
import {displayOrNA, getAccountBalanceAmount, getTrustTypeLabel} from '../utils';

import type {TrustAccountListItemDTO, TrustAccountListLedgerDTO} from '@sollapay/types';
import type {ListOnSortingChange, ListSortingState} from '@sollapay/ui/components';
import type {FC} from 'react';

interface TrustAccountTableProps {
  accounts: TrustAccountListItemDTO[];
  balancesMap?: Record<string, TrustAccountListLedgerDTO>;
  sorting: ListSortingState;
  onSortingChange: ListOnSortingChange;
  onEditAccount: (account: TrustAccountListItemDTO) => void;
  onDeleteAccount: (account: TrustAccountListItemDTO) => void;
  onAccountActionClick?: (account: TrustAccountListItemDTO) => void;
  onRowClick?: (account: TrustAccountListItemDTO) => void;
}

export const TrustAccountTable: FC<TrustAccountTableProps> = ({
  accounts,
  balancesMap,
  sorting,
  onSortingChange,
  onEditAccount,
  onDeleteAccount,
  onAccountActionClick,
  onRowClick
}) => {
  const {t, i18n} = useTranslation(['trustAccounts', 'common']);

  const columns = useMemo(
    () => [
      nodeColumn<TrustAccountListItemDTO>({
        id: 'trustName',
        header: t('columns.trustName'),
        maxWidth: 200,
        accessorFn: row => row.name,
        cell: row => (
          <div className="flex flex-row items-center gap-6">
            <TrustAccountAvatar name={row.name} trustPurpose={row.trustPurpose} />
            <div className="flex flex-col gap-0.5 min-w-0">
              <Typography size="sm" weight="medium">
                {row.name}
              </Typography>
              <Typography size="xs" color="tertiary">
                {t('activation.refIdTooltip', {refId: row.refId})}
              </Typography>
            </div>
          </div>
        )
      }),
      nodeColumn<TrustAccountListItemDTO>({
        id: 'balance',
        header: t('columns.balance'),
        accessorFn: row => getAccountBalanceAmount(row.id, row.trustStatus, balancesMap) ?? 0,
        width: 'min',
        cell: row => {
          return (
            <TrustAccountBalanceChip
              status={row.trustStatus}
              balance={balancesMap?.[row.id]?.balance}
              size="sm"
            />
          );
        }
      }),
      nodeColumn<TrustAccountListItemDTO>({
        id: 'type',
        header: t('columns.type'),
        width: 'min',
        accessorFn: row => row.trustPurpose ?? '',
        cell: row => (
          <Typography size="sm">
            {displayOrNA(getTrustTypeLabel(row.trustPurpose, t), t)}
          </Typography>
        )
      }),
      nodeColumn<TrustAccountListItemDTO>({
        id: 'developer',
        header: t('columns.developer'),
        maxWidth: 120,
        accessorFn: row => row.developerName ?? '',
        cell: row => (
          <Typography size="sm" color={row.developerName ? 'default' : 'tertiary'}>
            {displayOrNA(row.developerName, t)}
          </Typography>
        )
      }),
      nodeColumn<TrustAccountListItemDTO>({
        id: 'status',
        header: t('status'),
        width: 'min',
        accessorFn: row => row.trustStatus,
        cell: row => <TrustAccountBadge status={row.trustStatus} />
      }),
      nodeColumn<TrustAccountListItemDTO>({
        id: 'createdAt',
        header: t('columns.date'),
        width: 'min',
        accessorFn: row => String(row.createdAt),
        cell: row => (
          <Typography size="sm" color="secondary" className="tabular-nums">
            {formatDateLocalized(row.createdAt, i18n.language)}
          </Typography>
        )
      }),
      nodeColumn<TrustAccountListItemDTO>({
        id: 'actions',
        header: '',
        width: 'min',
        enableSorting: false,
        cell: row => (
          <TableActionsCell>
            <TrustAccountActionButton
              status={row.trustStatus}
              onClick={() => onAccountActionClick?.(row)}
            />
            <div className="flex size-9 shrink-0 items-center justify-center">
              {row.trustStatus === TrustStatus.SETUP_IN_PROGRESS && (
                <TrustAccountMoreMenu
                  actions={['edit', 'delete']}
                  onEdit={() => onEditAccount(row)}
                  onDelete={() => onDeleteAccount(row)}
                />
              )}
            </div>
          </TableActionsCell>
        )
      })
    ],
    [balancesMap, i18n.language, onAccountActionClick, onDeleteAccount, onEditAccount, t]
  );

  return (
    <Table
      columns={columns}
      data={accounts}
      sorting={sorting}
      onSortingChange={onSortingChange}
      onRowClick={onRowClick}
      manualSorting
      emptyStateText={t('common:noResults')}
    />
  );
};
