import {Badge, Skeleton, Typography} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {PageContent, PageLayout} from '@/layouts';

import {BuyerUnitContentSkeleton} from './BuyerUnitContent.skeleton';
import {BuyerViewHeaderSkeleton} from './BuyerViewHeader.skeleton';

export function BuyerViewSkeleton() {
  const {t} = useTranslation('trustAccounts');

  return (
    <PageLayout>
      <BuyerViewHeaderSkeleton />
      <PageContent className="flex flex-col gap-8">
        {/* Unit heading */}
        <div className="flex items-center justify-between border-b border-border-subtle pb-4">
          <div className="flex items-center gap-2">
            <Typography size="md" weight="semibold">
              {t('view.buyers.detail.purchasedUnits')}
            </Typography>
            <Badge variant="gray" size="sm">
              <Skeleton className="h-3 w-4" />
            </Badge>
          </div>
        </div>

        <BuyerUnitContentSkeleton />
      </PageContent>
    </PageLayout>
  );
}
