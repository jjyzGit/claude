import {Badge, CodeBadge, Icon, Table, Typography, nodeColumn} from '@sollapay/ui/components';
import {formatDateLocalized, formatNIS} from '@sollapay/utils';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {CopyButton} from '@/components';

import {PaymentInitiationMethodBadge} from './PaymentInitiationMethodBadge';
import {PAYMENT_INSTRUCTION_STATUS_CONFIG} from '../../config/buyers.config';

import type {PaymentInstructionDTO} from '@sollapay/types';
import type {FC, ReactNode} from 'react';

export interface BuyerPaymentHistoryTableProps {
  instructions: PaymentInstructionDTO[];
  emptyState?: ReactNode;
}

export const BuyerPaymentHistoryTable: FC<BuyerPaymentHistoryTableProps> = ({
  instructions,
  emptyState
}) => {
  const {t, i18n} = useTranslation(['trustAccounts', 'common']);

  const columns = useMemo(
    () => [
      nodeColumn<PaymentInstructionDTO>({
        id: 'date',
        header: t('trustAccounts:view.buyers.detail.columns.date'),
        width: 'min',
        maxWidth: 140,
        accessorFn: row => row.createdAt,
        cell: row => (
          <div className="flex flex-col">
            <Typography size="sm" weight="medium" className="tabular-nums">
              {formatDateLocalized(row.createdAt, i18n.language)}
            </Typography>
            <Typography size="xs" color="tertiary" className="tabular-nums">
              {new Date(row.createdAt).toLocaleTimeString(i18n.language, {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Typography>
          </div>
        )
      }),
      nodeColumn<PaymentInstructionDTO>({
        id: 'paymentMethod',
        header: t('trustAccounts:view.buyers.detail.columns.paymentMethod'),
        width: 'min',
        maxWidth: 180,
        accessorFn: row => row.initiationMethod,
        cell: row => <PaymentInitiationMethodBadge method={row.initiationMethod} />
      }),
      nodeColumn<PaymentInstructionDTO>({
        id: 'amount',
        header: t('trustAccounts:view.buyers.detail.columns.amount'),
        width: 'min',
        maxWidth: 140,
        accessorFn: row => row.amountNis,
        cell: row => (
          <Typography size="sm" color="tertiary" className="tabular-nums">
            {formatNIS(row.amountNis)}
          </Typography>
        )
      }),
      nodeColumn<PaymentInstructionDTO>({
        id: 'percent',
        header: t('trustAccounts:view.buyers.detail.columns.percent'),
        width: 'min',
        maxWidth: 100,
        accessorFn: row => row.percent ?? '',
        cell: row => (
          <Typography size="sm" color="tertiary">
            {row.percent ? `${row.percent}%` : '—'}
          </Typography>
        )
      }),
      nodeColumn<PaymentInstructionDTO>({
        id: 'reference',
        header: t('trustAccounts:view.buyers.detail.columns.reference'),
        width: 'min',
        maxWidth: 160,
        accessorFn: row => row.referenceCode,
        cell: row => (
          <div className="flex items-center">
            <CodeBadge code={row.referenceCode} />
            <CopyButton
              text={row.referenceCode}
              fieldName={t('common:fieldLabels.referenceCode')}
            />
          </div>
        )
      }),
      nodeColumn<PaymentInstructionDTO>({
        id: 'status',
        header: t('trustAccounts:view.buyers.detail.columns.status'),
        width: 'min',
        maxWidth: 180,
        accessorFn: row => row.status,
        cell: row => {
          const {variant, icon} = PAYMENT_INSTRUCTION_STATUS_CONFIG[row.status];
          return (
            <Badge variant={variant} size="sm">
              <Icon name={icon} className="size-3" />
              {t(`trustAccounts:view.buyers.detail.instructionStatus.${row.status}`)}
            </Badge>
          );
        }
      })
    ],
    [i18n.language, t]
  );

  const sorted = useMemo(
    () =>
      [...instructions].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [instructions]
  );

  return <Table columns={columns} data={sorted} emptyState={emptyState} />;
};
