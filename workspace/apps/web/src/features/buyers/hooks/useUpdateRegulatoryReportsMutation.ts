import {useMutation, useQueryClient} from '@tanstack/react-query';

import {useApiClient} from '@/hooks';

import {buyersApi} from '../api';
import {buyerKeys} from './useBuyersQuery';

import type {ApiResponse, BuyerDTO} from '@sollapay/types';

export interface UpdateRegulatoryReportsMutationVars {
  purchaseId: string;
  realEstateTaxation?: boolean;
  salesLawCommissioner?: boolean;
}

export function useUpdateRegulatoryReportsMutation(trustAccountId: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({purchaseId, ...payload}: UpdateRegulatoryReportsMutationVars) =>
      buyersApi
        .updatePurchaseRegulatoryReports(client, trustAccountId, purchaseId, payload)
        .then(res => res.data),

    onMutate: async (variables: UpdateRegulatoryReportsMutationVars) => {
      const queryKey = buyerKeys.lists(trustAccountId);
      await queryClient.cancelQueries({queryKey});
      const previousData = queryClient.getQueryData<ApiResponse<BuyerDTO[]>>(queryKey);

      queryClient.setQueryData<ApiResponse<BuyerDTO[]>>(queryKey, prev => {
        if (!prev) return prev;
        return {
          ...prev,
          data: prev.data.map(buyer => ({
            ...buyer,
            purchases: buyer.purchases.map(p =>
              p.id === variables.purchaseId
                ? {
                    ...p,
                    regulatoryReports: {
                      ...p.regulatoryReports,
                      ...(variables.realEstateTaxation !== undefined && {
                        realEstateTaxation: variables.realEstateTaxation
                      }),
                      ...(variables.salesLawCommissioner !== undefined && {
                        salesLawCommissioner: variables.salesLawCommissioner
                      })
                    }
                  }
                : p
            )
          }))
        };
      });

      return {previousData};
    },

    onError: (_err, _vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<ApiResponse<BuyerDTO[]>>(
          buyerKeys.lists(trustAccountId),
          context.previousData
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({queryKey: buyerKeys.lists(trustAccountId)});
    }
  });
}
