import {TransactionStatus} from '@sollapay/enums';
import {Badge, Icon} from '@sollapay/ui';
import {useTranslation} from 'react-i18next';

import type {IconName} from '@sollapay/ui';
import type {FC} from 'react';

interface TransactionStatusBadgeProps {
  status: TransactionStatus;
}

const STATUS_CONFIG: Record<
  TransactionStatus,
  {variant: 'success' | 'warning'; icon: IconName; labelKey: string}
> = {
  [TransactionStatus.APPLIED]: {
    variant: 'success',
    icon: 'check-circle-dashed',
    labelKey: 'view.transactions.status.applied'
  },
  [TransactionStatus.INFLIGHT]: {
    variant: 'warning',
    icon: 'clock',
    labelKey: 'view.transactions.status.inflight'
  }
};

export const TransactionStatusBadge: FC<TransactionStatusBadgeProps> = ({status}) => {
  const {t} = useTranslation('trustAccounts');
  const {variant, icon, labelKey} = STATUS_CONFIG[status];

  return (
    <Badge variant={variant} size="md">
      <Icon name={icon} className="size-3 shrink-0" />
      {t(labelKey)}
    </Badge>
  );
};
