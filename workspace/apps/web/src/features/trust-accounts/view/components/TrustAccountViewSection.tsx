import {Typography} from '@sollapay/ui';

import type {FC, ReactNode} from 'react';

interface TrustAccountViewSectionProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}

export const TrustAccountViewSection: FC<TrustAccountViewSectionProps> = ({
  title,
  subtitle,
  action,
  children
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <div className="flex flex-1 flex-col gap-0.5 text-start">
          <Typography as="h2" size="md" weight="semibold">
            {title}
          </Typography>
          {subtitle && (
            <Typography as="p" size="sm" color="tertiary">
              {subtitle}
            </Typography>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
};

export type {TrustAccountViewSectionProps};
