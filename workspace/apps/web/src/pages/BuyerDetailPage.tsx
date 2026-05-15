import {useParams} from 'react-router-dom';

import {useBuyerQuery, usePaymentsQuery} from '@/features/buyers/hooks';
import {BuyerView} from '@/features/buyers/view/components';
import {BuyerViewSkeleton} from '@/features/buyers/view/components/BuyerView.skeleton';
import {useTrustAccountQuery} from '@/features/trust-accounts/hooks';
import {PageLayout} from '@/layouts';

import type {FC} from 'react';

export const BuyerDetailPage: FC = () => {
  const {id, buyerId} = useParams<{id: string; buyerId: string}>();

  const {
    data: buyer,
    isLoading: isBuyerLoading,
    isError: isBuyerError,
    refetch
  } = useBuyerQuery(id ?? '', buyerId ?? '');

  const {data: payments, isError: isPaymentsError} = usePaymentsQuery(id ?? '');
  const {data: accountData} = useTrustAccountQuery(id ?? '');

  if (isBuyerLoading) {
    return <BuyerViewSkeleton />;
  }

  if (isBuyerError || !buyer) {
    return <PageLayout error refetch={() => void refetch()} />;
  }

  return (
    <BuyerView
      buyer={buyer}
      trustAccountId={id ?? ''}
      trustAccountName={accountData?.trustAccount.name ?? ''}
      payments={isPaymentsError ? [] : (payments ?? [])}
      paymentsError={isPaymentsError}
    />
  );
};
