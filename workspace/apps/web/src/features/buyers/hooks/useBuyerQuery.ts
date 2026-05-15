import {useQuery} from '@tanstack/react-query';

import {useApiClient} from '@/hooks';

import {buyersApi} from '../api';
import {buyerKeys} from './useBuyersQuery';

export function useBuyerQuery(trustAccountId: string, buyerId: string) {
  const client = useApiClient();

  return useQuery({
    queryKey: buyerKeys.detail(trustAccountId, buyerId),
    queryFn: () => buyersApi.fetchBuyer(client, trustAccountId, buyerId),
    enabled: !!trustAccountId && !!buyerId,
    refetchOnWindowFocus: true,
    select: response => response.data
  });
}
