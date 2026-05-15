import {Badge, Typography} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {TRUST_STATUS_CONFIG} from '../config';

import type {TrustStatus} from '@sollapay/enums';
import type {FC} from 'react';

export interface TrustAccountBadgeProps {
  status: TrustStatus;
  /**
   * How to lay out the optional subtitle relative to the badge.
   * - 'stacked' (default): subtitle rendered below the badge
   * - 'inline': badge and subtitle on the same row (RTL: badge right, subtitle left)
   */
  subtitleLayout?: 'stacked' | 'inline';
  /** Whether to render the subtitle at all. Defaults to true. */
  showSubtitle?: boolean;
}

export const TrustAccountBadge: FC<TrustAccountBadgeProps> = ({
  status,
  subtitleLayout = 'stacked',
  showSubtitle = true
}) => {
  const {t} = useTranslation('trustAccounts');
  const config = TRUST_STATUS_CONFIG[status];
  const subtitle = showSubtitle && config.subtitleKey ? t(config.subtitleKey) : null;

  const badge = (
    <Badge variant={config.variant} size="sm" dot={config.dot}>
      {t(config.labelKey)}
    </Badge>
  );

  if (!subtitle) return badge;

  if (subtitleLayout === 'inline') {
    return (
      <div className="flex items-center gap-2">
        {badge}
        <Typography as="p" size="xs" className="font-secondary text-text-success">
          {subtitle}
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-0.5">
      {badge}
      <Typography as="p" size="xs" className="font-secondary text-text-success">
        {subtitle}
      </Typography>
    </div>
  );
};
