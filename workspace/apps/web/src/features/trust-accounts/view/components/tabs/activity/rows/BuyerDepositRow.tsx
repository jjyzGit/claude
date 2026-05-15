import {useTranslation} from 'react-i18next';

import {formatUnitLabel} from '@/features/buyers/utils';

import {ActivityFeedRowLayout} from '../ActivityFeedRowLayout';
import {ActivityAmountBadge} from './ActivityAmountBadge';
import {castMetadata} from './metadata.utils';

import type {BuyerDepositMetadata, TrustAccountActivityDTO} from '@sollapay/types';

interface BuyerDepositRowProps {
  activity: TrustAccountActivityDTO;
}

export function BuyerDepositRow({activity}: BuyerDepositRowProps) {
  const {t} = useTranslation('trustAccounts');
  const meta = castMetadata<BuyerDepositMetadata>(activity);

  return (
    <ActivityFeedRowLayout
      icon="sollapay:payin"
      title={t('view.activity.activityType.buyer_deposit')}
      actorName={meta?.buyerName ?? null}
      subtitle={meta?.unit ? formatUnitLabel(meta.unit, t) : null}
      createdAt={activity.createdAt}
      action={
        meta?.amountNis ? (
          <ActivityAmountBadge amountNis={meta.amountNis} variant="credit" />
        ) : undefined
      }
    />
  );
}
