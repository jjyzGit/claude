import {EmptyState, Illustration} from '@sollapay/ui';
import {SearchIllustration} from '@sollapay/ui/illustrations';
import {useTranslation} from 'react-i18next';

import {
  useTrustAccountActivityFeedQuery,
  useTrustAccountStatsQuery
} from '@/features/trust-accounts/hooks';

import {ActivityFeedTable} from './ActivityFeedTable';
import {ActivityKpiCards} from './ActivityKpiCards';
import {ActivityTabContentSkeleton} from './ActivityTabContent.skeleton';
import {ShowMoreButton} from './ShowMoreButton';

import type {TrustAccountTabContext} from '../../TrustAccountView';
import type {TrustAccountActivityFeedDTO} from '@sollapay/types';

interface ActivityTabContentProps {
  trustAccount: TrustAccountTabContext;
}

export function ActivityTabContent({trustAccount: {id: trustAccountId}}: ActivityTabContentProps) {
  const {t} = useTranslation('trustAccounts');
  const feedQuery = useTrustAccountActivityFeedQuery(trustAccountId);
  const statsQuery = useTrustAccountStatsQuery(trustAccountId);

  const activities =
    feedQuery.data?.pages.flatMap((page: TrustAccountActivityFeedDTO) => page.activities) ?? [];
  const hasMore = feedQuery.data?.pages.at(-1)?.hasMore ?? false;
  const total = feedQuery.data?.pages[0]?.total ?? 0;

  if (feedQuery.isLoading || statsQuery.isLoading) {
    return <ActivityTabContentSkeleton />;
  }

  return (
    <div className="flex flex-col gap-8">
      {statsQuery.data && <ActivityKpiCards stats={statsQuery.data} />}
      {activities.length === 0 ? (
        <EmptyState
          illustration={
            <Illustration width={166} height={160}>
              <SearchIllustration />
            </Illustration>
          }
          title={t('view.activity.empty.title')}
          subtitle={t('view.activity.empty.description')}
        />
      ) : (
        <>
          <ActivityFeedTable
            activities={activities}
            loadedCount={activities.length}
            total={total}
          />
          {hasMore && (
            <ShowMoreButton
              onLoadMore={() => void feedQuery.fetchNextPage()}
              isLoading={feedQuery.isFetchingNextPage}
            />
          )}
        </>
      )}
    </div>
  );
}
