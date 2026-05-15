import {useQuery} from '@tanstack/react-query';

import {useApiClient} from '@/hooks';
import {pollingInterval} from '@/lib/query';

import {trustAccountLedgerApi} from '../api';
import {trustAccountKeys} from './useTrustAccounts';

export function useTrustAccountBalancesQuery() {
  const client = useApiClient();

  return useQuery({
    queryKey: trustAccountKeys.balances(),
    queryFn: () => trustAccountLedgerApi.fetchBalances(client),
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchInterval: pollingInterval.slow
  });
}

export function useTrustAccountBalanceQuery(id: string) {
  const client = useApiClient();

  return useQuery({
    queryKey: trustAccountKeys.balance(id),
    queryFn: () => trustAccountLedgerApi.fetchBalance(client, id),
    enabled: !!id,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchInterval: pollingInterval.medium
  });
}

export function useTrustAccountTransactionsQuery(id: string) {
  const client = useApiClient();

  return useQuery({
    queryKey: trustAccountKeys.transactions(id),
    queryFn: () => trustAccountLedgerApi.fetchTransactions(client, id),
    enabled: !!id,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchInterval: pollingInterval.medium
  });
}
