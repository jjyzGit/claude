import {Button, Icon} from '@sollapay/ui/components';
import {cn} from '@sollapay/ui/lib';
import {useTranslation} from 'react-i18next';

import type {BuyerPaymentStatus} from '../types/buyers.types';
import type {FC} from 'react';

export interface BuyerActionButtonProps {
  paymentStatus: BuyerPaymentStatus;
  onRequestPayment: () => void;
  onViewBuyer: () => void;
  className?: string;
}

export const BuyerActionButton: FC<BuyerActionButtonProps> = ({
  paymentStatus,
  onRequestPayment,
  onViewBuyer,
  className
}) => {
  const {t} = useTranslation('trustAccounts');

  if (paymentStatus === 'no_request') {
    return (
      <Button
        variant="primary"
        size="sm"
        className={cn('w-32', className)}
        onClick={onRequestPayment}
        icon={<Icon name="send" className="-scale-x-100" />}
        iconPosition="end"
      >
        {t('view.buyers.list.actions.requestPayment')}
      </Button>
    );
  }

  return (
    <Button variant="secondary" size="sm" className={cn('w-32', className)} onClick={onViewBuyer}>
      {t('view.buyers.list.actions.viewBuyer')}
      <Icon name="chevron-left" />
    </Button>
  );
};
