import {useTrustAccountTabCountsQuery} from '@/features/trust-accounts/hooks';

interface UseTrustAccountBadgeCountsParams {
  trustAccountId: string;
}

interface UseTrustAccountBadgeCountsResult {
  buyersCount: number;
  beneficiariesCount: number;
  transactionsCount: number;
  documentsCount: number;
}

export const useTrustAccountBadgeCounts = ({
  trustAccountId
}: UseTrustAccountBadgeCountsParams): UseTrustAccountBadgeCountsResult => {
  const {data} = useTrustAccountTabCountsQuery(trustAccountId);

  return {
    buyersCount: data?.buyers ?? 0,
    beneficiariesCount: data?.beneficiaries ?? 0,
    transactionsCount: data?.transactions ?? 0,
    documentsCount: data?.documents ?? 0
  };
};
