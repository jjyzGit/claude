import type {HttpClient} from '@sollapay/http-client';
import type {ApiResponse, BeneficiaryDTO} from '@sollapay/types';

export const beneficiariesApi = {
  fetchBeneficiaries: async (
    client: HttpClient,
    trustAccountId: string
  ): Promise<ApiResponse<BeneficiaryDTO[]>> => {
    return client.get<ApiResponse<BeneficiaryDTO[]>>(
      `/trust_accounts/${trustAccountId}/beneficiaries`
    );
  }
};
