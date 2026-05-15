import {Button} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import type {FC} from 'react';

interface ActivationETABannerProps {
  className?: string;
}

export const ActivationETABanner: FC<ActivationETABannerProps> = ({className = ''}) => {
  const {t} = useTranslation('trustAccounts');

  return (
    <Button
      variant="secondary"
      size="sm"
      className={`shrink-0 cursor-default pointer-events-none hover:bg-transparent active:bg-transparent ${className}`}
    >
      {t('activation.eta')}
    </Button>
  );
};
