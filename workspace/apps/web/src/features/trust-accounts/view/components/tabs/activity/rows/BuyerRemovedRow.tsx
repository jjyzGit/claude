import {useTranslation} from 'react-i18next';

import {formatUnitLabel} from '@/features/buyers/utils';

import {ActivityFeedRowLayout} from '../ActivityFeedRowLayout';
import {castMetadata} from './metadata.utils';

import type {BuyerRemovedMetadata, TrustAccountActivityDTO} from '@sollapay/types';

interface BuyerRemovedRowProps {
  activity: TrustAccountActivityDTO;
}

export function BuyerRemovedRow({activity}: BuyerRemovedRowProps) {
  const {t} = useTranslation('trustAccounts');
  const meta = castMetadata<BuyerRemovedMetadata>(activity);

  return (
    <ActivityFeedRowLayout
      icon="sollapay:buyer"
      title={t('view.activity.activityType.buyer_removed')}
      subtitle={meta?.unit ? formatUnitLabel(meta.unit, t) : null}
      actorName={meta?.buyerName ?? null}
      createdAt={activity.createdAt}
    />
  );
}
