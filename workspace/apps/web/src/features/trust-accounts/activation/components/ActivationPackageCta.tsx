import {Button, Icon} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {useDirection} from '@/lib/i18n/hooks';

import type {FC} from 'react';

type Action = 'start' | 'edit' | 'view';

interface ActivationPackageCtaProps {
  action: Action | null;
  onClick: () => void;
  className?: string;
}

const ACTION_LABELS: Record<Action, string> = {
  start: 'activation.action.start',
  edit: 'activation.action.edit',
  view: 'activation.action.view'
};

export const ActivationPackageCta: FC<ActivationPackageCtaProps> = ({
  action,
  onClick,
  className = ''
}) => {
  const {t} = useTranslation('trustAccounts');
  const direction = useDirection();

  if (!action) return null;

  const isRtl = direction === 'rtl';
  const iconName =
    action === 'edit' ? 'pen' : action === 'view' ? 'view' : isRtl ? 'arrow-left' : 'arrow-right';

  return (
    <Button
      variant="tertiary"
      size="xs"
      onClick={onClick}
      className={`h-auto p-0 text-xs font-normal text-fg-secondary hover:bg-transparent hover:text-fg disabled:opacity-50 ${className}`}
    >
      <Icon name={iconName} className="size-2.5" />
      <span>{t(ACTION_LABELS[action])}</span>
    </Button>
  );
};
