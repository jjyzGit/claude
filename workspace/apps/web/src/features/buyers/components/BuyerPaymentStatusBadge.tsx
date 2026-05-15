import {Badge, Icon} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {BUYER_PAYMENT_STATUS_CONFIG} from '../config/buyers.config';

import type {BuyerPaymentStatus} from '../types/buyers.types';
import type {FC} from 'react';

export interface BuyerPaymentStatusBadgeProps {
  status: BuyerPaymentStatus;
}

export const BuyerPaymentStatusBadge: FC<BuyerPaymentStatusBadgeProps> = ({status}) => {
  const {t} = useTranslation('trustAccounts');
  const config = BUYER_PAYMENT_STATUS_CONFIG[status];

  return (
    <Badge variant={config.variant} size="sm">
      <Icon name={config.icon} className="size-3" />
      {t(config.labelKey)}
    </Badge>
  );
};
