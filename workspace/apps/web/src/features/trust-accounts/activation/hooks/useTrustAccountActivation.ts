import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {trustAccountKeys} from '@/features/trust-accounts/hooks';
import {useApiClient} from '@/hooks';

import {activationApi} from '../api';

import type {
  TrustDeveloperDetailsDTO,
  TrustFatcaCrsDetailsDTO,
  TrustScopeDetailsDTO
} from '@sollapay/types';

export const trustAccountActivationKeys = {
  trustDetailsPackage: (id: string) =>
    [...trustAccountKeys.all, 'trust-details-package', id] as const,
  compliancePackage: (id: string) => [...trustAccountKeys.all, 'compliance-package', id] as const
};

/**
 * Hook to fetch trust details package (scope + developer + documents)
 */
export function useTrustDetailsPackageQuery(id: string) {
  const client = useApiClient();

  return useQuery({
    queryKey: trustAccountActivationKeys.trustDetailsPackage(id),
    queryFn: () => activationApi.getTrustDetailsPackage(client, id),
    enabled: !!id
  });
}

/**
 * Hook to fetch compliance package (fatcaCrs + legal documents)
 */
export function useCompliancePackageQuery(id: string) {
  const client = useApiClient();

  return useQuery({
    queryKey: trustAccountActivationKeys.compliancePackage(id),
    queryFn: () => activationApi.getCompliancePackage(client, id),
    enabled: !!id
  });
}

/**
 * Hook to upsert scope details for a trust account
 */
export function useUpsertScopeMutation(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TrustScopeDetailsDTO) => activationApi.upsertScope(client, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: trustAccountActivationKeys.trustDetailsPackage(id)});
      queryClient.invalidateQueries({queryKey: trustAccountKeys.detail(id)});
    }
  });
}

/**
 * Hook to upsert developer details for a trust account
 */
export function useUpsertDeveloperMutation(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TrustDeveloperDetailsDTO) =>
      activationApi.upsertDeveloper(client, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: trustAccountActivationKeys.trustDetailsPackage(id)});
      queryClient.invalidateQueries({queryKey: trustAccountKeys.detail(id)});
    }
  });
}

/**
 * Hook to upsert FATCA/CRS details for a trust account
 */
export function useUpsertFatcaCrsMutation(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TrustFatcaCrsDetailsDTO) =>
      activationApi.upsertFatcaCrs(client, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: trustAccountActivationKeys.compliancePackage(id)});
      queryClient.invalidateQueries({queryKey: trustAccountKeys.detail(id)});
    }
  });
}

/**
 * Hook to submit a trust account for review
 * Invalidates the specific detail query and list queries on success
 */
export function useSubmitTrustAccountMutation(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => activationApi.submitTrustAccount(client, id),
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
