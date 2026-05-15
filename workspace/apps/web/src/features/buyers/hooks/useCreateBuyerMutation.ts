import {DocumentContext, DocumentEntityType} from '@sollapay/enums';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {documentKeys} from '@/features/documents/hooks';
import {trustAccountActivityKeys} from '@/features/trust-accounts/hooks';
import {useApiClient} from '@/hooks';

import {buyersApi} from '../api';
import {buyerKeys} from './useBuyersQuery';

import type {CreateBuyersPayload} from '@sollapay/types';

export function useCreateBuyerMutation(trustAccountId: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBuyersPayload) =>
      buyersApi.createBuyers(client, trustAccountId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: buyerKeys.lists(trustAccountId)
      });
      // Remove (not just invalidate) buyer documents cache so the next modal open
      // starts with a clean fetch — invalidate alone serves stale data on remount.
      queryClient.removeQueries({
        queryKey: documentKeys.list(
          DocumentEntityType.TRUST_ACCOUNT,
          trustAccountId,
          DocumentContext.PURCHASE_DOCUMENTS
        )
      });
      // Invalidate tab counts so badge updates immediately
      queryClient.invalidateQueries({
        queryKey: trustAccountActivityKeys.tabCounts(trustAccountId)
      });
    }
  });
}
