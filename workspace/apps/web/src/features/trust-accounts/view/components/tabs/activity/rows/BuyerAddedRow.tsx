import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import {BuyerPaymentButton} from '@/features/buyers/components';
import {usePaymentsQuery} from '@/features/buyers/hooks';
import {deriveBuyerPaymentStatus, formatUnitLabel} from '@/features/buyers/utils';

import {ActivityFeedRowLayout} from '../ActivityFeedRowLayout';
import {castMetadata} from './metadata.utils';

import type {BuyerAddedMetadata, TrustAccountActivityDTO} from '@sollapay/types';

interface BuyerAddedRowProps {
  activity: TrustAccountActivityDTO;
}

export function BuyerAddedRow({activity}: BuyerAddedRowProps) {
  const {t} = useTranslation('trustAccounts');
  const navigate = useNavigate();

  const meta = castMetadata<BuyerAddedMetadata>(activity);
  const partyId = activity.entityId;

  const {data: instructions} = usePaymentsQuery(activity.trustAccountId);

  const purchaseId = meta?.purchaseId;
  const purchaseInstructions = purchaseId
    ? (instructions ?? []).filter(i => i.trustBuyerPurchaseId === purchaseId)
    : [];
  const paymentStatus = purchaseId ? deriveBuyerPaymentStatus(purchaseInstructions) : 'no_request';

  const buyerPath = partyId
    ? `/trust-accounts/${activity.trustAccountId}/buyers/${partyId}`
    : undefined;

  return (
    <ActivityFeedRowLayout
      icon="sollapay:buyer"
      title={t('view.activity.activityType.buyer_added')}
      subtitle={meta?.unit ? formatUnitLabel(meta.unit, t) : null}
      actorName={meta?.buyerName ?? null}
      createdAt={activity.createdAt}
      action={
        partyId ? (
          <BuyerPaymentButton
            trustAccountId={activity.trustAccountId}
            partyId={partyId}
            paymentStatus={paymentStatus}
            onViewBuyer={() => buyerPath && navigate(buyerPath)}
          />
        ) : undefined
      }
    />
  );
}
