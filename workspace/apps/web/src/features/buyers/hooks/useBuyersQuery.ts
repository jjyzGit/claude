import {useQuery} from '@tanstack/react-query';

import {useApiClient} from '@/hooks';

import {buyersApi} from '../api';

export const buyerKeys = {
  all: (trustAccountId: string) => ['trust-accounts', trustAccountId, 'buyers'] as const,
  lists: (trustAccountId: string) => [...buyerKeys.all(trustAccountId), 'list'] as const,
  details: (trustAccountId: string) => [...buyerKeys.all(trustAccountId), 'detail'] as const,
  detail: (trustAccountId: string, buyerId: string) =>
    [...buyerKeys.details(trustAccountId), buyerId] as const
};

export function useBuyersQuery(trustAccountId: string) {
  const client = useApiClient();

  return useQuery({
    queryKey: buyerKeys.lists(trustAccountId),
    queryFn: () => buyersApi.fetchBuyers(client, trustAccountId),
    enabled: !!trustAccountId,
    // Always refetch on mount so the list reflects recent additions/changes
    // (buyers are mutated frequently and must stay in sync with the server)
    refetchOnMount: 'always',
    select: response => response.data
  });
}
