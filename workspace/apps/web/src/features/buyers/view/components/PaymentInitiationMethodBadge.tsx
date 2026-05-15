import {cn} from '@sollapay/ui';
import {Icon} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {INITIATION_METHOD_CONFIG} from '../../config';

import type {InitiationMethod} from '@sollapay/enums';
import type {FC} from 'react';

export interface PaymentInitiationMethodBadgeProps {
  method: InitiationMethod;
  className?: string;
}

export const PaymentInitiationMethodBadge: FC<PaymentInitiationMethodBadgeProps> = ({
  method,
  className
}) => {
  const {t} = useTranslation('trustAccounts');
  const config = INITIATION_METHOD_CONFIG[method];

  return (
    <span
      data-slot="payment-initiation-method-badge"
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border border-border bg-background-surface px-2 py-1 text-sm font-medium leading-5 text-fg-secondary shadow-xs',
        className
      )}
    >
      <Icon name={config.icon} className="size-3 shrink-0 text-[#2E90FA]" />
      <span data-slot="label" className="whitespace-nowrap">
        {t(config.labelKey)}
      </span>
    </span>
  );
};
