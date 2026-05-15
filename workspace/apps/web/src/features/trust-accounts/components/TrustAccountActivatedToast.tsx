import {toast} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {ToastCard} from '@/components';

import type {FC} from 'react';

export type TrustAccountActivatedToastProps = {
  toastId: string | number;
  trustName: string;
  onNavigate: () => void;
};

export const TrustAccountActivatedToast: FC<TrustAccountActivatedToastProps> = ({
  toastId,
  trustName,
  onNavigate
}) => {
  const {t} = useTranslation('trustAccounts');

  return (
    <ToastCard
      iconName="shield"
      variant="success"
      title={t('activation.activatedToast.title', {name: trustName})}
      description={t('activation.activatedToast.description')}
      onNavigate={onNavigate}
      onClose={() => toast.dismiss(toastId)}
      closeLabel={t('activation.activatedToast.close')}
    />
  );
};

export function showTrustAccountActivatedToast(trustName: string, onNavigate: () => void): void {
  toast.custom(
    id => <TrustAccountActivatedToast toastId={id} trustName={trustName} onNavigate={onNavigate} />,
    {
      duration: Infinity,
      position: 'bottom-center'
    }
  );
}
