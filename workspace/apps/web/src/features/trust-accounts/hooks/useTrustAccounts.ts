import {ActivationStatus, TrustStatus} from '@sollapay/enums';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {useApiClient} from '@/hooks';
import {pollingInterval} from '@/lib/query';

import {trustAccountsApi} from '../api';

import type {
  ApiResponse,
  TrustAccountCreatePayload,
  TrustAccountDTO,
  TrustAccountListItemDTO,
  TrustAccountUpdatePayload
} from '@sollapay/types';

const NON_TERMINAL_TRUST_STATUSES = new Set([
  TrustStatus.PENDING_VALIDATION,
  TrustStatus.IN_REVIEW
]);

function isTrustAccountAwaitingReview(item: {
  trustStatus: TrustStatus;
  activationStatus: ActivationStatus;
}): boolean {
  return (
    NON_TERMINAL_TRUST_STATUSES.has(item.trustStatus) ||
    item.activationStatus === ActivationStatus.SUBMITTED_FOR_REVIEW
  );
}

export const trustAccountKeys = {
  all: ['trust-accounts'] as const,
  lists: () => [...trustAccountKeys.all, 'list'] as const,
  list: (filters: {status?: string}) => [...trustAccountKeys.lists(), filters] as const,
  details: () => [...trustAccountKeys.all, 'detail'] as const,
  detail: (id: string) => [...trustAccountKeys.details(), id] as const,
  balances: () => [...trustAccountKeys.all, 'balances'] as const,
  balance: (id: string) => [...trustAccountKeys.all, 'balance', id] as const,
  transactions: (id: string) => [...trustAccountKeys.all, 'transactions', id] as const,
  documents: (id: string) => [...trustAccountKeys.all, 'documents', id] as const
};

export function useTrustAccountsQuery(status?: string) {
  const client = useApiClient();

  return useQuery({
    queryKey: trustAccountKeys.list({status}),
    queryFn: () => trustAccountsApi.fetchTrustAccounts(client, {status}),
    select: response => response.data,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchInterval: (query: {state: {data?: ApiResponse<TrustAccountListItemDTO[]>}}) =>
      query.state.data?.data.some(isTrustAccountAwaitingReview) ? pollingInterval.slow : false
  });
}

export function useTrustAccountQuery(id: string) {
  const client = useApiClient();

  return useQuery({
    queryKey: trustAccountKeys.detail(id),
    queryFn: () => trustAccountsApi.fetchTrustAccount(client, id),
    enabled: !!id,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    select: response => response.data,
    refetchInterval: (query: {state: {data?: ApiResponse<TrustAccountDTO>}}) => {
      const ta = query.state.data?.data.trustAccount;
      return ta && isTrustAccountAwaitingReview(ta) ? pollingInterval.slow : false;
    }
  });
}
/**
 * Hook to create a new trust account draft
 * Invalidates the trust accounts list query on success
 */
export function useCreateTrustAccountMutation() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TrustAccountCreatePayload) =>
      trustAccountsApi.createTrustAccount(client, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trustAccountKeys.lists()
      });
    }
  });
}

/**
 * Hook to update a trust account
 * Invalidates both the trust accounts list and the specific detail query on success
 */
export function useUpdateTrustAccountMutation(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TrustAccountUpdatePayload) =>
      trustAccountsApi.updateTrustAccount(client, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trustAccountKeys.detail(id)
      });
      queryClient.invalidateQueries({
        queryKey: trustAccountKeys.lists()
      });
    }
  });
}

/**
 * Hook to delete a trust account
 * Invalidates trust account list, balances, and specific detail cache on success
 */
export function useDeleteTrustAccountMutation() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => trustAccountsApi.deleteTrustAccount(client, id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({
        queryKey: trustAccountKeys.detail(id)
      });
      queryClient.invalidateQueries({
        queryKey: trustAccountKeys.lists()
      });
      queryClient.invalidateQueries({
        queryKey: trustAccountKeys.balances()
      });
    }
  });
}
