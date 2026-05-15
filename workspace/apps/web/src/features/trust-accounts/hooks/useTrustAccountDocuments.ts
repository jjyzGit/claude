import {useQuery} from '@tanstack/react-query';

import {useApiClient} from '@/hooks';

import {trustAccountDocumentsApi} from '../api';
import {trustAccountKeys} from './useTrustAccounts';

/**
 * Hook to fetch all documents for a trust account, grouped by context
 */
export function useTrustAccountDocumentsQuery(id: string) {
  const client = useApiClient();

  return useQuery({
    queryKey: trustAccountKeys.documents(id),
    queryFn: () => trustAccountDocumentsApi.fetchDocuments(client, id),
    enabled: !!id,
    select: response => response.data
  });
}
