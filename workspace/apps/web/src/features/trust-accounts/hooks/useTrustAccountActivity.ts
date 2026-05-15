import {useInfiniteQuery, useQuery} from '@tanstack/react-query';

import {useApiClient} from '@/hooks';
import {pollingInterval} from '@/lib/query';

import {trustAccountActivityApi} from '../api';

export const trustAccountActivityKeys = {
  all: (trustAccountId: string) => ['trust-accounts', trustAccountId, 'activity'] as const,
  feed: (trustAccountId: string) =>
    [...trustAccountActivityKeys.all(trustAccountId), 'feed'] as const,
  stats: (trustAccountId: string) =>
    [...trustAccountActivityKeys.all(trustAccountId), 'stats'] as const,
  tabCounts: (trustAccountId: string) =>
    [...trustAccountActivityKeys.all(trustAccountId), 'tab-counts'] as const
};

export function useTrustAccountActivityFeedQuery(trustAccountId: string) {
  const client = useApiClient();
  return useInfiniteQuery({
    queryKey: trustAccountActivityKeys.feed(trustAccountId),
    queryFn: ({pageParam}) =>
      trustAccountActivityApi.fetchActivityFeed(client, trustAccountId, {
        limit: 20,
        cursor: pageParam as string | undefined
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: lastPage =>
      lastPage.data.hasMore ? (lastPage.data.nextCursor ?? undefined) : undefined,
    select: data => ({...data, pages: data.pages.map(page => page.data)}),
    enabled: !!trustAccountId,
    refetchOnMount: 'always',
    refetchInterval: pollingInterval.slow
  });
}

export function useTrustAccountStatsQuery(trustAccountId: string) {
  const client = useApiClient();
  return useQuery({
    queryKey: trustAccountActivityKeys.stats(trustAccountId),
    queryFn: () => trustAccountActivityApi.fetchStats(client, trustAccountId),
    select: response => response.data,
    enabled: !!trustAccountId,
    refetchOnMount: 'always',
    refetchInterval: pollingInterval.slow
  });
}

export function useTrustAccountTabCountsQuery(trustAccountId: string) {
  const client = useApiClient();
  return useQuery({
    queryKey: trustAccountActivityKeys.tabCounts(trustAccountId),
    queryFn: () => trustAccountActivityApi.fetchTabCounts(client, trustAccountId),
    select: response => response.data,
    enabled: !!trustAccountId,
    refetchOnMount: 'always',
    refetchInterval: pollingInterval.slow
  });
}
