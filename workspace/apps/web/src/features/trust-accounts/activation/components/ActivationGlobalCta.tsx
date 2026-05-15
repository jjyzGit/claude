import {Button, Icon, Spinner} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {useDirection} from '@/lib/i18n/hooks';

import type {FC} from 'react';

interface ActivationGlobalCtaProps {
  isVisible: boolean;
  onClick?: () => void;
  isReadyToSubmit: boolean;
  hasProgress?: boolean;
  isLoading?: boolean;
  isTrustActive?: boolean;
}

export const ActivationGlobalCta: FC<ActivationGlobalCtaProps> = ({
  isVisible,
  onClick,
  isReadyToSubmit,
  hasProgress = false,
  isLoading = false,
  isTrustActive = false
}) => {
  const {t} = useTranslation(['trustAccounts', 'common']);
  const direction = useDirection();

  if (!isVisible) return null;

  const arrowIcon = <Icon name={direction === 'rtl' ? 'arrow-left' : 'arrow-right'} />;

  return (
    <div
      className="absolute inset-x-0 bottom-0 border-t border-border-subtle bg-background-secondary px-6 py-6 flex justify-end"
      data-slot="activation-global-cta"
    >
      {isTrustActive ? (
        <Button variant="primary" onClick={onClick}>
          {t('activation.action.openTrustAccount')}
          {arrowIcon}
        </Button>
      ) : (
        <Button variant="primary" onClick={onClick} disabled={isLoading}>
          {isLoading ? <Spinner className="size-4" aria-label={t('common:loading')} /> : null}
          {isReadyToSubmit
            ? t('activation.action.submitTrustAccount')
            : hasProgress
              ? t('activation.action.continueTrustAccount')
              : t('activation.action.startTrustAccount')}
          {isReadyToSubmit && !isLoading && arrowIcon}
        </Button>
      )}
    </div>
  );
};
