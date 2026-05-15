import type {HttpClient} from '@sollapay/http-client';
import type {
  ApiResponse,
  TrustAccountLedgerDTO,
  TrustAccountListLedgerDTO,
  TrustAccountTransactionDTO
} from '@sollapay/types';

export const trustAccountLedgerApi = {
  /**
   * Fetch balances for all trust accounts
   */
  fetchBalances: async (
    client: HttpClient
  ): Promise<ApiResponse<Record<string, TrustAccountListLedgerDTO>>> => {
    return client.get<ApiResponse<Record<string, TrustAccountListLedgerDTO>>>(
      '/trust_accounts/balances'
    );
  },

  /**
   * Fetch balance for a specific trust account
   */
  fetchBalance: async (
    client: HttpClient,
    id: string
  ): Promise<ApiResponse<TrustAccountLedgerDTO>> => {
    return client.get<ApiResponse<TrustAccountLedgerDTO>>(`/trust_accounts/${id}/balance`);
  },

  /**
   * Fetch transactions for a specific trust account
   */
  fetchTransactions: async (
    client: HttpClient,
    id: string
  ): Promise<ApiResponse<TrustAccountTransactionDTO[]>> => {
    return client.get<ApiResponse<TrustAccountTransactionDTO[]>>(
      `/trust_accounts/${id}/transactions`
    );
  }
};
