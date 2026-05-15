import type {HttpClient} from '@sollapay/http-client';
import type {
  ApiResponse,
  BuyerDTO,
  BuyerWithDocumentsDTO,
  CreateBuyersPayload,
  RegulatoryReportsDTO,
  UpdateRegulatoryReportsPayload
} from '@sollapay/types';

export const buyersApi = {
  fetchBuyers: async (
    client: HttpClient,
    trustAccountId: string
  ): Promise<ApiResponse<BuyerDTO[]>> => {
    return client.get<ApiResponse<BuyerDTO[]>>(`/trust_accounts/${trustAccountId}/buyers`);
  },

  fetchBuyer: async (
    client: HttpClient,
    trustAccountId: string,
    buyerId: string
  ): Promise<ApiResponse<BuyerWithDocumentsDTO>> => {
    return client.get<ApiResponse<BuyerWithDocumentsDTO>>(
      `/trust_accounts/${trustAccountId}/buyers/${buyerId}`
    );
  },

  createBuyers: async (
    client: HttpClient,
    trustAccountId: string,
    payload: CreateBuyersPayload
  ): Promise<ApiResponse<BuyerDTO[]>> => {
    return client.post<ApiResponse<BuyerDTO[]>, CreateBuyersPayload>(
      `/trust_accounts/${trustAccountId}/buyers`,
      payload
    );
  },

  updatePurchaseRegulatoryReports: async (
    client: HttpClient,
    trustAccountId: string,
    purchaseId: string,
    payload: UpdateRegulatoryReportsPayload
  ): Promise<ApiResponse<{purchaseId: string; regulatoryReports: RegulatoryReportsDTO}>> => {
    return client.patch(
      `/trust_accounts/${trustAccountId}/purchases/${purchaseId}/regulatory-reports`,
      payload
    );
  }
};
