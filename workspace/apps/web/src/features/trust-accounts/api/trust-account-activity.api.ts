import type {HttpClient} from '@sollapay/http-client';
import type {
  ApiResponse,
  TrustAccountActivityFeedDTO,
  TrustAccountStatsDTO,
  TrustAccountTabCountsDTO
} from '@sollapay/types';

export const trustAccountActivityApi = {
  fetchActivityFeed: async (
    client: HttpClient,
    id: string,
    params?: {limit?: number; cursor?: string; activityType?: string}
  ): Promise<ApiResponse<TrustAccountActivityFeedDTO>> => {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.cursor) searchParams.set('cursor', params.cursor);
    if (params?.activityType) searchParams.set('activityType', params.activityType);
    const query = searchParams.toString();
    return client.get<ApiResponse<TrustAccountActivityFeedDTO>>(
      `/trust_accounts/${id}/activity${query ? `?${query}` : ''}`
    );
  },

  fetchStats: async (
    client: HttpClient,
    id: string
  ): Promise<ApiResponse<TrustAccountStatsDTO>> => {
    return client.get<ApiResponse<TrustAccountStatsDTO>>(`/trust_accounts/${id}/stats`);
  },

  fetchTabCounts: async (
    client: HttpClient,
    id: string
  ): Promise<ApiResponse<TrustAccountTabCountsDTO>> => {
    return client.get<ApiResponse<TrustAccountTabCountsDTO>>(`/trust_accounts/${id}/tab-counts`);
  }
};
