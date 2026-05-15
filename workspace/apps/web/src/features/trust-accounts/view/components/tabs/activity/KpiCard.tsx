import {cn, IconBox, Typography} from '@sollapay/ui';

import type {IconName} from '@sollapay/ui';

export interface KpiCardProps {
  icon: IconName;
  label: string;
  value: string;
  change: string | null;
  changeLabel: string;
  direction?: 'increase' | 'decrease';
  noChangeLabel?: string;
  isPositive?: boolean;
}

export function KpiCard({
  icon,
  label,
  value,
  change,
  changeLabel,
  direction,
  noChangeLabel,
  isPositive
}: KpiCardProps) {
  const isNegative = direction === 'decrease';
  const isChangePositive = direction === 'increase' || (isPositive === true && change !== null);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border-subtle bg-background-surface p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex flex-col gap-3 flex-1 min-w-0 items-start">
          <Typography size="sm" weight="medium" color="tertiary" className="w-full">
            {label}
          </Typography>
          <div className="flex flex-col gap-2 items-start w-full">
            <Typography weight="semibold" className="text-2xl">
              {value}
            </Typography>
            {change !== null ? (
              <div className="flex items-center gap-1">
                <Typography
                  dir="ltr"
                  size="xs"
                  weight="medium"
                  className={cn(
                    isChangePositive
                      ? 'text-fg-credit'
                      : isNegative
                        ? 'text-destructive'
                        : 'text-fg-tertiary'
                  )}
                >
                  {change}
                </Typography>
                <Typography size="xs" color="tertiary">
                  {changeLabel}
                </Typography>
              </div>
            ) : noChangeLabel ? (
              <Typography size="xs" color="tertiary">
                {noChangeLabel}
              </Typography>
            ) : null}
          </div>
        </div>
        <IconBox icon={icon} shadow iconColor="secondary" />
      </div>
    </div>
  );
}
