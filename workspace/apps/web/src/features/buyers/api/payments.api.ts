import type {HttpClient} from '@sollapay/http-client';
import type {
  ApiResponse,
  CreatePaymentInstructionPayload,
  CreatePaymentInstructionResponseDTO,
  PaymentInstructionDTO
} from '@sollapay/types';

export const paymentsApi = {
  fetchPayments: async (
    client: HttpClient,
    trustAccountId: string
  ): Promise<ApiResponse<PaymentInstructionDTO[]>> => {
    return client.get<ApiResponse<PaymentInstructionDTO[]>>(
      `/trust_accounts/${trustAccountId}/payments`
    );
  },

  createPaymentInstruction: async (
    client: HttpClient,
    trustAccountId: string,
    payload: CreatePaymentInstructionPayload
  ): Promise<ApiResponse<CreatePaymentInstructionResponseDTO>> => {
    return client.post<ApiResponse<CreatePaymentInstructionResponseDTO>>(
      `/trust_accounts/${trustAccountId}/payments`,
      payload
    );
  }
};
