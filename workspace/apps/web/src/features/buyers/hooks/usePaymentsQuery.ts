import {PaymentInstructionStatus} from '@sollapay/enums';
import {useQuery} from '@tanstack/react-query';

import {useApiClient} from '@/hooks';
import {pollingInterval} from '@/lib/query';

import {paymentsApi} from '../api';

import type {ApiResponse, PaymentInstructionDTO} from '@sollapay/types';

export const paymentKeys = {
  all: (trustAccountId: string) => ['trust-accounts', trustAccountId, 'payments'] as const,
  lists: (trustAccountId: string) => [...paymentKeys.all(trustAccountId), 'list'] as const
};

const NON_TERMINAL_PAYMENT_STATUSES = new Set([
  PaymentInstructionStatus.AWAITING_FUNDS,
  PaymentInstructionStatus.PARTIALLY_MATCHED
]);

function hasNonTerminalPayment(cached: ApiResponse<PaymentInstructionDTO[]> | undefined): boolean {
  return cached?.data.some(p => NON_TERMINAL_PAYMENT_STATUSES.has(p.status)) ?? false;
}

export function usePaymentsQuery(trustAccountId: string) {
  const client = useApiClient();

  return useQuery({
    queryKey: paymentKeys.lists(trustAccountId),
    queryFn: () => paymentsApi.fetchPayments(client, trustAccountId),
    enabled: !!trustAccountId,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchInterval: query =>
      hasNonTerminalPayment(query.state.data) ? pollingInterval.medium : false,
    select: response => response.data
  });
}
