import {TrustStatus} from '@sollapay/enums';
import {Icon, Typography, cn} from '@sollapay/ui';
import {Money} from '@sollapay/utils';
import {useTranslation} from 'react-i18next';

const SIZE_CONFIG = {
  sm: {
    container: 'w-fit gap-2 px-2 py-1',
    icon: 'size-4',
    amount: 'text-base leading-6 font-semibold'
  },
  md: {
    container: 'w-full gap-2 p-1',
    icon: 'size-5',
    amount: 'text-xl leading-[30px] font-semibold'
  },
  lg: {
    container: 'w-fit h-12 gap-3 p-2',
    icon: 'size-5',
    amount: 'text-2xl leading-8 font-semibold'
  }
} as const;

export type TrustAccountBalanceChipSize = keyof typeof SIZE_CONFIG;

export interface TrustAccountBalanceChipProps {
  status: TrustStatus;
  balance?: string | null;
  size?: TrustAccountBalanceChipSize;
  className?: string;
}

export function TrustAccountBalanceChip({
  status,
  balance,
  size = 'lg',
  className
}: TrustAccountBalanceChipProps) {
  const {t} = useTranslation('trustAccounts');
  const config = SIZE_CONFIG[size];

  if (status !== TrustStatus.TRUST_ACTIVE) {
    return (
      <div
        data-slot="trust-account-balance-chip"
        className={cn(
          'flex w-fit items-center gap-2 rounded-xl border-2 border-dashed border-border px-1.5 py-1',
          className
        )}
      >
        <Icon name="wallet" className={cn('shrink-0 text-fg-tertiary', config.icon)} />
        <Typography weight="medium" className="whitespace-nowrap text-base text-fg-quaternary">
          {t('balanceChip.inactive')}
        </Typography>
      </div>
    );
  }

  return (
    <div
      data-slot="trust-account-balance-chip"
      className={cn('flex items-center rounded-lg', config.container, className)}
    >
      <Icon name="wallet" className={cn('shrink-0 text-fg', config.icon)} />
      <div className="flex flex-1 items-end gap-1">
        <Typography
          as="span"
          weight="semibold"
          className={cn('tabular-nums text-fg', config.amount)}
        >
          {balance != null ? Money.from(balance).formatNIS({symbol: true}) : '—'}
        </Typography>
      </div>
    </div>
  );
}
