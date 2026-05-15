import {PaymentInstructionStatus} from '@sollapay/enums';
import {MetricsCard} from '@sollapay/ui/components';
import {formatNIS, parseMoney} from '@sollapay/utils';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {isNonTerminalInstruction} from '../../utils';

import type {BuyerPurchaseWithDocumentsDTO, PaymentInstructionDTO} from '@sollapay/types';
import type {MetricColumnConfig} from '@sollapay/ui/components';
import type {FC} from 'react';

export interface BuyerMetricsCardProps {
  purchase: BuyerPurchaseWithDocumentsDTO;
  /** Pre-filtered instructions for this purchase only */
  instructions: PaymentInstructionDTO[];
  maxPercentage?: number;
}

export const BuyerMetricsCard: FC<BuyerMetricsCardProps> = ({
  purchase,
  instructions,
  maxPercentage = 7
}) => {
  const {t} = useTranslation('trustAccounts');

  const columns = useMemo<MetricColumnConfig[]>(() => {
    const purchasePrice = parseMoney(purchase.purchasePriceNis);
    const maxCollectable = purchasePrice.percentOf(maxPercentage);
    const maxCollectableNum = maxCollectable.toNumber();

    const sentAmount = instructions
      .filter(isNonTerminalInstruction)
      .reduce((sum, i) => sum.add(parseMoney(i.amountNis)), parseMoney('0'));

    const completedAmount = instructions
      .filter(
        i =>
          i.status === PaymentInstructionStatus.COMPLETED ||
          i.status === PaymentInstructionStatus.PARTIALLY_MATCHED
      )
      .reduce((sum, i) => sum.add(parseMoney(i.allocatedAmountNis)), parseMoney('0'));

    const sentProgress =
      maxCollectableNum > 0 ? (sentAmount.toNumber() / maxCollectableNum) * 100 : 0;
    const completedProgress =
      maxCollectableNum > 0 ? (completedAmount.toNumber() / maxCollectableNum) * 100 : 0;
    const remaining = maxCollectable.subtract(sentAmount);
    const remainingTooltip =
      remaining.toNumber() > 0
        ? t('view.buyers.detail.metrics.remaining', {amount: formatNIS(remaining)})
        : undefined;

    return [
      {
        label: t('view.buyers.detail.metrics.purchasePrice'),
        value: formatNIS(purchasePrice)
      },
      {
        label: t('view.buyers.detail.metrics.maxCollection'),
        sublabel: `${maxPercentage}%`,
        value: formatNIS(maxCollectable)
      },
      {
        label: t('view.buyers.detail.metrics.paymentRequestsSent'),
        value: formatNIS(sentAmount),
        progress: {value: sentProgress, color: 'dynamic', tooltipText: remainingTooltip}
      },
      {
        label: t('view.buyers.detail.metrics.completedPayments'),
        value: formatNIS(completedAmount),
        progress: {value: completedProgress, color: 'dynamic'}
      }
    ];
  }, [purchase.purchasePriceNis, instructions, maxPercentage, t]);

  return <MetricsCard columns={columns} />;
};
