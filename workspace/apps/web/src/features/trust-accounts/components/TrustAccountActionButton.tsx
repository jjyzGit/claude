import {TrustStatus} from '@sollapay/enums';
import {cn} from '@sollapay/ui';
import {Button} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

interface TrustAccountActionButtonProps {
  status: TrustStatus;
  onClick?: () => void;
  className?: string;
}

export function TrustAccountActionButton({
  status,
  onClick,
  className
}: TrustAccountActionButtonProps) {
  const {t} = useTranslation();
  const isActive = status === TrustStatus.TRUST_ACTIVE;
  const isInReview =
    status === TrustStatus.PENDING_VALIDATION ||
    status === TrustStatus.IN_REVIEW ||
    status === TrustStatus.ACTIVATION_PENDING;

  const labelKey = isActive
    ? 'trustAccounts.manageBuyers'
    : isInReview
      ? 'trustAccounts.viewProgress'
      : 'trustAccounts.continueSetup';

  return (
    <Button
      variant={isActive ? 'primary' : 'secondary'}
      size="sm"
      onClick={onClick}
      className={cn('w-32', className)}
    >
      {t(labelKey)}
    </Button>
  );
}

export type {TrustAccountActionButtonProps};
