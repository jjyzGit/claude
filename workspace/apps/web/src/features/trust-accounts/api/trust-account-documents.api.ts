import type {HttpClient} from '@sollapay/http-client';
import type {ApiResponse, DocumentListItemDTO} from '@sollapay/types';

export interface TrustAccountDocumentsDTO {
  trustDetails: DocumentListItemDTO[];
  compliance: DocumentListItemDTO[];
}

export const trustAccountDocumentsApi = {
  /**
   * Fetch all documents for a trust account, grouped by context
   */
  fetchDocuments: async (
    client: HttpClient,
    id: string
  ): Promise<ApiResponse<TrustAccountDocumentsDTO>> => {
    return client.get<ApiResponse<TrustAccountDocumentsDTO>>(`/trust_accounts/${id}/documents`);
  }
};
