import type {HttpClient} from '@sollapay/http-client';
import type {
  TrustAccountCreatePayload,
  TrustAccountCreateDTO,
  TrustAccountUpdatePayload,
  TrustAccountDTO,
  TrustAccountListItemDTO,
  ApiResponse
} from '@sollapay/types';

/**
 * API client functions for trust accounts
 */
export const trustAccountsApi = {
  /**
   * Fetch trust accounts list with optional status filter
   */
  fetchTrustAccounts: async (
    client: HttpClient,
    params?: {status?: string}
  ): Promise<ApiResponse<TrustAccountListItemDTO[]>> => {
    return client.get<ApiResponse<TrustAccountListItemDTO[]>>('/trust_accounts', {params});
  },

  /**
   * Create a new trust account draft
   */
  createTrustAccount: async (
    client: HttpClient,
    payload: TrustAccountCreatePayload
  ): Promise<ApiResponse<TrustAccountCreateDTO>> => {
    return client.post<ApiResponse<TrustAccountCreateDTO>, TrustAccountCreatePayload>(
      '/trust_accounts',
      payload
    );
  },

  /**
   * Fetch a single trust account by ID
   */
  fetchTrustAccount: async (
    client: HttpClient,
    id: string
  ): Promise<ApiResponse<TrustAccountDTO>> => {
    return client.get<ApiResponse<TrustAccountDTO>>(`/trust_accounts/${id}`);
  },

  /**
   * Update a trust account by ID
   */
  updateTrustAccount: async (
    client: HttpClient,
    id: string,
    payload: TrustAccountUpdatePayload
  ): Promise<ApiResponse<TrustAccountDTO>> => {
    return client.patch<ApiResponse<TrustAccountDTO>, TrustAccountUpdatePayload>(
      `/trust_accounts/${id}`,
      payload
    );
  },

  /**
   * Delete a trust account by ID
   */
  deleteTrustAccount: async (client: HttpClient, id: string): Promise<void> => {
    return client.delete<void>(`/trust_accounts/${id}`);
  }
};
