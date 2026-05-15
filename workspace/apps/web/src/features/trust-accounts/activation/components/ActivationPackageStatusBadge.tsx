import {Typography} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import type {FC} from 'react';

interface ActivationPackageStatusBadgeProps {
  statusLabelKey: string | null;
  className?: string;
}

export const ActivationPackageStatusBadge: FC<ActivationPackageStatusBadgeProps> = ({
  statusLabelKey,
  className = ''
}) => {
  const {t} = useTranslation('trustAccounts');

  if (!statusLabelKey) return null;

  return (
    <Typography
      as="p"
      size="sm"
      weight="medium"
      color="default"
      className={`text-start ${className}`}
    >
      {t(statusLabelKey)}
    </Typography>
  );
};
