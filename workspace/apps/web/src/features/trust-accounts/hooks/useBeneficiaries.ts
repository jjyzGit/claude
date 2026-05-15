import {useQuery} from '@tanstack/react-query';

import {useApiClient} from '@/hooks';

import {beneficiariesApi} from '../api';

export const beneficiaryKeys = {
  all: (trustAccountId: string) => ['trust-accounts', trustAccountId, 'beneficiaries'] as const,
  lists: (trustAccountId: string) => [...beneficiaryKeys.all(trustAccountId), 'list'] as const
};

export function useBeneficiariesQuery(trustAccountId: string) {
  const client = useApiClient();

  return useQuery({
    queryKey: beneficiaryKeys.lists(trustAccountId),
    queryFn: () => beneficiariesApi.fetchBeneficiaries(client, trustAccountId),
    enabled: !!trustAccountId,
    refetchOnMount: 'always',
    select: response => response.data
  });
}
