import {Icon, Typography} from '@sollapay/ui';
import {formatDateTimeLocalized} from '@sollapay/utils';
import {useTranslation} from 'react-i18next';

import type {IconName} from '@sollapay/ui';
import type {ReactNode} from 'react';

export interface ActivityFeedRowLayoutProps {
  icon: IconName;
  title: string;
  subtitle?: string | null;
  actorName?: string | null;
  createdAt: string;
  action?: ReactNode;
}

export function ActivityFeedRowLayout({
  icon,
  title,
  subtitle,
  actorName,
  createdAt,
  action
}: ActivityFeedRowLayoutProps) {
  const {i18n} = useTranslation();

  return (
    <div data-slot="activity-feed-row" className="flex h-18 w-full items-center">
      {/* RowSpecificInfo — 40% */}
      <div className="flex w-2/5 items-center gap-3 overflow-hidden px-6">
        <Icon name={icon} className="size-8 shrink-0" />
        <div className="flex min-w-0 flex-col items-start">
          <Typography size="sm" weight="medium">
            {title}
          </Typography>
          {(subtitle ?? actorName) && (
            <div className="flex items-center gap-1">
              {actorName && (
                <Typography size="xs" color="tertiary">
                  {actorName}
                </Typography>
              )}
              {subtitle && actorName && (
                <span className="size-0.5 rounded-full bg-fg-tertiary inline-block" />
              )}
              {subtitle && (
                <Typography size="xs" color="tertiary">
                  {subtitle}
                </Typography>
              )}
            </div>
          )}
        </div>
      </div>

      {/* DateAndTime — 20% */}
      <div className="flex w-1/5 items-center px-6">
        <Typography size="sm" color="tertiary" className="whitespace-nowrap">
          {formatDateTimeLocalized(createdAt, i18n.language)}
        </Typography>
      </div>

      {/* RowSpecificDataOrAction — 40% */}
      <div className="flex w-2/5 items-center justify-end px-6">{action}</div>
    </div>
  );
}
