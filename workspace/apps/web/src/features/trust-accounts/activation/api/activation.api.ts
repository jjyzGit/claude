import type {HttpClient} from '@sollapay/http-client';
import type {
  ActivateTrustAccountResponseDTO,
  ApiResponse,
  TrustScopeDetailsDTO,
  TrustScopeUpsertDTO,
  TrustDeveloperDetailsDTO,
  TrustDeveloperUpsertDTO,
  TrustFatcaCrsDetailsDTO,
  TrustFatcaCrsUpsertDTO,
  TrustDetailsPackageDTO,
  CompliancePackageDTO
} from '@sollapay/types';

/**
 * API client functions for trust account activation
 */
export const activationApi = {
  upsertScope: async (
    client: HttpClient,
    id: string,
    payload: TrustScopeDetailsDTO
  ): Promise<ApiResponse<TrustScopeUpsertDTO>> => {
    return client.put<ApiResponse<TrustScopeUpsertDTO>, Partial<TrustScopeDetailsDTO>>(
      `/trust_accounts/${id}/scope`,
      payload
    );
  },

  /**
   * Upsert trust account developer details
   */
  upsertDeveloper: async (
    client: HttpClient,
    id: string,
    payload: TrustDeveloperDetailsDTO
  ): Promise<ApiResponse<TrustDeveloperUpsertDTO>> => {
    return client.put<ApiResponse<TrustDeveloperUpsertDTO>, Partial<TrustDeveloperDetailsDTO>>(
      `/trust_accounts/${id}/developer`,
      payload
    );
  },

  /**
   * Upsert FATCA/CRS details
   */
  upsertFatcaCrs: async (
    client: HttpClient,
    id: string,
    payload: TrustFatcaCrsDetailsDTO
  ): Promise<ApiResponse<TrustFatcaCrsUpsertDTO>> => {
    return client.put<ApiResponse<TrustFatcaCrsUpsertDTO>, Partial<TrustFatcaCrsDetailsDTO>>(
      `/trust_accounts/${id}/fatca-crs`,
      payload
    );
  },

  /**
   * Get trust details package (scope + developer + documents)
   */
  getTrustDetailsPackage: async (
    client: HttpClient,
    id: string
  ): Promise<ApiResponse<TrustDetailsPackageDTO>> => {
    return client.get<ApiResponse<TrustDetailsPackageDTO>>(
      `/trust_accounts/${id}/packages/trust-details`
    );
  },

  /**
   * Get compliance package (fatcaCrs + legal documents)
   */
  getCompliancePackage: async (
    client: HttpClient,
    id: string
  ): Promise<ApiResponse<CompliancePackageDTO>> => {
    return client.get<ApiResponse<CompliancePackageDTO>>(
      `/trust_accounts/${id}/packages/compliance`
    );
  },

  /**
   * Submit a trust account for review (transitions to submitted_for_review)
   */
  submitTrustAccount: async (
    client: HttpClient,
    id: string
  ): Promise<ApiResponse<ActivateTrustAccountResponseDTO>> => {
    return client.post<ApiResponse<ActivateTrustAccountResponseDTO>, undefined>(
      `/trust_accounts/${id}/submit`,
      undefined
    );
  }
};
