import {useTranslation} from 'react-i18next';

import {ActivityFeedRowLayout} from '../ActivityFeedRowLayout';
import {ActivityAmountBadge} from './ActivityAmountBadge';
import {castMetadata} from './metadata.utils';

import type {BuyerWithdrawalMetadata, TrustAccountActivityDTO} from '@sollapay/types';

interface BuyerWithdrawalRowProps {
  activity: TrustAccountActivityDTO;
}

export function BuyerWithdrawalRow({activity}: BuyerWithdrawalRowProps) {
  const {t} = useTranslation('trustAccounts');
  const meta = castMetadata<BuyerWithdrawalMetadata>(activity);

  return (
    <ActivityFeedRowLayout
      icon="sollapay:payout"
      title={t('view.activity.activityType.buyer_withdrawal')}
      subtitle={meta?.referenceCode ?? null}
      actorName={meta?.beneficiaryName ?? null}
      createdAt={activity.createdAt}
      action={
        meta?.amountNis ? (
          <ActivityAmountBadge amountNis={meta.amountNis} variant="debit" />
        ) : undefined
      }
    />
  );
}
