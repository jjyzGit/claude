import {Table, Typography, nodeColumn, TableActionsCell} from '@sollapay/ui/components';
import {formatDateLocalized, formatNIS} from '@sollapay/utils';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {formatBuyerDisplayName, formatUnitLabel} from '../utils';
import {BuyerActionButton} from './BuyerActionButton';
import {BuyerAvatarStack} from './BuyerAvatarStack';
import {BuyerMoreMenu} from './BuyerMoreMenu';
import {BuyerPaymentStatusBadge} from './BuyerPaymentStatusBadge';
import {BuyerRegulatoryReportsBadge} from './BuyerRegulatoryReportsBadge';

import type {BuyerTableRow} from '../types/buyers.types';
import type {BuyerDTO} from '@sollapay/types';
import type {ListOnSortingChange, ListSortingState} from '@sollapay/ui/components';
import type {FC} from 'react';

export interface BuyerTableProps {
  rows: BuyerTableRow[];
  sorting: ListSortingState;
  onSortingChange: ListOnSortingChange;
  onRequestPayment: (buyer: BuyerDTO) => void;
  onViewBuyer: (buyer: BuyerDTO) => void;
  trustAccountId: string;
}

export const BuyerTable: FC<BuyerTableProps> = ({
  rows,
  sorting,
  onSortingChange,
  onRequestPayment,
  onViewBuyer,
  trustAccountId
}) => {
  const {t, i18n} = useTranslation(['trustAccounts', 'common']);

  const columns = useMemo(
    () => [
      nodeColumn<BuyerTableRow>({
        id: 'fullName',
        header: t('view.buyers.list.columns.buyerName'),
        maxWidth: 200,
        accessorFn: row => formatBuyerDisplayName(row.buyers[0].fullName),
        cell: row => {
          const displayName = formatBuyerDisplayName(row.buyers[0].fullName);
          return (
            <div className="flex flex-row items-center gap-3">
              <BuyerAvatarStack
                buyers={row.buyers}
                unitLabel={formatUnitLabel(row.purchase.unit, t)}
                onViewBuyer={onViewBuyer}
              />
              {row.buyers.length === 1 && (
                <Typography size="sm" weight="medium">
                  {displayName}
                </Typography>
              )}
            </div>
          );
        }
      }),
      nodeColumn<BuyerTableRow>({
        id: 'unit',
        header: t('view.buyers.list.columns.unit'),
        accessorFn: row => `${row.purchase.unit.buildingNumber} ${row.purchase.unit.unitNumber}`,
        cell: row => <Typography size="sm">{formatUnitLabel(row.purchase.unit, t)}</Typography>
      }),
      nodeColumn<BuyerTableRow>({
        id: 'createdAt',
        header: t('view.buyers.list.columns.createdAt'),

        accessorFn: row => String(row.buyers[0].createdAt),
        cell: row => (
          <Typography size="sm" color="secondary" className="tabular-nums">
            {formatDateLocalized(row.buyers[0].createdAt, i18n.language)}
          </Typography>
        )
      }),
      nodeColumn<BuyerTableRow>({
        id: 'purchasePrice',
        header: t('view.buyers.list.columns.purchasePrice'),

        accessorFn: row => row.purchase.purchasePriceNis,
        cell: row => (
          <Typography size="sm" color="tertiary">
            {formatNIS(row.purchase.purchasePriceNis)}
          </Typography>
        )
      }),
      nodeColumn<BuyerTableRow>({
        id: 'amountToPay',
        header: t('view.buyers.list.columns.amountToPay'),

        accessorFn: row => row.amountToPayNis,
        cell: row => (
          <Typography size="sm" color="tertiary">
            {formatNIS(row.amountToPayNis)}
          </Typography>
        )
      }),
      nodeColumn<BuyerTableRow>({
        id: 'depositPaid',
        header: t('view.buyers.list.columns.depositPaid'),

        accessorFn: row => row.depositPaidNis,
        cell: row => (
          <Typography size="sm" color="tertiary">
            {formatNIS(row.depositPaidNis)}
          </Typography>
        )
      }),
      nodeColumn<BuyerTableRow>({
        id: 'paymentStatus',
        header: t('view.buyers.list.columns.paymentStatus'),

        accessorFn: row => row.paymentStatus,
        cell: row => <BuyerPaymentStatusBadge status={row.paymentStatus} />
      }),
      nodeColumn<BuyerTableRow>({
        id: 'regulatoryReports',
        header: t('view.buyers.list.columns.regulatoryReports'),
        enableSorting: false,
        cell: row => (
          <BuyerRegulatoryReportsBadge purchase={row.purchase} trustAccountId={trustAccountId} />
        )
      }),
      nodeColumn<BuyerTableRow>({
        id: 'actions',
        header: '',
        width: 'min',
        enableSorting: false,
        cell: row => (
          <TableActionsCell>
            <BuyerActionButton
              paymentStatus={row.paymentStatus}
              onRequestPayment={() => onRequestPayment(row.buyers[0])}
              onViewBuyer={() => onViewBuyer(row.buyers[0])}
            />
            <div className="flex size-9 shrink-0 items-center justify-center">
              <BuyerMoreMenu actions={['view']} onView={() => onViewBuyer(row.buyers[0])} />
            </div>
          </TableActionsCell>
        )
      })
    ],
    [i18n.language, onRequestPayment, onViewBuyer, t, trustAccountId]
  );

  return (
    <Table
      columns={columns}
      data={rows}
      sorting={sorting}
      onSortingChange={onSortingChange}
      onRowClick={row => onViewBuyer(row.buyers[0])}
      manualSorting
      emptyStateText={t('common:noResults')}
    />
  );
};
