import {toast} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {ToastCard} from '@/components';

import type {FC} from 'react';

export type PaymentReceivedToastProps = {
  toastId: string | number;
  trustName: string;
  name: string;
  amount: string;
  dateTime: string;
  onNavigate: () => void;
};

export const PaymentReceivedToast: FC<PaymentReceivedToastProps> = ({
  toastId,
  trustName,
  name,
  amount,
  dateTime,
  onNavigate
}) => {
  const {t} = useTranslation('payments');

  return (
    <ToastCard
      iconName="coins-hand"
      variant="success"
      title={t('receivedToast.title', {trustName})}
      description={t('receivedToast.description', {name, amount, dateTime})}
      onNavigate={onNavigate}
      onClose={() => toast.dismiss(toastId)}
      closeLabel={t('receivedToast.close')}
    />
  );
};

export function showPaymentReceivedToast(
  trustName: string,
  name: string,
  amount: string,
  dateTime: string,
  onNavigate: () => void
): void {
  toast.custom(
    id => (
      <PaymentReceivedToast
        toastId={id}
        trustName={trustName}
        name={name}
        amount={amount}
        dateTime={dateTime}
        onNavigate={onNavigate}
      />
    ),
    {
      duration: Infinity,
      position: 'bottom-center'
    }
  );
}
