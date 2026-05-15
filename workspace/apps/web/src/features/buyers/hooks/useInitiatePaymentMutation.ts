import {useMutation, useQueryClient} from '@tanstack/react-query';

import {trustAccountActivityKeys} from '@/features/trust-accounts/hooks/useTrustAccountActivity';
import {useApiClient} from '@/hooks';

import {paymentsApi} from '../api';
import {paymentKeys} from './usePaymentsQuery';

import type {CreatePaymentInstructionPayload} from '@sollapay/types';

export function useCreatePaymentInstructionMutation(trustAccountId: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePaymentInstructionPayload) =>
      paymentsApi.createPaymentInstruction(client, trustAccountId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: paymentKeys.lists(trustAccountId)});
      queryClient.invalidateQueries({queryKey: trustAccountActivityKeys.tabCounts(trustAccountId)});
      queryClient.invalidateQueries({queryKey: trustAccountActivityKeys.stats(trustAccountId)});
    }
  });
}
